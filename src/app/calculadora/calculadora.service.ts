import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Serviço que interage com os endpoints da API de rescisão.
 */
@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  private apiUrl = '/api/v1/rescisoes';

  constructor(private http: HttpClient) { }

  /**
   * Envia os dados de cálculo para a API.
   * @param data Dados de entrada do cálculo.
   * @returns Observable com o resultado do cálculo.
   */
  public calcular(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/calcular`, data);
  }

  /**
   * Obtém o histórico paginado de cálculos.
   * @param page Número da página (começa em 0).
   * @param size Tamanho da página.
   * @returns Observable com a lista de cálculos.
   */
  public getHistorico(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/historico`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

}