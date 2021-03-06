import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';

const rotas: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(rotas)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule {}
