import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioPainelComponent } from './usuario-painel/usuario-painel.component';


@NgModule({
  declarations: [
    UsuarioPainelComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
