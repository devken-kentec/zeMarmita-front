import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItemListComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ItemModule { }
