import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  private apiUrl = 'http://localhost:8080/api/v1/rescisoes';

  constructor(private http: HttpClient) { }

  public calcular(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/calcular`, data);
  }

  public getHistorico(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/historico`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  public getHistoricoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(calculo => {
        if (calculo && calculo.componentesJson) {
          calculo.componentes = JSON.parse(calculo.componentesJson);
        }
        return calculo;
      })
    );
  }

  /**
   * NOVO: Adicione este método.
   * Envia uma requisição para excluir um cálculo do histórico.
   * @param id O ID do cálculo a ser excluído.
   */
  public excluirCalculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}