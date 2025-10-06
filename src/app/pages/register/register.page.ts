import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';

// Importa tu servicio de autenticación
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonButton, IonInput, IonItem, IonList,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, ReactiveFormsModule, RouterLink,
    IonButtons, IonBackButton // <-- AÑADIR ESTOS DOS
  ]
})
export class RegisterPage {

  // Inyectamos el servicio de autenticación
  private authService = inject(AuthService);

  // Creamos el formulario de registro con validaciones
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    // Agregamos el ícono que usaremos en la vista
    addIcons({ personAddOutline });
  }

  // --- Función que se llama al presionar el botón de registrar ---
  async register() {
    // Verificamos si el formulario es válido
    if (this.registerForm.valid) {
      try {
        // Llamamos a la función register() del servicio de autenticación
        await this.authService.register(this.registerForm.value);
      } catch (error) {
        // Aquí podrías mostrar una alerta si el email ya existe, por ejemplo
        console.error('Error en el registro', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}