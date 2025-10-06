import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listOutline, peopleOutline, logOutOutline } from 'ionicons/icons';

// Importamos el servicio de autenticación
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
  RouterLink, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonTitle,
],

})
export class AppComponent {
  // Inyectamos el servicio de autenticación
  public authService = inject(AuthService);

  // Definimos las páginas que aparecerán en el menú
  public appPages = [
    { title: 'Productos', url: '/products', icon: 'list-outline' },
    { title: 'Clientes', url: '/clients', icon: 'people-outline' },
  ];

  constructor() {
    // Agregamos los íconos que usaremos
    addIcons({ listOutline, peopleOutline, logOutOutline });
  }

  // Función para cerrar sesión que llamaremos desde el menú
  logout() {
    this.authService.logout();
  }
}