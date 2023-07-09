import { CardapioFormComponent } from './cardapio-form/cardapio-form.component';
import { CardapioListComponent } from './cardapio-list/cardapio-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CardapioListComponent },
  { path: 'editar/:id', component: CardapioFormComponent },
  { path: 'new', component: CardapioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }
