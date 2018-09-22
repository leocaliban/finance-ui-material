import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  colunas: string[] = ['nome', 'cidade', 'estado', 'ativo', 'operacoes'];

  pageSize = 5;

  pageEvent: PageEvent;

  pessoas = new MatTableDataSource<Pessoa>(PESSOA_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.pessoas.paginator = this.paginator;
  }

  getTamanhoTabela(event: PageEvent) {

    if ( event.pageSize === 5) {
      this.pageSize = 5;
    } else if ( event.pageSize === 10) {
      const paginas: number = event.length / 10;
      if ( event.length % 10 <= 5 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 5;
      } else {
        this.pageSize = 8;
      }
    } else if ( event.pageSize === 20) {
      const paginas: number = event.length / 20;
      if ( event.length % 20 <= 5 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 5;
      } else if ( event.length % 20 > 5 && event.length % 20 <= 10 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 8;
      } else if ( event.length % 20 > 10 && event.length % 20 <= 15 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 10;
      } else {
        this.pageSize = 14;
      }
    }
  }
}

export interface Pessoa {
  nome: string;
  cidade: string;
  estado: string;
  ativo: boolean;
}

const PESSOA_DATA: Pessoa[] = [
  {
    nome: 'Andressa Pinheiro',
    cidade: 'São Paulo',
    estado: 'SP',
    ativo: true
  },
  {
    nome: 'Kelly Silva Andrade',
    cidade: 'Maturéia',
    estado: 'PB',
    ativo: true
  },
  {
    nome: 'Amanda Lins',
    cidade: 'João Pessoa',
    estado: 'PB',
    ativo: false
  },
  {
    nome: 'Fabiane Oliveira',
    cidade: 'Recife',
    estado: 'PE',
    ativo: true
  },
  {
    nome: 'Luana Torres',
    cidade: 'Natal',
    estado: 'RN',
    ativo: true
  },
  {
    nome: 'Yanne Lima',
    cidade: 'Patos',
    estado: 'PB',
    ativo: true
  }
];
