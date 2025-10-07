import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuController, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline, storefrontOutline } from 'ionicons/icons';

// Importa tu servicio de autenticación
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
  IonIcon, IonButton, IonInput, IonItem,
  IonContent,
  CommonModule, ReactiveFormsModule, RouterLink
]
})
export class LoginPage {
  // Inyectamos los servicios necesarios
  private authService = inject(AuthService);
  private router = inject(Router);
  private menuCtrl = inject(MenuController);

  // Creamos el formulario con validaciones
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    // Agregamos los íconos que usaremos en la vista
    addIcons({ logInOutline, storefrontOutline });
  }

  // Se ejecuta ANTES de que la página entre en la vista
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  // Se ejecuta ANTES de que la página salga de la vista
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  // Función que se llama al presionar el botón de ingresar
  async login() {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(this.loginForm.value);
      } catch (error) {
        console.error('Error en el login', error);
        // Aquí podrías agregar una alerta para el usuario
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}