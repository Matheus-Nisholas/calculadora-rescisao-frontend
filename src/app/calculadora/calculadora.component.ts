import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CalculadoraService } from './calculadora.service';

// NOVO: Importações dos componentes de formulário do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core'; // Necessário para o Datepicker

@Component({
  selector: 'app-calculadora',
  standalone: true,
  // ALTERADO: Adicionamos os novos módulos ao array de imports
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  // NOVO: Adicionamos o provider para o Datepicker
  providers: [provideNativeDateAdapter()],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.css']
})
export class CalculadoraComponent implements OnInit {

  public calculoRequest = {
    tipoRescisao: 'SEM_JUSTA_CAUSA',
    salarioMensal: null,
    dataAdmissao: null,
    dataDesligamento: null,
    avisoIndenizado: false,
    feriasVencidasDias: 0,
    saldoFgtsDepositado: null,
    numeroDependentes: 0
  };

  public resultado: any | null = null;
  public historico: any[] = []; // Este histórico não é mais exibido aqui, mas mantemos a lógica

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    // A busca do histórico agora acontece na página de Histórico
  }

  public calcular(): void {
    // A lógica de cálculo permanece a mesma
    this.calculadoraService.calcular(this.calculoRequest).subscribe({
      next: (response) => {
        this.resultado = response;
        // Não precisamos mais recarregar o histórico aqui
      },
      error: (err) => {
        console.error('Erro ao calcular rescisão:', err);
      }
    });
  }
}