import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemCardapioRoutingModule } from './item-cardapio-routing.module';
import { ItemCardapioFormComponent } from './item-cardapio-form/item-cardapio-form.component';


@NgModule({
  declarations: [
    ItemCardapioFormComponent
  ],
  imports: [
    CommonModule,
    ItemCardapioRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ItemCardapioModule { }
