import { Injectable } from '@angular/core';
// ALTERADO: HttpHeaders não é mais necessário aqui.
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject, switchMap, of } from 'rxjs';

export interface UserProfile {
  id: number;
  email: string;
  nome: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private readonly TOKEN_KEY = 'auth_token';

  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: any): Observable<UserProfile> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.accessToken) {
          this.saveToken(response.accessToken);
        }
      }),
      switchMap(() => this.fetchAndStoreUser())
    );
  }
  
  fetchAndStoreUser(): Observable<UserProfile> {
    const token = this.getToken();
    if (!token) {
        this.currentUserSubject.next(null);
        return of(null as any);
    }

    // ALTERADO: A criação manual do cabeçalho foi removida!
    // O interceptor cuidará disso automaticamente para nós.
    return this.http.get<UserProfile>(`${this.apiUrl}/auth/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}