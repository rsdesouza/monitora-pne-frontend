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
  itensPorPagina: number = 15;

  itemSelecionadoId: number | null = null; // ID do item que será excluído
  itemEditando: any = {}; // Objeto para armazenar o item em edição
  mensagemSucesso: string | null = null; // Mensagem de sucesso
  mostrarModalEdicao: boolean = false; // Controle para exibir ou ocultar o modal de edição

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
    this.paginaAtual = 1;
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
    this.itemEditando = { ...item }; // Clona o item para evitar alterações no original
    if (this.abaAtual === 'estrategias') {
      this.itemEditando.nomeEstrategia = item.nomeEstrategia || '';
    } else if (this.abaAtual === 'planos') {
      this.itemEditando.planoDeAcao = item.planoDeAcao || '';
      this.itemEditando.observacao = item.observacao || '';
      this.itemEditando.dataInicio = item.dataInicio || '';
      this.itemEditando.dataFim = item.dataFim || '';
    }
    this.mostrarModalEdicao = true; // Exibe o modal
  }
  
  fecharModalEdicao() {
    this.mostrarModalEdicao = false; // Fecha o modal de edição
    this.itemEditando = {}; // Limpa o objeto de edição
  }

  confirmarEdicao() {
    const url =
      this.abaAtual === 'estrategias'
        ? `${this.estrategiasUrl}/${this.itemEditando.index}`
        : `${this.planosUrl}/${this.itemEditando.index}`;

    this.http.put(url, this.itemEditando).subscribe(
      () => {
        this.mensagemSucesso = 'Item editado com sucesso!';
        setTimeout(() => this.fecharMensagemSucesso(), 3000);
        if (this.abaAtual === 'estrategias') {
          this.carregarEstrategias();
        } else {
          this.carregarPlanosAcao();
        }
        this.fecharModalEdicao(); // Fecha o modal após salvar
      },
      error => {
        console.error('Erro ao editar item:', error);
      }
    );
  }

  excluir(id: number) {
    const url =
      this.abaAtual === 'estrategias'
        ? `${this.estrategiasUrl}/${id}`
        : `${this.planosUrl}/${id}`;

    this.http.delete(url).subscribe(
      () => {
        this.mensagemSucesso = 'Excluído com sucesso!';
        setTimeout(() => this.fecharMensagemSucesso(), 3000); // Fecha automaticamente após 3 segundos
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

  confirmarExclusao(): void {
    if (this.itemSelecionadoId !== null) {
      const url =
        this.abaAtual === 'estrategias'
          ? `${this.estrategiasUrl}/${this.itemSelecionadoId}`
          : `${this.planosUrl}/${this.itemSelecionadoId}`;
  
      this.http.delete(url).subscribe(
        () => {
          this.mensagemSucesso = 'Item excluído com sucesso!';
          setTimeout(() => this.fecharMensagemSucesso(), 3000);
          if (this.abaAtual === 'estrategias') {
            this.carregarEstrategias();
          } else {
            this.carregarPlanosAcao();
          }
          this.itemSelecionadoId = null; // Limpa o ID após a exclusão
        },
        error => {
          console.error('Erro ao excluir:', error);
        }
      );
    }
  }

  definirItemParaExcluir(id: number): void {
    this.itemSelecionadoId = id; // Define o ID do item a ser excluído
  }

  fecharMensagemSucesso(): void {
    this.mensagemSucesso = null;
  }
}
