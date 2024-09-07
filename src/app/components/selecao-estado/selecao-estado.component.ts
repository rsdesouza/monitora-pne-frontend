import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecao-estado',
  templateUrl: './selecao-estado.component.html',
  styleUrls: ['./selecao-estado.component.scss']
})
export class SelecaoEstadoComponent implements OnInit {

  estados = [
    { name: 'Brasil' },
    { name: 'Pernambuco' },
    { name: 'Paraíba' },
    { name: 'Amazonas' },
    // Adicione mais estados conforme necessário
  ];

  filteredEstados: any[] = [];
  searchTerm: string = '';
  selectedEstado: any;

  ngOnInit(): void {
    this.filteredEstados = this.estados;
  }

  // Função para filtrar estados com base na entrada do usuário
  filterEstados(): void {
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredEstados = this.estados.filter(estado =>
        estado.name.toLowerCase().includes(searchLower)
      );
    } else {
      this.filteredEstados = this.estados;
    }
  }

  // Função para selecionar um estado
  selectEstado(estado: any): void {
    this.selectedEstado = estado;
  }
}
