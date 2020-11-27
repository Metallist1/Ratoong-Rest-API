import { RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
const routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'web',
    component: DashboardComponent
  }
];

export const RestRoutes = RouterModule.forChild(routes);
