import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline } from 'ionicons/icons';

// Importa tu servicio de autenticación
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonButton, IonInput, IonItem, IonList,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, ReactiveFormsModule, RouterLink
  ]
})
export class LoginPage {
  // Inyectamos el servicio de autenticación y el router
  private authService = inject(AuthService);
  private router = inject(Router);

  // Creamos el formulario con validaciones
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    // Agregamos el ícono que usaremos en la vista
    addIcons({ logInOutline });
  }

  // --- Función que se llama al presionar el botón de ingresar ---
  async login() {
    // Verificamos si el formulario es válido
    if (this.loginForm.valid) {
      try {
        // Llamamos a la función login() del servicio de autenticación
        await this.authService.login(this.loginForm.value);
      } catch (error) {
        // Aquí podrías mostrar una alerta al usuario si el login falla
        console.error('Error en el login', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}