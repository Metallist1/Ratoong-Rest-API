
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GuardService} from './shared/states/admin-auth/_guard/_adminGuard';

import {NotfoundComponent} from './notfound/notfound.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    canActivateChild: [GuardService],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  /*{
    path: 'user-profile',
    canActivate: [GuardService],
    loadChildren: () => import('../app/account/account.module').then(m => m.AccountModule),
    component: ProfileComponent
  },*/
  {
    path: 'web',
    canActivateChild: [GuardService],
    loadChildren: () => import('./web/web.module').then(m => m.RestModule),
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
