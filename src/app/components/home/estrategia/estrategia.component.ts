import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
  styleUrls: ['./estrategia.component.scss']
})
export class EstrategiaComponent implements OnInit {
  currentView: string = 'table'; // Define a visualização inicial como 'table'

  // Dados dos cards de resumo
  totalEstrategias: number = 0;
  concluidos: number = 0;
  emAndamento: number = 0;
  atrasados: number = 0;
  descontinuados: number = 0;

  // Dados das estratégias agrupadas por indicador
  estrategiasPorIndicador: { [key: string]: any[] } = {};

  private readonly apiUrl = 'https://monitora-pne-backend-386059856247.us-central1.run.app/api/estrategias';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarEstrategiasPorIndicador();
  }

  // Alterna entre as visualizações de tabela e gráficos
  switchView(view: string): void {
    this.currentView = view;
  }

  // Carrega os dados do resumo
  carregarResumo(): void {
    this.http.get<any>(`${this.apiUrl}/resumo`).subscribe(
      data => {
        this.totalEstrategias = data.totalEstrategias;
        this.concluidos = data.concluidas;
        this.emAndamento = data.emAndamento;
        this.atrasados = data.atrasadas;
        this.descontinuados = data.descontinuadas;
      },
      error => {
        console.error('Erro ao carregar resumo das estratégias:', error);
      }
    );
  }

  // Carrega as estratégias agrupadas por indicador
  carregarEstrategiasPorIndicador(): void {
    this.http.get<{ [key: string]: any[] }>(`${this.apiUrl}/indicadores`).subscribe(
      data => {
        this.estrategiasPorIndicador = data;
      },
      error => {
        console.error('Erro ao carregar estratégias por indicador:', error);
      }
    );
  }

  // Retorna os indicadores presentes no agrupamento
  getIndicadores(): string[] {
    return Object.keys(this.estrategiasPorIndicador || {});
  }

  // Calcula o progresso com validação
  calcularProgresso(valor: number | null | undefined): number {
    return valor ? Math.min(Math.max(valor, 0), 100) : 0;
  }
}
