import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  estrategias: any[] = [];
  planosAcao: any[] = [];
  estrategiasPaginadas: any[] = [];
  planosPaginados: any[] = [];
  paginas: number[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 5;

  private readonly estrategiasUrl = 'https://monitora-pne-backend-386059856247.us-central1.run.app/api/estrategias';
  private readonly planosUrl = 'https://monitora-pne-backend-386059856247.us-central1.run.app/api/planos';

  abaAtual: 'estrategias' | 'planos' = 'estrategias'; // Controle da aba atual

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarEstrategias();
  }

  // Funções de Estratégias
  carregarEstrategias() {
    this.http.get(this.estrategiasUrl).subscribe(data => {
      this.estrategias = data as any[];
      this.atualizarPaginacao();
      this.cdr.detectChanges(); // Força a renderização
    });
  }

  // Funções de Planos de Ação
  carregarPlanosAcao() {
    this.http.get(this.planosUrl).subscribe(data => {
      this.planosAcao = data as any[];
      this.atualizarPaginacao();
      this.cdr.detectChanges();
    });
  }

  atualizarPaginacao() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    if (this.abaAtual === 'estrategias') {
      this.estrategiasPaginadas = this.estrategias.slice(inicio, fim);
    } else {
      this.planosPaginados = this.planosAcao.slice(inicio, fim);
    }

    const totalItens =
      this.abaAtual === 'estrategias'
        ? this.estrategias.length
        : this.planosAcao.length;

    const totalPaginas = Math.ceil(totalItens / this.itensPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  mudarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarPaginacao();
  }

  alternarAba(aba: 'estrategias' | 'planos') {
    this.abaAtual = aba;
    this.paginaAtual = 1; // Reinicia a paginação ao alternar de aba
    if (aba === 'estrategias') {
      this.carregarEstrategias();
    } else {
      this.carregarPlanosAcao();
    }
  }

  adicionar() {
    // Lógica para adicionar
  }

  editar(item: any) {
    // Lógica para editar
  }

  excluir(id: number) {
    const url =
      this.abaAtual === 'estrategias'
        ? `${this.estrategiasUrl}/${id}`
        : `${this.planosUrl}/${id}`;
    this.http.delete(url).subscribe(
      () => {
        if (this.abaAtual === 'estrategias') {
          this.carregarEstrategias();
        } else {
          this.carregarPlanosAcao();
        }
      },
      error => {
        console.error(`Erro ao excluir o ${this.abaAtual}:`, error);
      }
    );
  }
}
