import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CalculadoraService } from '../calculadora/calculadora.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  // Usaremos um Observable para carregar os dados de forma reativa com a pipe 'async'
  public historico$: Observable<any>;

  constructor(private calculadoraService: CalculadoraService) {}

  ngOnInit(): void {
    // Ao iniciar o componente, chamamos o serviço para buscar o histórico.
    // O HttpInterceptor cuidará de adicionar o token de autenticação.
    this.historico$ = this.calculadoraService.getHistorico();
  }
}