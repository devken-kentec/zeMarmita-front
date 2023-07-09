import { ValoresFormComponent } from './valores-form/valores-form.component';
import { ValoresListComponent } from './valores-list/valores-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ValoresListComponent },
  { path: 'editar/:id', component: ValoresFormComponent },
  { path: 'new', component: ValoresFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValoresRoutingModule { }
