import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/login/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),  // Verifica uma vez o estado de autenticação
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;  // Se o usuário estiver logado, permite o acesso
        } else {
          this.router.navigate(['/auth/login']);  // Redireciona para o login se não estiver logado
          return false;
        }
      })
    );
  }
}
