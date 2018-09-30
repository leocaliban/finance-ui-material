import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule, MatListModule, MatPaginatorIntl } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { getPtPaginator } from '../ptPaginator';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    { provide: MatPaginatorIntl, useValue: getPtPaginator() },
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
