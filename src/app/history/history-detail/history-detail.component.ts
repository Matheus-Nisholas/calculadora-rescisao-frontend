import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CalculadoraService } from '../../calculadora/calculadora.service';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    // Usamos a rota ativa para pegar o parâmetro 'id' da URL
    // e em seguida chamamos o serviço para buscar os detalhes.
    this.calculoDetail$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.calculadoraService.getHistoricoPorId(id);
      })
    );
  }
}