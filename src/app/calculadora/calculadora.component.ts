import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CalculadoraService } from './calculadora.service';
import { Router } from '@angular/router';

// Imports do Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'; // Necessário para a lista de histórico
import { MatIconModule } from '@angular/material/icon';   // Necessário para os ícones

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
    MatDividerModule, MatListModule, MatIconModule
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
  public ultimosCalculos: any[] = []; // NOVO: Propriedade para o histórico resumido

  constructor(
    private calculadoraService: CalculadoraService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarUltimosCalculos(); // Carrega o resumo ao iniciar
  }

  public calcular(): void {
    this.calculadoraService.calcular(this.calculoRequest).subscribe({
      next: (response) => {
        this.resultado = response;
        this.carregarUltimosCalculos(); // Atualiza o resumo após novo cálculo
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

  // NOVO: Método para buscar os últimos 3 cálculos
  private carregarUltimosCalculos(): void {
    this.calculadoraService.getHistorico(0, 3).subscribe({
      next: (page) => {
        this.ultimosCalculos = page.content;
      },
      error: (err) => {
        console.error('Erro ao carregar o histórico resumido:', err);
        this.ultimosCalculos = [];
      }
    });
  }

  // NOVO: Métodos de navegação
  public navegarParaDetalhes(id: number): void {
    this.router.navigate(['/app/historico', id]);
  }

  public navegarParaHistoricoCompleto(): void {
    this.router.navigate(['/app/historico']);
  }
}