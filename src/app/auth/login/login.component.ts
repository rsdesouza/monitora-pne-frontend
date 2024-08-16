import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service'; // Importa o serviço de autenticação que você criará

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
    private authService: AuthService, // Injete o serviço de autenticação
    private afAuth: AngularFireAuth
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
        const userCredential = await this.authService.login(email, password);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        this.router.navigate(["/home"]);
      } catch (error) {
        this.errorMessage = "Falha ao fazer login. Verifique suas credenciais.";
      }
    }
  }

}
