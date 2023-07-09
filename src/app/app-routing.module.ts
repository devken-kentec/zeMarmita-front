import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: ()=> import('./modulos/home/home.module').then(h => h.HomeModule) },
  { path: 'item', loadChildren: ()=> import('./modulos/item/item.module').then(i => i.ItemModule) },
  { path: 'cardapio', loadChildren: ()=> import('./modulos/cardapio/cardapio.module').then(c => c.CardapioModule) },
  { path: 'item-cardapio', loadChildren: ()=> import('./modulos/item-cardapio/item-cardapio.module').then(ic => ic.ItemCardapioModule) },
  { path: 'usuario', loadChildren: ()=> import('./modulos/usuario/usuario.module').then(u => u.UsuarioModule) },
  { path: 'valores', loadChildren: ()=> import('./modulos/valores/valores.module').then(v => v.ValoresModule) },
  { path: 'montagem', loadChildren: ()=> import('./modulos/montagem/montagem.module').then(m => m.MontagemModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
