import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// ALTERADO: Importamos nosso novo serviço.
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credentials = {
    email: '',
    senha: ''
  };

  // Mensagem de erro para exibir no template
  errorMessage: string | null = null;

  // ALTERADO: Injetamos o AuthService e o Router.
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * ALTERADO: O método agora chama o serviço de autenticação.
   */
  login(): void {
    this.errorMessage = null; // Limpa erros anteriores
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Se o login for bem-sucedido, o serviço já salvou o token.
        // Nós apenas navegamos para a página principal da aplicação.
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/app/calculadora']);
      },
      error: (err) => {
        // Se ocorrer um erro (ex: 401 Unauthorized), exibimos uma mensagem.
        console.error('Erro no login:', err);
        this.errorMessage = 'Email ou senha inválidos. Tente novamente.';
      }
    });
  }
}