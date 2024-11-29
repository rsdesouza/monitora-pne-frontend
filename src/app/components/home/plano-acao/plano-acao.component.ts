import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plano-acao',
  templateUrl: './plano-acao.component.html',
  styleUrls: ['./plano-acao.component.scss']
})
export class PlanoAcaoComponent implements OnInit {
  currentView: string = 'table';

  totalPlanosAcao: number = 0;
  concluidos: number = 0;
  emAndamento: number = 0;
  atrasados: number = 0;

  planosPorIndicador: { [key: string]: any[] } = {};
  indicadores: string[] = []; // Armazena os indicadores para exibição

  private readonly apiUrl = 'https://monitora-pne-backend-386059856247.us-central1.run.app/api/planos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarPlanosPorIndicador();
  }

  switchView(view: string): void {
    this.currentView = view;
  }

  carregarResumo(): void {
    this.http.get<any>(`${this.apiUrl}/resumo`).subscribe(data => {
      this.totalPlanosAcao = data.total || 0;
      this.concluidos = data.concluidos || 0;
      this.emAndamento = data.emAndamento || 0;
      this.atrasados = data.atrasados || 0;
    });
  }

  carregarPlanosPorIndicador(): void {
    this.http.get<{ [key: string]: any[] }>(`${this.apiUrl}/indicadores`).subscribe(data => {
      this.planosPorIndicador = data;
      this.indicadores = Object.keys(data); // Popula os indicadores
    });
  }
}
