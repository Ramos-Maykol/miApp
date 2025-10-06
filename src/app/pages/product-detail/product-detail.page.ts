import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';
import { first } from 'rxjs/operators';

// Importa el servicio y la interfaz
import { DataService, Producto } from '../../services/data';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    IonBackButton, IonButtons, IonIcon, IonButton, IonInput, IonItem, IonList,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, ReactiveFormsModule
  ]
})
export class ProductDetailPage implements OnInit {
  // Inyectamos los servicios necesarios
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  // Variable para guardar el ID del producto si estamos editando
  productId: string | null = null;

  // Creamos el formulario con sus campos y validaciones
  productForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl(0, [Validators.required, Validators.min(0)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor() {
    addIcons({ saveOutline });
  }

  ngOnInit() {
    // Obtenemos el ID de la URL
    this.productId = this.route.snapshot.paramMap.get('id');

    // Si hay un ID, significa que estamos en modo "Editar"
    if (this.productId) {
      this.dataService.getProductoById(this.productId).pipe(first()).subscribe(producto => {
        if (producto) {
          // Rellenamos el formulario con los datos del producto
          this.productForm.setValue({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock
          });
        }
      });
    }
  }

  // --- Función para guardar los cambios o crear el producto ---
  async saveProduct() {
    if (this.productForm.valid) {
      const productoData = this.productForm.value as Producto;

      try {
        if (this.productId) {
          // --- Modo Editar ---
          // Le añadimos el ID al objeto antes de mandarlo a actualizar
          productoData.id = this.productId;
          await this.dataService.updateProducto(productoData);
        } else {
          // --- Modo Crear ---
          await this.dataService.createProducto(productoData);
        }
        // Navegamos de regreso a la lista de productos
        this.router.navigate(['/products']);
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    }
  }
}