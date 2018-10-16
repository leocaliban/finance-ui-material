import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatTabsModule, MatGridListModule, MatInputModule, MatButtonModule,
  MatTableModule, MatIconModule, MatPaginatorModule, MatTooltipModule, MatListModule
} from '@angular/material';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { RouterModule } from '@angular/router';
import { PessoaRoutingModule } from './pessoa-routing.module.ts';

@NgModule({
  imports: [
    CommonModule,
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
    CurrencyMaskModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PessoaRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: []
})
export class PessoasModule { }
