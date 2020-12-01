
import {ResortsComponent} from './resorts/resorts.component';
import {UsersComponent} from './users/users.component';

export class AdminRoutingModule { }
import { RouterModule } from '@angular/router';
const routes = [
  {
    path: '',
    redirectTo: 'resorts'
  },
  {
    path: 'resorts',
    component: ResortsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
