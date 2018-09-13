import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  colunas: string[] = ['tipo', 'pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'operacoes'];
  pageSize = 5;

  pageEvent: PageEvent;

  lancamentos = new MatTableDataSource<Lancamento>(LANCAMENTO_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.lancamentos.paginator = this.paginator;
  }
  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
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
export interface Lancamento {
  tipo: string;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  pessoa: string;
}

const LANCAMENTO_DATA: Lancamento[] = [
  {
    tipo: 'DESPESA',
    descricao: 'Compra de pão',
    dataVencimento: new Date(2017, 6, 30),
    dataPagamento: null,
    valor: 4.55,
    pessoa: 'Padaria Pão Novo'
  },
  {
    tipo: 'RECEITA',
    descricao: 'Aluguel',
    dataVencimento: new Date(2018, 3, 11),
    dataPagamento: new Date(2018, 3, 11),
    valor: 220.00,
    pessoa: 'Jack Bauer'
  },
  {
    tipo: 'DESPESA',
    descricao: 'Conta de Água',
    dataVencimento: new Date(2018, 5, 11),
    dataPagamento: null,
    valor: 100.00,
    pessoa: 'James Lancer'
  },
  {
    tipo: 'RECEITA',
    descricao: 'Salário',
    dataVencimento: new Date(2018, 9, 11),
    dataPagamento: new Date(2018, 6, 19),
    valor: 990.00,
    pessoa: 'Rafael Lima'
  },
  {
    tipo: 'DESPESA',
    descricao: 'Cervejas',
    dataVencimento: new Date(2018, 5, 4),
    dataPagamento: new Date(2018, 5, 4),
    valor: 90000.00,
    pessoa: 'Zeca'
  }
];

