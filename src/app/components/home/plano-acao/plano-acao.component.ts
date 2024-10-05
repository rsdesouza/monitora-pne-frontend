import { Component } from '@angular/core';

@Component({
  selector: 'app-plano-acao',
  templateUrl: './plano-acao.component.html',
  styleUrls: ['./plano-acao.component.scss']
})
export class PlanoAcaoComponent {
  currentView: string = 'table';  // Define a visualização inicial como 'table'

  // Dados dos Planos de Ação
  totalPlanosAcao: number = 16;
  concluidos: number = 12;
  emAndamento: number = 0;
  atrasados: number = 4;

  // Alterna entre as visualizações de Tabela e Gráficos
  switchView(view: string): void {
    this.currentView = view;
  }
}
