import { UserCredentials } from "../models/auth.interface";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private users: UserCredentials[] = [];

	userExists(nickname: string): boolean {
		return this.users.some(user => user.nickname === nickname);
	}

	registerUser(nickname: string, password: string): void {
		this.users.push({nickname, password});
	}

	validateCredentials(nickname: string, password: string): boolean {
		const user = this.users.find(u => u.nickname === nickname);
		return (user ? user?.password === password: false);
	}

	login(nickname: string): void {
		console.log('Login checked');
	}
}
