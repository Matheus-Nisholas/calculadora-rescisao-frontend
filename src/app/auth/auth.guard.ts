import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guarda de rota funcional para proteger rotas que exigem autenticação.
 * * @returns `true` se o usuário estiver logado, ou um `UrlTree` para
 * redirecionar para a página de login caso não esteja.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Injetamos os serviços necessários dentro da função.
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos se o usuário está logado usando nosso AuthService.
  if (authService.isLoggedIn()) {
    return true; // Permissão concedida. O usuário pode acessar a rota.
  } else {
    // Permissão negada. Redirecionamos o usuário para a tela de login.
    console.warn('Acesso negado. Redirecionando para /login');
    return router.createUrlTree(['/login']);
  }
};