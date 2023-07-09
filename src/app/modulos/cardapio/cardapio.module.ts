import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardapioRoutingModule } from './cardapio-routing.module';
import { CardapioFormComponent } from './cardapio-form/cardapio-form.component';
import { CardapioListComponent } from './cardapio-list/cardapio-list.component';


@NgModule({
  declarations: [
    CardapioFormComponent,
    CardapioListComponent
  ],
  imports: [
    CommonModule,
    CardapioRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class CardapioModule { }
