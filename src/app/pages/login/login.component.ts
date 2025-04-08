import { Component } from '@angular/core';
import { StatePersistantService } from '../../services/state-persistant.service';
import { IonButton, IonContent, IonHeader, IonFooter, IonText, IonInput, IonItem, IonLabel, IonNote, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule, NgIf } from '@angular/common';
import { UserCredentials } from "../../models/auth.interface";
import { AuthService } from '../../services/auth.service';
import { RouterService } from '../../services/router-service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { blurActiveElement } from '../../utils/router_utils/router_utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,
	IonFooter, IonHeader, IonText, IonToolbar, IonLabel, IonInput, IonSpinner, IonButton, IonItem, IonNote, IonContent, IonTitle, NgIf, CommonModule],
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
	loginForm: FormGroup;
	isLoading: boolean = false;
	errorMessage: string = '';

	constructor(private authService: AuthService, private router: RouterService, private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			nickname: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		})
	}
	
	get credentials(): UserCredentials {
		return this.loginForm.value as UserCredentials;
	}

	get nickname() {
		return this.loginForm.get('nickname');
	  }
	
	get password() {
		return this.loginForm.get('password');
	}

	ngOnInit(): void {
		this.resetForm();
	}


	navigateTo(event: Event) {
		blurActiveElement();
		this.router.navigateTo('');
	}


	async onSubmit(): Promise<void> {
		if (this.loginForm.invalid) {
			this.markAllAsTouched();
			return;
		}

		console.log('Form submitted', this.credentials);
		this.isLoading = true;
		this.errorMessage = '';

		this.credentials.nickname = this.loginForm.value.nickname
		this.credentials.password = this.loginForm.value.password

		console.log("Nickname: ", this.credentials.nickname);
		console.log("Password: ", this.credentials.password);

		try {
			await this.handleAuth();
		}
		catch (error) {
			this.handleError(error);
		}
		finally {
			this.isLoading = false;
		}
	}

	private resetForm(): void {
		this.loginForm.reset({
		  nickname: '',
		  password: '',
		});
	}

	private async handleAuth(): Promise<void> {
		const userExists = await this.authService.userExists(this.credentials.nickname)
		if (!userExists) {
			await this.authService.registerUser(this.credentials.nickname, this.credentials.password);
		} 

		const isValid = await this.authService.validateCredentials(
			this.credentials.nickname, 
			this.credentials.password
		);

		if (isValid)
		{
			this.authService.login(this.credentials.nickname);
			blurActiveElement();
			await this.router.navigateTo('/userpage');
		}
		else
		{
			console.log("Credenziali errate.");
			this.errorMessage = 'Credenziali errate.'
		}
	}

	private handleError(error: unknown): void {
		console.error("Errore nel login", error);
		this.errorMessage = 'Si è verificato un errore durante il login';
	}

	private markAllAsTouched(): void {
		Object.values(this.loginForm.controls).forEach(control => {
		  control.markAsTouched();
		});
	}
}
