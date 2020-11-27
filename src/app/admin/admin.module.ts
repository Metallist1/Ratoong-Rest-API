import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResortsComponent } from './resorts/resorts.component';
import {FooterComponent} from './navigations/footer/footer.component';
import {NavbarComponent} from './navigations/navbar/navbar.component';
import {SharedModule} from '../shared/modules/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { UsersComponent } from './users/users.component';


import { HttpClientModule } from '@angular/common/http';

import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {NgbAlertModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AdminRoutes} from './admin-routing.module';

@NgModule({

  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    AdminRoutes,
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
  declarations: [ResortsComponent, UsersComponent, FooterComponent, NavbarComponent]
})
export class AdminModule { }
