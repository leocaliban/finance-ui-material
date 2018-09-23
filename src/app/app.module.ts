import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MatPaginatorIntl } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { getPtPaginator } from './ptPaginator';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpModule
  ],
  providers: [
    LancamentoService,
    { provide: MatPaginatorIntl, useValue: getPtPaginator() }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
