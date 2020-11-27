import {ResortsComponent} from './resorts/resorts.component';

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
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
