import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/login/auth.service";  // Importe o AuthService
import { User } from 'firebase/auth';  // Importação do tipo User do Firebase

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string | null = 'Usuário';  // Nome do usuário
  public userEmail: string | null = '';  // E-mail do usuário
  public profileImg: string = 'assets/images/dashboard/profile.jpg';  // Imagem do perfil padrão

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Carrega os dados do usuário autenticado
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        this.userName = user.displayName || 'Usuário';  // Nome do usuário, ou um valor padrão se não houver
        this.userEmail = user.email || 'Não informado';  // E-mail do usuário
        this.profileImg = user.photoURL || 'assets/images/dashboard/profile.jpg';  // Imagem de perfil ou uma padrão
      } else {
        this.userName = 'Usuário não autenticado';
        this.userEmail = 'Não autenticado';
      }
    });
  }

  // Função para fazer logout
  async logoutFunc() {
    await this.authService.logout();  // Realiza o logout via AuthService
    this.router.navigateByUrl('auth/login');  // Redireciona para a página de login
  }
}
