import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButtons, IonButton, IonItemSliding, IonItemOptions, IonItemOption, AlertController, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, logOutOutline, peopleOutline, createOutline, trashOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';

// Importa los servicios y la interfaz de Cliente
import { DataService, Cliente } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: true,
  imports: [
    IonItemOption, IonItemOptions, IonItemSliding, IonButton, IonButtons, IonIcon, IonFabButton, IonFab, IonLabel, IonItem, IonList,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, RouterLink, IonMenuButton
  ]
})
export class ClientsPage {
  // Inyectamos los servicios
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  private alertCtrl = inject(AlertController);

  public clientes$: Observable<Cliente[]>;

  constructor() {
    // Obtenemos los clientes del servicio
    this.clientes$ = this.dataService.getClientes();
    addIcons({ add, logOutOutline, peopleOutline, createOutline, trashOutline });
  }

  logout() {
    this.authService.logout();
  }

  async deleteClient(cliente: Cliente) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar borrado',
      message: `¿Estás seguro de que quieres eliminar a "${cliente.nombreCompleto}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.dataService.deleteCliente(cliente.id!)
              .then(() => console.log('Cliente eliminado'))
              .catch(err => console.error('Error al eliminar:', err));
          },
        },
      ],
    });

    await alert.present();
  }
}