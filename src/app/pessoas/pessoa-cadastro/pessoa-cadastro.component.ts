import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../core/domain/pessoa';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toastyService: ToastyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const codigoPessoa = this.activatedRoute.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.salvar(this.pessoa)
      .then(response => {
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'A pessoa foi salva.',
          showClose: true,
          timeout: 4000
        });
        this.router.navigate(['/pessoas', response.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(response => {
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'A Pessoa foi alterada.',
          showClose: true,
          timeout: 4000
        });
        this.pessoa = response;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then(response => {
      this.pessoa = response;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  novaPessoa(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

}
