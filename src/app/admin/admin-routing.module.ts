import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResortsComponent} from './resorts/resorts.component';

const routes: Routes = [
  {path: '', redirectTo: 'resorts'},
  {path: 'resorts', component: ResortsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
