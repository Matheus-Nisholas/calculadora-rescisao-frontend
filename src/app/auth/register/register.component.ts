import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // ALTERADO: Importamos o RouterLink
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

// ALTERADO: Importações dos componentes do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  // ALTERADO: Adicionamos RouterLink e todos os módulos do Material necessários
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  // Reutilizamos o mesmo CSS do login para manter a consistência
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userData = {
    nome: '',
    email: '',
    senha: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    this.authService.register(this.userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro no registro:', err);
        if (err.status === 400) {
          this.errorMessage = 'Este email já está em uso. Por favor, tente outro.';
        } else {
          this.errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        }
      }
    });
  }
}