import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { PessoaFiltro } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

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
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
    this.pesquisar();
    this.pessoas.paginator = this.paginator;
  }

  pesquisar() {
    this.pessoaService.pesquisarPorNome(this.filtro)
      .then(response => this.pessoas.data = response)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.pesquisar();
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'Pessoa excluída.',
          showClose: true,
          timeout: 4000
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toastyService.success({
          title: 'Sucesso!',
          msg: `Pessoa ${acao} com sucesso!`,
          showClose: true,
          timeout: 4000
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(pessoa: any) {
    Swal({
      title: 'Confirmação',
      text: 'Tem certeza que deseja excluir?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.excluir(pessoa);
      }
    });
  }
}
