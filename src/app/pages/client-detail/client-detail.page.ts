import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';
import { first } from 'rxjs/operators';

// Importa el servicio y la interfaz de Cliente
import { DataService, Cliente } from '../../services/data';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
  standalone: true,
  imports: [
    IonBackButton, IonButtons, IonIcon, IonButton, IonInput, IonItem, IonList,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, ReactiveFormsModule
  ]
})
export class ClientDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  clientId: string | null = null;

  // Formulario con los campos y validaciones para Cliente
  clientForm = new FormGroup({
    nombreCompleto: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
  });

  constructor() {
    addIcons({ saveOutline });
  }

  ngOnInit() {
    // Obtenemos el ID del cliente de la URL
    this.clientId = this.route.snapshot.paramMap.get('id');

    if (this.clientId) {
      // Modo Editar: cargamos los datos del cliente
      this.dataService.getClienteById(this.clientId).pipe(first()).subscribe(cliente => {
        if (cliente) {
          this.clientForm.setValue({
            nombreCompleto: cliente.nombreCompleto,
            email: cliente.email,
            telefono: cliente.telefono
          });
        }
      });
    }
  }

  async saveClient() {
    if (this.clientForm.valid) {
      const clienteData = this.clientForm.value as Cliente;

      try {
        if (this.clientId) {
          // --- Modo Editar ---
          clienteData.id = this.clientId;
          await this.dataService.updateCliente(clienteData);
        } else {
          // --- Modo Crear ---
          await this.dataService.createCliente(clienteData);
        }
        // Regresamos a la lista de clientes
        this.router.navigate(['/clients']);
      } catch (error) {
        console.error('Error al guardar el cliente:', error);
      }
    }
  }
}