import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MatPaginatorIntl } from '@angular/material/paginator';
import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';
import { getPtPaginator } from './ptPaginator';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpModule,
    ToastyModule.forRoot()
  ],
  providers: [
    LancamentoService,
    PessoaService,
    { provide: MatPaginatorIntl, useValue: getPtPaginator() },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
