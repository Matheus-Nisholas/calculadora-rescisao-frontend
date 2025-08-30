import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';

import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'calculadora', component: CalculadoraComponent },
      // NOVO: Rota para a página de histórico
      { path: 'historico', component: HistoryComponent },
      { path: '', redirectTo: 'calculadora', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];