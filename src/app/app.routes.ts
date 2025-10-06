import { Routes } from '@angular/router';
// Importa el guardián que crearemos más adelante
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // 1. Ruta por defecto: si no hay ruta, redirige a la lista de productos.
  // El authGuard se encargará de enviar al login si no hay sesión.
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // --- RUTAS PÚBLICAS (No requieren login) ---
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },

  // --- RUTAS PROTEGIDAS (Requieren login) ---
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage),
    canActivate: [authGuard] // <-- RUTA PROTEGIDA
  },
  {
    path: 'product-detail', // Ruta para CREAR un producto nuevo
    loadComponent: () => import('./pages/product-detail/product-detail.page').then( m => m.ProductDetailPage),
    canActivate: [authGuard] // <-- RUTA PROTEGIDA
  },
  {
    path: 'product-detail/:id', // Ruta para EDITAR un producto existente (nota el :id)
    loadComponent: () => import('./pages/product-detail/product-detail.page').then( m => m.ProductDetailPage),
    canActivate: [authGuard] // <-- RUTA PROTEGIDA
  },
  {
    path: 'clients',
    loadComponent: () => import('./pages/clients/clients.page').then( m => m.ClientsPage),
    canActivate: [authGuard] // <-- RUTA PROTEGIDA
  },
  {
    path: 'client-detail', // Ruta para CREAR un cliente nuevo
    loadComponent: () => import('./pages/client-detail/client-detail.page').then( m => m.ClientDetailPage),
    canActivate: [authGuard] // <-- RUTA PROTEGIDA
  },
  {
    path: 'client-detail/:id', // Ruta para EDITAR un cliente existente
    loadComponent: () => import('./pages/client-detail/client-detail.page').then( m => m.ClientDetailPage),
    canActivate: [authGuard] // <-- RUTA PROTEGIDA
  },
];