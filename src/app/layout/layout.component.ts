import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; // Adicionado RouterLink e RouterLinkActive
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthService, UserProfile } from '../auth/auth.service';

// NOVO: Importações dos componentes do Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  // ALTERADO: Adicionamos os módulos do Material e do Router ao array de imports
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public currentUser$: Observable<UserProfile | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}