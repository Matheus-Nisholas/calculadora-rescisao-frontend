import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  today: Date = new Date();

  private apiUrl = `${environment.apiUrl}/api/v1/rescisoes`;

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

  /**
   * NOVO: Adicione este método.
   * Ele busca um cálculo específico do histórico pelo seu ID.
   * @param id O ID do cálculo a ser buscado.
   */
  public getHistoricoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(calculo => {
        // Lógica para parsear o JSON de componentes, se necessário
        if (calculo && typeof calculo.componentesJson === 'string') {
          try {
            calculo.componentes = JSON.parse(calculo.componentesJson);
          } catch (e) {
            console.error('Falha ao parsear o JSON de componentes:', e);
            calculo.componentes = [];
          }
        }
        return calculo;
      })
    );
  }

  public excluirCalculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public getPdfCalculo(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      responseType: 'blob'
    });
  }
}