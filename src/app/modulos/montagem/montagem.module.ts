import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MontagemRoutingModule } from './montagem-routing.module';
import { MontagemListComponent } from './montagem-list/montagem-list.component';


@NgModule({
  declarations: [
    MontagemListComponent
  ],
  imports: [
    CommonModule,
    MontagemRoutingModule
  ]
})
export class MontagemModule { }
