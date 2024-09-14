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

  public loading = false;

  async login() {
    if (this.loginForm.valid) {
      this.loading = true;  // Inicia o carregamento
      const { email, password } = this.loginForm.value;
      try {
        const userCredential = await this.authService.login(email, password);
        if (userCredential) {
          localStorage.setItem('user', JSON.stringify(userCredential.user));
          this.router.navigate(['/selecao-estado']);
        }
      } catch (error) {
        this.errorMessage = 'Falha ao fazer login. Verifique suas credenciais.';
      } finally {
        this.loading = false;  // Para o carregamento
      }
    }
  }
}
