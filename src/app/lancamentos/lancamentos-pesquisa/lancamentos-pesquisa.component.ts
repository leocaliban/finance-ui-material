import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  colunas: string[] = ['tipo', 'pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'operacoes'];
  pageSize = 5;

  lancamentos = new MatTableDataSource();
  descricao: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
    this.lancamentos.paginator = this.paginator;
  }

  pesquisar() {
    this.lancamentoService.pesquisar({ descricao: this.descricao })
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
