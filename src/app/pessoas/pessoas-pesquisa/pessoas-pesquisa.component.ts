import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { PessoaFiltro } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';

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

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.pesquisar();
    this.pessoas.paginator = this.paginator;
  }

  pesquisar() {
    this.pessoaService.pesquisarPorNome(this.filtro)
      .then(response => this.pessoas.data = response);
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.pesquisar();
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'Pessoa escluída.',
          showClose: true,
          timeout: 4000
        });
      });
  }
}
