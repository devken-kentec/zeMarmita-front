import { ItemCardapioFormComponent } from './item-cardapio-form/item-cardapio-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'editar/:id', component: ItemCardapioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCardapioRoutingModule { }
