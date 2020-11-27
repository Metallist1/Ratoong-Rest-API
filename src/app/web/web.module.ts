import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { SharedModule } from '../shared/modules/shared.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {NgbAlertModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RestRoutes} from './web-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavbarComponent} from './navigations/navbar/navbar.component';

import {FooterComponent} from './navigations/footer/footer.component';

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
    NgbAlertModule
  ],
  providers: [],
  exports: [],
  declarations: [DashboardComponent, FooterComponent, NavbarComponent]

})
export class RestModule { }
