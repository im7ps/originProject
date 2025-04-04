import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {StatePersistantService } from '../../services/state-persistant.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [IonContent, CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
	emptySlots = [3]
	topPlants = []

	constructor(private router:Router, private pstate:StatePersistantService)
	{

	}

	ngOnInit(): void {
		try {
		  this.pstate.logout(); // Prova a eseguire il logout
		} catch (error) {
		  console.error('Errore durante il logout:', error); // Gestisci eventuali errori
		} finally {
		  this.router.navigate(['/home']); // Naviga sempre verso la home
		}
	  }
}
