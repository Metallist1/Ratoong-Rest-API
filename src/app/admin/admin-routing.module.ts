
import {ResortsComponent} from './resorts/resorts.component';
import {UsersComponent} from './users/users.component';
import {ResortDetailsComponent} from './resort-details/resort-details.component';
import {UserDetailsComponent} from './user-details/user-details.component';

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
  },
  {
    path: 'resortDetails/:id',
    component: ResortDetailsComponent
  },
  {
    path: 'userDetails/:uID',
    component: UserDetailsComponent
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
