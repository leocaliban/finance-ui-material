import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class LancamentosPesquisaComponent implements OnInit {

  colunas: string[] = ['tipo', 'pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'operacoes'];
  pageSize = 5;

  lancamentos = new MatTableDataSource();
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
    this.lancamentos.paginator = this.paginator;
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };
    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => this.lancamentos.data = lancamentos);
  }

  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
  }

  getTamanhoTabela(event: PageEvent) {

    if (event.pageSize === 5) {
      this.pageSize = 5;
    } else if (event.pageSize === 10) {
      const paginas: number = event.length / 10;
      if (event.length % 10 <= 5 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 5;
      } else {
        this.pageSize = 8;
      }
    } else if (event.pageSize === 20) {
      const paginas: number = event.length / 20;
      if (event.length % 20 <= 5 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 5;
      } else if (event.length % 20 > 5 && event.length % 20 <= 10 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 8;
      } else if (event.length % 20 > 10 && event.length % 20 <= 15 && event.pageIndex === Math.trunc(paginas)) {
        this.pageSize = 11;
      } else {
        this.pageSize = 14;
      }
    }
  }
}
