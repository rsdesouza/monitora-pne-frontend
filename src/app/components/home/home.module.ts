import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { EstrategiaComponent } from "./estrategia/estrategia.component";
import { PlanoAcaoComponent } from "./plano-acao/plano-acao.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [CadastroComponent, EstrategiaComponent, PlanoAcaoComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
