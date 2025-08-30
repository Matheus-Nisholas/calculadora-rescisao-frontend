import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

/**
 * Interceptor funcional que anexa o token JWT a todas as requisições
 * HTTP que vão para a nossa API.
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Se não houver token, a requisição segue normalmente sem alterações.
  if (!token) {
    return next(req);
  }

  // Se houver um token, clonamos a requisição e adicionamos o cabeçalho.
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  // Enviamos a requisição clonada com o cabeçalho.
  return next(clonedReq);
};