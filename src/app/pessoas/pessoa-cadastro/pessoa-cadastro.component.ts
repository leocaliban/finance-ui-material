import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../core/domain/pessoa';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ToastyService } from 'ng2-toasty';

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
    private toastyService: ToastyService) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'A pessoa foi salva.',
          showClose: true,
          timeout: 4000
        });
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
