import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from './calculadora.service';

// ALTERADO: Adicionamos CommonModule e FormsModule para que o componente
// possa usar diretivas como *ngIf, *ngFor e [(ngModel)] sem depender de um módulo.
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  // ALTERADO: Adicionamos a propriedade 'standalone: true'.
  standalone: true,
  // ALTERADO: Adicionamos o array 'imports'.
  imports: [CommonModule, FormsModule], 
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
  public historico: any[] = [];

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.carregarHistorico();
  }

  public calcular(): void {
    this.calculadoraService.calcular(this.calculoRequest).subscribe({
      next: (response) => {
        this.resultado = response;
        this.carregarHistorico();
      },
      error: (err) => {
        console.error('Erro ao calcular rescisão:', err);
      }
    });
  }

  public carregarHistorico(): void {
    this.calculadoraService.getHistorico().subscribe({
      next: (response) => {
        this.historico = response.content;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico:', err);
      }
    });
  }
}