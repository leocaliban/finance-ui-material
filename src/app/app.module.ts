import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatPaginatorIntl } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { getPtPaginator } from './ptPaginator';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CompartilhadoModule } from './compartilhado/compartilhado.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CompartilhadoModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
