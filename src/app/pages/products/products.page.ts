import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButtons, IonButton, IonItemSliding, IonItemOptions, IonItemOption, AlertController, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, logOutOutline, listOutline, createOutline, trashOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';

// Importa los servicios y la interfaz
import { DataService, Producto } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonItemOption, IonItemOptions, IonItemSliding, IonButton, IonButtons, IonIcon, IonFabButton, IonFab, IonLabel, IonItem, IonList,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, RouterLink,IonMenuButton
  ]
})
export class ProductsPage {
  // Inyectamos los servicios necesarios
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  private alertCtrl = inject(AlertController);

  // Creamos un observable para la lista de productos
  public productos$: Observable<Producto[]>;

  constructor() {
    // Obtenemos los productos del servicio
    this.productos$ = this.dataService.getProductos();

    // Agregamos los íconos que usaremos
    addIcons({ add, logOutOutline, listOutline, createOutline, trashOutline });
  }

  // --- Función para cerrar sesión ---
  logout() {
    this.authService.logout();
  }

  // --- Función para eliminar un producto ---
  async deleteProduct(producto: Producto) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar borrado',
      message: `¿Estás seguro de que quieres eliminar "${producto.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Si el usuario confirma, llamamos al servicio para borrar
            this.dataService.deleteProducto(producto.id!)
              .then(() => console.log('Producto eliminado'))
              .catch(err => console.error('Error al eliminar:', err));
          },
        },
      ],
    });

    await alert.present();
  }
}