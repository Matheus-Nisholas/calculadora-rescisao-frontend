import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';

export const routes: Routes = [
  // Rotas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rotas privadas protegidas pelo AuthGuard
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'calculadora', component: CalculadoraComponent },
      // Futuras rotas privadas, como 'historico', viriam aqui
      { path: '', redirectTo: 'calculadora', pathMatch: 'full' }
    ]
  },

  // Redirecionamentos padrão
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];