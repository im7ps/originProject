import { Component, ViewChild } from '@angular/core';
import { StatePersistantService } from '../../services/state-persistant.service';
import { IonModal, IonContent, IonFooter, IonIcon, IonText, IonTitle, IonToolbar, IonHeader, IonCard, IonGrid, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonCol, IonRow, } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PlantDetailsComponent } from '../../components/plant-details/plant-details.component'
import { addIcons } from 'ionicons';
import { leaf } from 'ionicons/icons';

import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-plants',
	imports: [
		RouterLink, IonContent, IonTitle, IonToolbar,
	  IonHeader, IonGrid, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
	  IonButton, IonCol, IonRow, IonFooter, IonIcon, IonText , CommonModule, 
	],
	standalone: true,
	templateUrl: './plants.component.html',
	styleUrls: ['./plants.component.scss'],
	providers: [ModalController],
  })
  export class PlantsComponent {

	plants: Array<{ name: string; position: string; grouped: boolean }> = [];
	selectedPlant: { name: string; position: string; grouped: boolean } | null = null;
	statuses: Array<'perfect' | 'good' | 'bad' | 'critical'> = ['perfect', 'good', 'bad', 'critical'];
	plantStatus = this.statuses[Math.floor(Math.random() * this.statuses.length)]
	timeToWater = Math.floor(Math.random() * 12) + 1;
  
	constructor(
	  private pstate: StatePersistantService, private modalController: ModalController) {
	  const nickname = localStorage.getItem('current_user');
	  if (nickname) {
		this.plants = this.pstate.getUserPlants(nickname);
	  }
	  addIcons({ leaf,});
	}
  
	openCardDetails(plant: { name: string; position: string; grouped: boolean }) {
		this.selectedPlant = plant;
  	
  	}

	async openModal(plant: any) {
	const modal = await this.modalController.create({
		component: PlantDetailsComponent,
		componentProps: { plant } // Pass data to modal
	});
	return await modal.present();
	}
}
