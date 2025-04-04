import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonContent, IonText, IonButton, IonButtons, IonIcon, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCard, IonCardHeader, IonCardTitle, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmark, leaf, close, pencil } from 'ionicons/icons';
import { AIService } from '../../services/ai.service';
import { Subscription } from 'rxjs'; 
import { StatePersistantService } from '../../services/state-persistant.service';

@Component({
	selector: 'app-plant-details',
	templateUrl: './plant-details.component.html',
	standalone: true,
	imports: [IonContent,  IonText, IonTitle, IonIcon,  IonButton, IonCard, ],
	providers: [ModalController],
	styleUrls: ['./plant-details.component.scss']
  })
  export class PlantDetailsComponent {
	@Input() plant: { name: string; position: string; grouped: boolean } = { name: '', position: '', grouped: false };
	aiResponse: string = '';
		private subscriptions: Subscription = new Subscription();

	constructor(private modalController: ModalController, private aiService: AIService, private stateService: StatePersistantService) {
		addIcons({ checkmark, leaf, close, pencil });
		this.aiService.askAI(`Dammi un consiglio in 20 parole sulle piante.`);
	}

	ngOnInit() {	
		const currentUser = this.stateService.getCurrentUser2();
		const plants = this.stateService.getUserPlants(currentUser.username);
	  
		const plantData = plants.find((p) => p.name === this.plant.name);
	  
		if (plantData) {
		  this.plant = plantData;
		}

		this.subscriptions.add(
		  this.aiService.aiResponse$.subscribe(response => {
			this.aiResponse = response;
		  })
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	dismiss() {
		this.modalController.dismiss();
	}

	closeCard() {
		this.modalController.dismiss();
	}
}