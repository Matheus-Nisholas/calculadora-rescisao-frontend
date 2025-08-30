import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  // ALTERADO: Mudamos o caminho relativo para o caminho absoluto da nossa API.
  private apiUrl = 'http://localhost:8080/api/v1/rescisoes';

  constructor(private http: HttpClient) { }

  public calcular(data: any): Observable<any> {
    // Agora a URL final será http://localhost:8080/api/v1/rescisoes/calcular
    return this.http.post<any>(`${this.apiUrl}/calcular`, data);
  }

  public getHistorico(page: number = 0, size: number = 10): Observable<any> {
    // Agora a URL final será http://localhost:8080/api/v1/rescisoes/historico
    return this.http.get<any>(`${this.apiUrl}/historico`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  public getHistoricoPorId(id: number): Observable<any> {
    // Agora a URL final será http://localhost:8080/api/v1/rescisoes/{id}
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(calculo => {
        if (calculo && calculo.componentesJson) {
          calculo.componentes = JSON.parse(calculo.componentesJson);
        }
        return calculo;
      })
    );
  }
}