import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EstrategiaComponent } from './estrategia/estrategia.component';
import { PlanoAcaoComponent } from './plano-acao/plano-acao.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module'; // Certifique-se de que o caminho está correto

@NgModule({
  declarations: [
    CadastroComponent,
    EstrategiaComponent,
    PlanoAcaoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, // Roteamento específico do HomeModule
    SharedModule       // Certifique-se que o SharedModule contém todos os componentes compartilhados
  ]
})
export class HomeModule {}
