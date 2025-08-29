import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from './calculadora.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calculadora',
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
    mesesTrabalhadosNoAnoAtual: 0,
    saldoFgtsDepositado: null
  };

  public resultado: any | null = null;
  public historico: any[] = [];

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.carregarHistorico();
  }

  /**
   * Realiza o cálculo de rescisão ao submeter o formulário.
   */
  public calcular(): void {
    // Formata as datas para o padrão yyyy-MM-dd que a API espera
    const formattedRequest = {
      ...this.calculoRequest,
      dataAdmissao: this.calculoRequest.dataAdmissao,
      dataDesligamento: this.calculoRequest.dataDesligamento
    };

    this.calculadoraService.calcular(formattedRequest).subscribe({
      next: (response) => {
        this.resultado = response;
        this.carregarHistorico();
      },
      error: (err) => {
        console.error('Erro ao calcular rescisão:', err);
      }
    });
  }

  /**
   * Busca e exibe o histórico de cálculos.
   */
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