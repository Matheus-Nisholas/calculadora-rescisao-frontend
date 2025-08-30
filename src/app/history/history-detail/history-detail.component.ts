import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CalculadoraService } from '../../calculadora/calculadora.service';

// NOVO: Importações dos componentes do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  // ALTERADO: Adicionamos os novos módulos ao array de imports
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  public calculoDetail$: Observable<any>;

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
}