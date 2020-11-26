import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResortsComponent} from './resorts/resorts.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {path: '', redirectTo: 'resorts'},
  {path: 'resorts', component: ResortsComponent},
  {path: 'users', component: UsersComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
