import { Component } from '@angular/core';
import { 
  IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonGrid,
  IonRow,
  IonText,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { construct, leaf, water, thermometer, statsChart } from 'ionicons/icons';

import { RouterService } from '../../services/router-service';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		IonIcon, IonGrid, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, 
		IonButton, IonCard, IonCardHeader, IonCardTitle,
		IonCardContent, IonText, IonFooter,
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	constructor(private router: RouterService) {
		addIcons({ construct, leaf, water, thermometer, statsChart });
	}

	onLoginClick() {
		const elem = document.activeElement as HTMLElement | undefined;
		elem?.blur();
		this.router.navigateTo('/login');
	  }
}