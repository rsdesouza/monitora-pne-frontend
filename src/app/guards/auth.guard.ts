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
    // Verifica se o usuário está navegando anonimamente
    const isAnonymous = localStorage.getItem('isAnonymous') === 'true';

    if (isAnonymous) {
      return new Observable<boolean>(observer => {
        observer.next(true);  // Permite o acesso anônimo
        observer.complete();
      });
    }

    // Caso não seja anônimo, verifica a autenticação do Firebase
    return this.authService.isAuthenticated().pipe(
      take(1),  // Verifica uma vez o estado de autenticação
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;  // Permite o acesso se o usuário estiver logado
        } else {
          this.router.navigate(['/auth/login']);  // Redireciona para login se não estiver logado
          return false;
        }
      })
    );
  }
}
