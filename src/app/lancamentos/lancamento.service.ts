import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import * as moment from 'moment';
import { Lancamento } from '../core/domain/lancamento';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json());
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const parametros = new URLSearchParams();
    const headers = new Headers();

    this.adicionarAuthorization(headers);

    if (filtro.descricao) { // Se vier alguma informação no filtro
      parametros.set('descricao', filtro.descricao); // Adicine a informação do filtro no valor
    }

    if (filtro.dataVencimentoInicio) {
      parametros.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      parametros.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
      { headers, search: parametros })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {

    const headers = new Headers();

    this.adicionarAuthorization(headers);

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionarAuthorization(headers: Headers) {
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM5NDQzNDAwLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJhYjBkODMxZS01MWQ0LTQ1ZTktODEzNy04MzA0MGIzMzAxNjgiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.ZamzIJp1XRX_U_YZ_jQIvooRFk_6qedYoITKCREyJiY');
  }
}
