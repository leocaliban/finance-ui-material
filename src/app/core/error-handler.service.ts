import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else {
      mensagem = 'Desculpe, ocorreu um erro ao processar o serviço remoto.';
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
