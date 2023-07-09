import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioPainelComponent } from './usuario-painel/usuario-painel.component';

const routes: Routes = [
  { path: 'area/:id', component: UsuarioPainelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
