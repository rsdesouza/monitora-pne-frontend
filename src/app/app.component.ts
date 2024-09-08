import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth/login']);  // Redireciona para login se o usuário não estiver autenticado
      }
    });
  }
}
