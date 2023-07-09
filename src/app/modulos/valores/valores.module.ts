import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValoresRoutingModule } from './valores-routing.module';
import { ValoresFormComponent } from './valores-form/valores-form.component';
import { ValoresListComponent } from './valores-list/valores-list.component';


@NgModule({
  declarations: [
    ValoresFormComponent,
    ValoresListComponent
  ],
  imports: [
    CommonModule,
    ValoresRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ValoresModule { }
