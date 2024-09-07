import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      take(1),  // Pega apenas o primeiro valor emitido pelo Observable
      map(user => {
        if (user) {
          return true;  // Permite o acesso à rota se o usuário estiver autenticado
        } else {
          this.router.navigate(['/login']);  // Redireciona para o login se o usuário não estiver autenticado
          return false;
        }
      })
    );
  }
}
