import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class LancamentosPesquisaComponent implements OnInit {

  colunas: string[] = ['tipo', 'pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'operacoes'];
  pageSize = 5;

  lancamentos = new MatTableDataSource();
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.pesquisar();
    this.lancamentos.paginator = this.paginator;
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };
    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => this.lancamentos.data = lancamentos);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.pesquisar();
        this.toastyService.success({
          title: 'Sucesso!',
          msg: 'Lançamento escluído.',
          showClose: true,
          timeout: 4000
        });
      });
  }

  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
  }

  confirmarExclusao(lancamento: any) {
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
        this.excluir(lancamento);
      }
    });
  }
}
