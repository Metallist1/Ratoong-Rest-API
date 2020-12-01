import { RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ApiDocumentationComponent} from './api-documentation/api-documentation.component';
import {SummaryPageComponent} from './summary-page/summary-page.component';
import {CompanyProfileComponent} from './company-profile/company-profile.component';
const routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'api',
    component: ApiDocumentationComponent
  },
  {
    path: 'summary',
    component: SummaryPageComponent
  },
  {
    path: 'user-profile',
    component: CompanyProfileComponent
  }
];

export const RestRoutes = RouterModule.forChild(routes);
