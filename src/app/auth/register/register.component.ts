import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  // Usaremos o mesmo CSS do login para manter a consistência visual
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {

  // Objeto para os dados do formulário de registro
  userData = {
    nome: '',
    email: '',
    senha: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.register(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        // Após 2 segundos, navega para a tela de login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
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