import { Routes } from '@angular/router';

// ALTERADO: Importamos o nosso novo guarda de rota.
import { authGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'app',
    component: LayoutComponent,
    // ALTERADO: Adicionamos a propriedade `canActivate` e passamos nosso guarda.
    // Agora, para acessar a rota '/app' ou qualquer uma de suas filhas,
    // o `authGuard` será executado primeiro.
    canActivate: [authGuard], 
    children: [
      { path: 'calculadora', component: CalculadoraComponent },
      { path: '', redirectTo: 'calculadora', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];