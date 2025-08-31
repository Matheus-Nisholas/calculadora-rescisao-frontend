import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CalculadoraService } from './calculadora.service';
import { Router } from '@angular/router'; // NOVO: Importa Router para navegação

// Importações do Angular Material (mantidas)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'; // NOVO: Para exibir lista no histórico resumido


@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    MatListModule // NOVO: Adicionado para usar MatList
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private initialRequestState = {
    tipoRescisao: 'SEM_JUSTA_CAUSA',
    salarioMensal: null,
    dataAdmissao: null,
    dataDesligamento: null,
    avisoIndenizado: false,
    feriasVencidasDias: 0,
    saldoFgtsDepositado: null,
    numeroDependentes: 0,
    nomeEmpregado: ''
  };

  public calculoRequest = { ...this.initialRequestState };
  public resultado: any | null = null;
  public ultimosCalculos: any[] = []; // NOVO: Para armazenar o resumo do histórico

  constructor(
    private calculadoraService: CalculadoraService,
    private cdr: ChangeDetectorRef,
    private router: Router // NOVO: Injeta o Router
  ) { }

  ngOnInit(): void {
    this.carregarUltimosCalculos(); // NOVO: Carrega o histórico ao iniciar
  }

  public calcular(): void {
    this.calculadoraService.calcular(this.calculoRequest).subscribe({
      next: (response) => {
        this.resultado = response;
        this.carregarUltimosCalculos(); // NOVO: Atualiza o histórico após um novo cálculo
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao calcular rescisão:', err);
      }
    });
  }

  public limpar(): void {
    this.calculoRequest = { ...this.initialRequestState };
    this.resultado = null;
  }

  // NOVO: Método para carregar os últimos 3 cálculos
  private carregarUltimosCalculos(): void {
    // Busca os 3 últimos, da primeira página (index 0)
    this.calculadoraService.getHistorico(0, 3).subscribe({ 
      next: (page) => {
        this.ultimosCalculos = page.content;
      },
      error: (err) => {
        console.error('Erro ao carregar últimos cálculos:', err);
      }
    });
  }

  // NOVO: Método para navegar para os detalhes do cálculo
  public navegarParaDetalhes(id: string): void {
    this.router.navigate(['/app/historico', id]);
  }

  // NOVO: Método para navegar para a página completa do histórico
  public navegarParaHistoricoCompleto(): void {
    this.router.navigate(['/app/historico']);
  }
}