import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  colunas: string[] = ['tipo', 'pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'operacoes'];
  pageSize = 5;

  pageEvent: PageEvent;

  lancamentos = new MatTableDataSource<Lancamento>(LANCAMENTO_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  dataVencimento: string;
  dataPagamento: string;
  valor: number;
  pessoa: string;
}

const LANCAMENTO_DATA: Lancamento[] = [
  {
    tipo: 'DESPESA',
    descricao: 'Compra de pão',
    dataVencimento: '30/06/2017',
    dataPagamento: null,
    valor: 4.55,
    pessoa: 'Padaria Pão Novo',
  },
  {
    tipo: 'RECEITA',
    descricao: 'Aluguel',
    dataVencimento: '11/03/2018',
    dataPagamento: '11/03/2018',
    valor: 220.00,
    pessoa: 'Jack Bauer'
  },
  {
    tipo: 'DESPESA',
    descricao: 'Conta de Água',
    dataVencimento: '11/05/2018',
    dataPagamento: null,
    valor: 100.00,
    pessoa: 'James Lancer'
  },
  {
    tipo: 'RECEITA',
    descricao: 'Salário',
    dataVencimento: '11/09/2018',
    dataPagamento: '11/09/2018',
    valor: 990.00,
    pessoa: 'Rafael Lima'
  },
  {
    tipo: 'DESPESA',
    descricao: 'Cervejas',
    dataVencimento: '05/04/2018',
    dataPagamento: '05/04/2018',
    valor: 90.00,
    pessoa: 'Zeca'
  }
];
