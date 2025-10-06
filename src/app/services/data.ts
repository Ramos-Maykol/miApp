import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Definimos una interfaz para el modelo de datos de Producto
export interface Producto {
  id?: string; // El ID será opcional, Firestore lo genera
  nombre: string;
  precio: number;
  stock: number;
}

// Definimos una interfaz para el modelo de datos de Cliente
export interface Cliente {
  id?: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Inyectamos el servicio de Firestore
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  // --- FUNCIONES CRUD PARA PRODUCTOS ---

  // Obtener todos los productos (Lectura)
  getProductos(): Observable<Producto[]> {
    const productosRef = collection(this.firestore, 'productos');
    return collectionData(productosRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  // Obtener un producto por su ID (Lectura)
  getProductoById(id: string): Observable<Producto> {
    const productoDocRef = doc(this.firestore, `productos/${id}`);
    return docData(productoDocRef, { idField: 'id' }) as Observable<Producto>;
  }

  // Crear un nuevo producto (Creación)
  createProducto(producto: Producto): Promise<DocumentReference<any>> {
    const productosRef = collection(this.firestore, 'productos');
    return addDoc(productosRef, producto);
  }

  // Actualizar un producto existente (Actualización)
  updateProducto(producto: Producto): Promise<void> {
    const productoDocRef = doc(this.firestore, `productos/${producto.id}`);
    // Creamos un objeto sin el campo 'id' para no guardarlo en el documento
    const { id, ...data } = producto; 
    return updateDoc(productoDocRef, data);
  }

  // Eliminar un producto (Borrado)
  deleteProducto(id: string): Promise<void> {
    const productoDocRef = doc(this.firestore, `productos/${id}`);
    return deleteDoc(productoDocRef);
  }


  // --- FUNCIONES CRUD PARA CLIENTES ---

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    const clientesRef = collection(this.firestore, 'clientes');
    return collectionData(clientesRef, { idField: 'id' }) as Observable<Cliente[]>;
  }

  // Obtener un cliente por su ID
  getClienteById(id: string): Observable<Cliente> {
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, { idField: 'id' }) as Observable<Cliente>;
  }

  // Crear un nuevo cliente
  createCliente(cliente: Cliente): Promise<DocumentReference<any>> {
    const clientesRef = collection(this.firestore, 'clientes');
    return addDoc(clientesRef, cliente);
  }

  // Actualizar un cliente
  updateCliente(cliente: Cliente): Promise<void> {
    const clienteDocRef = doc(this.firestore, `clientes/${cliente.id}`);
    const { id, ...data } = cliente;
    return updateDoc(clienteDocRef, data);
  }

  // Eliminar un cliente
  deleteCliente(id: string): Promise<void> {
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return deleteDoc(clienteDocRef);
  }
}