import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { SharedModule } from '../shared/modules/shared.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import {NgbAlertModule, NgbDatepickerModule, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RestRoutes } from './overview-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navigations/navbar/navbar.component';
import { FooterComponent } from './navigations/footer/footer.component';

import { SummaryPageComponent } from './summary-page/summary-page.component';
import { ApiDocumentationComponent } from './api-documentation/api-documentation.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SummaryCalendarComponent } from './summary-page/summary-calendar/summary-calendar.component';
import { SummaryGenderComponent } from './summary-page/summary-gender/summary-gender.component';
import { SummaryPreferencesComponent } from './summary-page/summary-preferences/summary-preferences.component';
import { SummaryTypeComponent } from './summary-page/summary-type/summary-type.component';
import { SummaryRatingTableComponent } from './summary-page/summary-rating-table/summary-rating-table.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    HttpClientModule,
    RestRoutes,
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    SharedModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbModule,
    ChartsModule
  ],
  providers: [],
  exports: [],
  declarations: [
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SummaryPageComponent,
    ApiDocumentationComponent,
    CompanyProfileComponent,
    SummaryCalendarComponent,
    SummaryGenderComponent,
    SummaryPreferencesComponent,
    SummaryTypeComponent,
    SummaryRatingTableComponent,
  ]
})
export class RestModule { }
