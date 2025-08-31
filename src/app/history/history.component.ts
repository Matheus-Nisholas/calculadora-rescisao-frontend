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
import { MatTooltipModule } from '@angular/material/tooltip';

// ALTERADO: Adicionamos MatDialogModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-history',
  standalone: true,
  // ALTERADO: Adicionamos MatDialogModule ao array de imports
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule 
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['criadoEm', 'nomeEmpregado', 'tipoRescisao', 'totalLiquido', 'acoes'];
  dataSource = new MatTableDataSource<HistoricoItem>();
  pageData: Page<HistoricoItem> | null = null;
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private calculadoraService: CalculadoraService,
    private router: Router,
    private dialog: MatDialog
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

  excluir(id: number, event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirmar Exclusão', 
        message: 'Você tem certeza que deseja excluir este cálculo do histórico?' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calculadoraService.excluirCalculo(id).subscribe({
          next: () => {
            console.log(`Cálculo ${id} excluído com sucesso.`);
            this.loadHistoryPage(this.pageData?.number || 0);
          },
          error: (err) => {
            console.error(`Erro ao excluir cálculo ${id}`, err);
          }
        });
      }
    });
  }
}