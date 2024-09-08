import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';  // Importação do firebase compat

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    public router: Router, 
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const userCredential: firebase.auth.UserCredential = await this.authService.login(email, password);  // Utilizando o tipo do Firebase compat
        if (userCredential && userCredential.user) {
          localStorage.setItem("user", JSON.stringify(userCredential.user));  // Armazena o usuário no localStorage
          this.router.navigate(["/selecao-estado"]);  // Redireciona após login
        }
      } catch (error) {
        this.errorMessage = "Falha ao fazer login. Verifique suas credenciais.";
      }
    }
  }
}
