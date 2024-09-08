import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ];

  selectedEstado: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Função para redirecionar após a seleção de um estado
  onEstadoChange(estado: any): void {
    this.selectedEstado = estado;
    if (estado) {
      localStorage.setItem('estadoSelecionado', JSON.stringify(estado));  // Salva o estado no localStorage
      this.router.navigate(['/home']);  // Redireciona para a página Home
    }
  }
}
