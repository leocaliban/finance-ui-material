import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  colunas: string[] = ['nome', 'cidade', 'estado', 'ativo', 'operacoes'];
  pageSize = 5;

  pageEvent: PageEvent;

  pessoas = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pesquisar();
    this.pessoas.paginator = this.paginator;
  }

  pesquisar() {
    this.pessoaService.pesquisarPorNome(this.filtro)
      .then(response => this.pessoas.data = response);
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
        this.pageSize = 10;
      } else {
        this.pageSize = 14;
      }
    }
  }
}
