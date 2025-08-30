import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // NOVO: Importamos o Router
import { Page } from './history.component'; // Mantemos a interface Page

// NOVO: Importações do Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CalculadoraService } from '../calculadora/calculadora.service';

// NOVO: Interface para tipar os itens do histórico
export interface HistoricoItem {
  id: number;
  criadoEm: string;
  tipoRescisao: string;
  salarioMensal: number;
  dataDesligamento: string;
  totalLiquido: number;
}

@Component({
  selector: 'app-history',
  standalone: true,
  // ALTERADO: Adicionamos os novos módulos do Material
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  
  // Nomes das colunas que a tabela irá exibir. A ordem aqui define a ordem na tela.
  displayedColumns: string[] = ['criadoEm', 'tipoRescisao', 'salarioMensal', 'totalLiquido', 'dataDesligamento'];
  
  // DataSource que conecta a tabela aos dados
  dataSource = new MatTableDataSource<HistoricoItem>();

  // Dados da paginação
  pageData: Page<HistoricoItem> | null = null;
  isLoading = true;

  // Referência ao componente de ordenação no template
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private calculadoraService: CalculadoraService,
    private router: Router // Injetamos o Router para navegação
  ) {}

  ngOnInit(): void {
    this.loadHistoryPage(0); // Carrega a primeira página ao iniciar
  }

  ngAfterViewInit(): void {
    // Conectamos o sorter ao dataSource após o template ser renderizado
    this.dataSource.sort = this.sort;
  }

  loadHistoryPage(page: number): void {
    this.isLoading = true;
    this.calculadoraService.getHistorico(page, 10).subscribe(data => {
      this.pageData = data;
      this.dataSource.data = data.content; // Alimenta a tabela com os dados
      this.isLoading = false;
    });
  }

  previousPage(): void {
    if (this.pageData && !this.pageData.first) {
      this.loadHistoryPage(this.pageData.number - 1);
    }
  }

  nextPage(): void {
    if (this.pageData && !this.pageData.last) {
      this.loadHistoryPage(this.pageData.number + 1);
    }
  }

  // NOVO: Método para navegar para os detalhes ao clicar em uma linha
  navigateToDetail(id: number): void {
    this.router.navigate(['/app/historico', id]);
  }
}