import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { full } from './shared/routes/full.routes';
import { AdminGuard } from './shared/guard/admin.guard';
import { content } from './shared/routes/routes';
import { ForgetPasswordComponent } from './pages/authentication/forget-password/forget-password.component';
import { SelecaoEstadoComponent } from './components/selecao-estado/selecao-estado.component'; // Importação do SelecaoEstadoComponent
import { AuthGuard } from './guards/auth.guard'; // Importação do AuthGuard

const routes: Routes = [
  {
    path: 'selecao-estado',
    component: SelecaoEstadoComponent,
  },
  {
    path: '',
    redirectTo: 'home', // Redirecionamento padrão para Home
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'authentication/forgot-password',
    component: ForgetPasswordComponent
  },
  {
    path: '',
    component: ContentComponent,
    children: content
  },
  {
    path: '',
    component: FullComponent,
    children: full
  },
  {
    path: '**',
    redirectTo: 'home' // Redireciona rotas inválidas para o login
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
