import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let erros;
      mensagem = 'Ocorreu um erro ao processar a sua solicitação.';
      try {
        erros = errorResponse.json();
        mensagem = erros[0].mensagemUsuario;
      } catch (error) {
        console.error('Ocorreu um erro.', errorResponse);
      }
    } else {
      mensagem = 'Desculpe, ocorreu um erro ao processar o serviço remoto.';
      console.error('Ocorreu um erro.', errorResponse._body);
    }

    this.mensagemErro(mensagem);

  }

  mensagemErro(mensagem) {
    this.toastyService.error({
      title: 'Erro!',
      msg: mensagem,
      showClose: true,
      timeout: 4000
    });
  }
}
