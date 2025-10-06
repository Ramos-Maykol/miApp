import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  
  // Inyectamos el servicio de autenticación y el router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Usamos el observable del estado de autenticación del servicio
  return authService.getAuthState().pipe(
    // take(1) asegura que solo nos suscribimos una vez para obtener el estado actual
    take(1),
    
    // map transforma el resultado (el usuario) en un booleano o una redirección
    map(user => {
      // Si 'user' no es nulo, significa que el usuario ha iniciado sesión.
      if (user) {
        // Permitimos el acceso a la ruta.
        return true;
      } else {
        // Si 'user' es nulo, no ha iniciado sesión.
        // Redirigimos a la página de login.
        return router.createUrlTree(['/login']);
      }
    })
  );
};