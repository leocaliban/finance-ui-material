import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    SegurancaRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginFormComponent]
})
export class SegurancaModule { }
