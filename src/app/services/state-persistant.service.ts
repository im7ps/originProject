import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

interface UserCredentials {
  [nickname: string]: string;
}

@Injectable({ providedIn: 'root' })
export class StatePersistantService {
  private readonly USERS_KEY = 'app_users';
  private readonly AUTH_KEY = 'app_current_user';
  oldkey:string|null = '';
  
  currentUser = {
	username: '',
	plants: [] as Array<{ name: string; position: string; grouped: boolean }>
  };

  getCurrentUser2(): User {
	if (!this.currentUser || !this.currentUser.username) {
	  console.log('Nessun utente loggato');


	}
	return this.currentUser;
  }

  getUserPlants(nickname: string): Array<{ name: string; position: string; grouped: boolean }> {
	const userPlants = localStorage.getItem(nickname + '_plants');
	return userPlants ? JSON.parse(userPlants) : []; 
  }

  getUserInstance(): User {
	user: User;
	const nickname = localStorage.getItem('current_user'); // Ottieni il nickname dell'utente loggato
	if (!nickname) {
	  throw new Error('Nessun utente loggato');
	}
	const userPlants = localStorage.getItem(nickname + '_plants');
	return new User(nickname, userPlants ? JSON.parse(userPlants) : []);
  }

  addPlant(plant: { name: string; position: string; grouped: boolean }): void {
	if (!this.currentUser.username) {
	  throw new Error('Nessun utente loggato');
	}
  
	this.currentUser.plants.push(plant);
  
	localStorage.setItem(this.currentUser.username + '_plants', JSON.stringify(this.currentUser.plants));
  
	console.log(`Pianta aggiunta per l'utente ${this.currentUser.username}:`, plant);
  }

  private getUsers(): UserCredentials {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : {};
  }

  private saveUsers(users: UserCredentials): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  userExists(nickname: string): boolean {
    const users = this.getUsers();
    return users.hasOwnProperty(nickname);
  }

  registerUser(nickname: string, password: string): void {
    const users = this.getUsers();
    users[nickname] = password;
    this.saveUsers(users);
  }

  validateCredentials(nickname: string, password: string): boolean {
    const users = this.getUsers();
    return users[nickname] === password;
  }

  login(nickname: string): void {

	localStorage.setItem('current_user', nickname);
  

	const users = this.getUsers();
	if (!users[nickname]) {
	  throw new Error('Utente non registrato');
	}
  

	const userPlants = localStorage.getItem(nickname + '_plants');
	this.currentUser = {
	  username: nickname,
	  plants: userPlants ? JSON.parse(userPlants) : []
	};
  
	console.log(`Utente loggato: ${nickname}`);
  }

  logout(): void {
	const nickname = localStorage.getItem('current_user');
	if (nickname) {
	  localStorage.removeItem('current_user');
	}
	console.log('Utente disconnesso');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }
}