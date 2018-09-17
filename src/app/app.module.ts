import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getPtPaginator } from './ptPaginator';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatListModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, MatSelectModule } from '@angular/material';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import {NgxMaskModule} from 'ngx-mask';



@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    LancamentoCadastroComponent,
    PessoaCadastroComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatListModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot()


  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
