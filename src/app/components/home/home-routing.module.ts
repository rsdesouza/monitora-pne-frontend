import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { EstrategiaComponent } from "./estrategia/estrategia.component";
import { PlanoAcaoComponent } from "./plano-acao/plano-acao.component";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "cadastro",
        component: CadastroComponent,
      },
      {
        path: "estrategia",
        component: EstrategiaComponent,
      },
      {
        path: "plano-acao",
        component: PlanoAcaoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
