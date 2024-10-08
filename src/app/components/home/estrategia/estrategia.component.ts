import { Component } from '@angular/core';

@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
  styleUrls: ['./estrategia.component.scss']
})
export class EstrategiaComponent {
  currentView: string = 'table';  // Define a visualização inicial como 'table'

  // Dados dos Estratégias
  estrategias: number = 16;
  concluidos: number = 12;
  emAndamento: number = 0;

  // Alterna entre as visualizações de Tabela, Gráficos e Streamlit
  switchView(view: string): void {
    this.currentView = view;
  }
}
