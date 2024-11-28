import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  progresso: number = 0;
  diasFaltantes: number = 0;
  totalEstrategias: number = 0;
  estrategiasDescontinuadas: number = 0;
  estrategiasConcluidas: number = 0;
  estrategiasNaoConcluidas: number = 0;
  planosConcluidos: number = 0;
  planosEmAndamento: number = 0;
  planosDescontinuados: number = 0;

  private readonly apiUrl = 'https://monitora-pne-backend-386059856247.us-central1.run.app/api/dashboard';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.http.get<any>(this.apiUrl).subscribe(data => {
      this.progresso = data.progresso;
      this.diasFaltantes = data.diasFaltantes;
      this.totalEstrategias = data.totalEstrategias;
      this.estrategiasDescontinuadas = data.estrategiasDescontinuadas;
      this.estrategiasConcluidas = data.estrategiasConcluidas;
      this.estrategiasNaoConcluidas = data.estrategiasNaoConcluidas;
      this.planosConcluidos = data.planosConcluidos;
      this.planosEmAndamento = data.planosEmAndamento;
      this.planosDescontinuados = data.planosDescontinuados;
    });
  }
}
