import { Component } from '@angular/core';
import { 
  IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonGrid,
  IonRow,
  IonText,
  IonFooter,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { construct, leaf, water, thermometer, statsChart } from 'ionicons/icons';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		IonIcon, IonGrid, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, 
		IonButton, IonCard, IonCardHeader, IonCardTitle,
		IonCardContent, IonText, IonFooter,
		RouterLink,
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	constructor() {
		addIcons({ construct, leaf, water, thermometer, statsChart });
	}
}