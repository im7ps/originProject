import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, IonToggle, IonSelect, IonSelectOption, IonContent, IonLabel, IonCard, IonCardHeader, IonButtons, IonInput, IonItem, IonCardTitle, IonCardContent, IonButton, IonIcon, IonText, IonFooter, IonHeader, IonTitle, IonToolbar, IonModal, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { construct, leaf, water, thermometer, statsChart, add } from 'ionicons/icons';
import { StatePersistantService } from '../../services/state-persistant.service';

import { OverlayEventDetail } from '@ionic/core/components';

import { User } from '../../models/user.model';
import { Router } from '@angular/router';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-user',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonText,
    IonButtons,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
	IonFooter,
	IonLabel,
	IonSelectOption,
	IonSelect,
	IonToggle,
  ],
  providers: [ModalController]
})

export class UserPageComponent {

	@ViewChild(IonModal) modal!: IonModal;
	isPlantFormOpen = false;
	plantForm: FormGroup;
	user: User;

	isInputVisible:boolean;
	cityName:string = '';

	temperature: string = 'N/D';

	constructor(private fb: FormBuilder, private pstate: StatePersistantService, private router: Router, private weatherService: WeatherService) {
		// In futuro qui inietteremo i servizi necessari
		addIcons( { construct, leaf, water, thermometer, statsChart, add})
		this.plantForm = this.fb.group({
			name: ['', Validators.required],
			position: ['', Validators.required],
			grouped: [false]
		});
		document.addEventListener('touchstart', () => {}, { passive: true });
		const userData = this.pstate.getUserInstance();
		this.user = new User(userData.username, userData.plants);
		this.isInputVisible = false;
  	}

	viewPlantCollection() {
		this.router.navigateByUrl('/plants');
	}

	changeRoute(event: Event) {
		const buttonName = (event.target as HTMLElement).getAttribute('name');
		console.log('Nome del bottone cliccato:', buttonName);
		

		if (buttonName === 'home') {
			(document.activeElement as HTMLElement)?.blur();
		  	this.router.navigateByUrl('/home');
		} else if (buttonName === 'logout') {
			(document.activeElement as HTMLElement)?.blur();
			this.pstate.logout();
			this.router.navigateByUrl('/login');
		}
	  }

	cancel() {
		if (this.modal) {
		  this.modal.dismiss(null, 'cancel');
		} else {
		  console.error('Il riferimento al modale non è disponibile.');
		}
	  }

  confirm(name:string| number | null | undefined, position:string| number | null | undefined, isolated:string| number | null | undefined) {
    console.log(name)
    console.log(position)
    console.log(isolated)
	const plantData = { name, position, isolated };
	this.modal.dismiss(plantData, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
	if (event.detail.role === 'confirm') {
		const plantData = event.detail.data;
		console.log('Dati ricevuti da dismiss:', plantData);


		this.pstate.addPlant(plantData);
		this.user = this.pstate.getUserInstance();
		console.log(this.user.plants)
	  }
  }

  showCityInput() {
    this.isInputVisible = true;
  }

  async confirmCity(cityName:string | number | null | undefined) {
	if (!cityName) {
	  alert('Per favore, inserisci una città valida.');
	  return;
	}
  
	const coordinates = await this.weatherService.getCoordinates(cityName);
	console.log(coordinates)
  
	if (!coordinates) {
	  alert('Impossibile trovare la città. Riprova con un nome più preciso.');
	  return;
	}
  
	const temperature = await this.weatherService.updateTemperature(coordinates.lat, coordinates.lon);

	if (temperature !== null) {
	  this.temperature = `${temperature}°C`;
	} else {
	  this.temperature = 'N/D';
	  alert('Errore durante il recupero della temperatura.');
	}

	this.isInputVisible = false;
	this.cityName = '';
  }
}