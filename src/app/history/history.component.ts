import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { CalculadoraService } from '../calculadora/calculadora.service';

// NOVO: Interface para tipar a resposta paginada da API Spring
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // número da página atual (0-indexed)
  first: boolean;
  last: boolean;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  // ALTERADO: BehaviorSubject para controlar a página atual. Inicia na página 0.
  private currentPage = new BehaviorSubject<number>(0);
  
  // ALTERADO: O observable principal agora é acionado por mudanças na página atual.
  public historicoPage$: Observable<Page<any>>;

  constructor(private calculadoraService: CalculadoraService) {}

  ngOnInit(): void {
    // ALTERADO: Criamos um "pipeline" que escuta por mudanças no `currentPage`.
    // Toda vez que `currentPage` emitir um novo valor, o `switchMap` cancela
    // a requisição anterior e faz uma nova chamada ao serviço com o novo número da página.
    this.historicoPage$ = this.currentPage.pipe(
      switchMap(pageNumber => this.calculadoraService.getHistorico(pageNumber, 10)) // Mantemos o tamanho fixo em 10 por enquanto
    );
  }

  /**
   * NOVO: Navega para a próxima página.
   */
  nextPage(): void {
    const nextPage = this.currentPage.value + 1;
    this.currentPage.next(nextPage);
  }

  /**
   * NOVO: Navega para a página anterior.
   */
  previousPage(): void {
    const prevPage = this.currentPage.value - 1;
    this.currentPage.next(prevPage);
  }
}