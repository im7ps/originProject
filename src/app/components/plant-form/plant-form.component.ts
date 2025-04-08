import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, IonButton, IonContent, IonHeader, IonModal, IonToolbar, IonTitle, IonButtons, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-plant-form',
  standalone: true,
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	IonModal,
    // IonButton,
    // IonContent,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    // IonButtons,
    // IonItem,
    // IonLabel,
    // IonInput,
    // IonSelect,
    // IonSelectOption,
    // IonToggle,
  ],
})
export class PlantFormComponent {
  plantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      grouped: [false]
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitForm() {
    if (this.plantForm.valid) {
      this.modalCtrl.dismiss(this.plantForm.value);
    }
  }
}
