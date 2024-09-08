import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUser: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // Persistência de autenticação
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    // Escuta o estado de autenticação
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });

    this.currentUser = this.userSubject.asObservable();
  }

  // Método de login que retorna o UserCredential
  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.userSubject.next(credential.user);
    return credential;
  }

  async logout() {
    await this.afAuth.signOut();
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Retorna o estado atual do usuário (logado ou não)
  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.currentUser.pipe(
      map(user => !!user)
    );
  }
}
