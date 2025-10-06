import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inyectamos los servicios de Firebase Auth y el Router de Angular
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  // --- Función para comprobar el estado de la autenticación ---
  // authState es un observable que nos dice en tiempo real si el usuario
  // ha iniciado sesión o no. Emite el objeto 'user' o 'null'.
  getAuthState() {
    return authState(this.auth);
  }

  // --- Función para Iniciar Sesión (Login) ---
  async login({ email, password }: any) {
    try {
      // Usamos la función de Firebase para el login
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      
      // Si el login es exitoso, redirigimos a la página de productos
      if (userCredential) {
        this.router.navigate(['/products']);
      }
      
      return userCredential;
    } catch (error) {
      // Manejo de errores (p. ej., contraseña incorrecta)
      console.error("Error en el login:", error);
      return null;
    }
  }

  // --- Función para Registrar un nuevo usuario ---
  async register({ email, password }: any) {
    try {
      // Usamos la función de Firebase para crear un nuevo usuario
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Si el registro es exitoso, redirigimos a la página de productos
      if (userCredential) {
        this.router.navigate(['/products']);
      }

      return userCredential;
    } catch (error) {
      // Manejo de errores (p. ej., el email ya está en uso)
      console.error("Error en el registro:", error);
      return null;
    }
  }

  // --- Función para Cerrar Sesión (Logout) ---
  async logout() {
    try {
      // Usamos la función de Firebase para cerrar la sesión
      await signOut(this.auth);
      // Al cerrar sesión, redirigimos a la página de login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

}