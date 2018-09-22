import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatListModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    FormsModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class CompartilhadoModule { }
