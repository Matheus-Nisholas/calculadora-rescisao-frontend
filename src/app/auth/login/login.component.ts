import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Adicionado RouterLink
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

// NOVO: Importações dos componentes do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  // ALTERADO: Adicionamos os módulos do Material, incluindo MatCardModule
  imports: [
    CommonModule,
    FormsModule,
    RouterLink, // Adicionado para o link de registro
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credentials = {
    login: '',
    senha: ''
  };

  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = null;
    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/app/calculadora']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Login ou senha inválidos. Tente novamente.';
      }
    });
  }
}