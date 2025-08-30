import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalculadoraService } from '../calculadora/calculadora.service';
import { Page, HistoricoItem } from './history.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; // Para a dica no botão de excluir

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  
  // ALTERADO: Adicionadas as colunas 'nomeEmpregado' e 'acoes'
  displayedColumns: string[] = ['criadoEm', 'nomeEmpregado', 'tipoRescisao', 'totalLiquido', 'acoes'];
  dataSource = new MatTableDataSource<HistoricoItem>();
  pageData: Page<HistoricoItem> | null = null;
  isLoading = true;

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

  /**
   * NOVO: Método para excluir um item do histórico.
   * @param id O ID do cálculo a ser excluído.
   * @param event O evento de clique, para impedir a navegação.
   */
  excluir(id: number, event: MouseEvent): void {
    event.stopPropagation(); // Impede que o clique na linha navegue para os detalhes

    // Futuramente, podemos adicionar um modal de confirmação aqui ("Tem certeza?")
    this.calculadoraService.excluirCalculo(id).subscribe({
      next: () => {
        console.log(`Cálculo ${id} excluído com sucesso.`);
        // Recarrega a página atual do histórico para refletir a exclusão
        this.loadHistoryPage(this.pageData?.number || 0);
      },
      error: (err) => {
        console.error(`Erro ao excluir cálculo ${id}`, err);
        // Informar o usuário sobre o erro
      }
    });
  }
}