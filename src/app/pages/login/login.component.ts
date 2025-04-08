import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatePersistantService } from '../../services/state-persistant.service';
import { IonButton, IonContent, IonHeader, IonFooter, IonText, IonInput, IonItem, IonLabel, IonNote, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [IonFooter, IonHeader, IonText, IonToolbar, IonLabel, IonInput, IonSpinner, IonButton, IonItem, IonNote, IonContent, IonTitle, NgIf, CommonModule],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  nickname: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private stateService: StatePersistantService,
    private router: Router,
  ) {}

	onPasswordInput(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.password = input.value || '';
		console.log(`password: ${this.password}`);
  	}

	onNicknameInput(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.nickname = input.value || '';
		console.log(`nickname: ${this.nickname}`);
  	}

	  changeRoute(event: Event) {
		const buttonName = (event.target as HTMLElement).getAttribute('name');
		console.log('Nome del bottone cliccato:', buttonName);
		

		if (buttonName === 'userpage') {
			(document.activeElement as HTMLElement)?.blur();
		  	this.router.navigateByUrl('/userpage');
		}
	  }

  onSubmit() {
	(document.activeElement as HTMLElement)?.blur();
	console.log('Form submitted');
	console.log(`Nickname: ${this.nickname}, Password: ${this.password}`);

    this.isLoading = true;
    this.errorMessage = '';

      try {
        if (!this.stateService.userExists(this.nickname)) {
			console.log("registrazione utente")
			this.stateService.registerUser(this.nickname, this.password);
        }

        if (this.stateService.validateCredentials(this.nickname, this.password)) {
			console.log("verifica credenziali utente")
          this.stateService.login(this.nickname);
          
		  this.router.navigateByUrl('/userpage');
        } 
		else 
		{
			console.log("password non corretta")
			this.errorMessage = 'Password non corretta';
        }
	} 
	catch (error) {
		  console.log("errore nel login")
        this.errorMessage = 'Si è verificato un errore durante il login';
    }
	finally {
        this.isLoading = false;
	}
  }
}