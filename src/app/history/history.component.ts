import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // ALTERADO: Adicionado RouterLink
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalculadoraService } from '../calculadora/calculadora.service';
// ALTERADO: Importando as interfaces do novo arquivo de modelo.
import { Page, HistoricoItem } from './history.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink // ALTERADO: Adicionado RouterLink aos imports
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['criadoEm', 'tipoRescisao', 'salarioMensal', 'totalLiquido', 'dataDesligamento'];
  dataSource = new MatTableDataSource<HistoricoItem>();
  pageData: Page<HistoricoItem> | null = null;
  isLoading = true;

  // ALTERADO: Adicionado '!' para indicar ao TypeScript que será inicializada depois.
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private calculadoraService: CalculadoraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHistoryPage(0);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadHistoryPage(page: number): void {
    this.isLoading = true;
    this.calculadoraService.getHistorico(page, 10).subscribe(data => {
      this.pageData = data;
      this.dataSource.data = data.content;
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

  navigateToDetail(id: number): void {
    this.router.navigate(['/app/historico', id]);
  }
}