import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/domain/lancamento';
import { LancamentoService } from '../lancamento.service';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
  }

  salvar(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
      .then(() => {
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'O Lançamento foi salvo.',
          showClose: true,
          timeout: 4000
        });
        form.reset();

        this.lancamento = new Lancamento();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).then(response => {
      this.lancamento = response;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodos()
      .then(response => {
        this.categorias = response.map(elemento => {
          return { label: elemento.nome, value: elemento.codigo };
        });
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.pesquisarTodos()
      .then(response => {
        this.pessoas = response.map(elemento => {
          return { label: elemento.nome, value: elemento.codigo };
        });
      }).catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }
}
