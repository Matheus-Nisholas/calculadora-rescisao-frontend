import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CalculadoraService } from '../../calculadora/calculadora.service';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
// ALTERADO: Adicionamos MatIconModule e MatButtonModule
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  // ALTERADO: Adicionamos os módulos que faltavam ao array de imports
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatIconModule, // Necessário para <mat-icon>
    MatButtonModule, // Necessário para mat-flat-button e mat-stroked-button
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  public calculoDetail$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private calculadoraService: CalculadoraService
  ) {}

  ngOnInit(): void {
    this.calculoDetail$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.calculadoraService.getHistoricoPorId(id);
      })
    );
  }

  baixarPdf(id: number): void {
    this.calculadoraService.getPdfCalculo(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recibo_rescisao_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (err) => {
        console.error('Erro ao baixar o PDF:', err);
      }
    });
  }
}