import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Necessário para usar a pipe 'async'

// ALTERADO: Importamos o AuthService e o perfil do usuário
import { AuthService, UserProfile } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  // ALTERADO: Criamos um observable para os dados do usuário.
  // A pipe 'async' no template fará o subscribe e unsubscribe automaticamente.
  currentUser$: Observable<UserProfile | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  /**
   * ALTERADO: Método que será chamado pelo botão "Sair".
   */
  logout(): void {
    this.authService.logout();
  }
}