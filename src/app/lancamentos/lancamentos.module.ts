import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatTabsModule, MatGridListModule, MatInputModule, MatButtonModule,
  MatTableModule, MatIconModule, MatPaginatorModule, MatTooltipModule,
  MatListModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, MatSelectModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { RouterModule } from '@angular/router';
import { LancamentosRoutingModule } from './lancamento-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
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
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    LancamentosRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: []
})
export class LancamentosModule { }
