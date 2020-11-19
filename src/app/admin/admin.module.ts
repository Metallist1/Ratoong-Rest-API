import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FooterComponent} from './navigations/footer/footer.component';
import {NavbarComponent} from './navigations/navbar/navbar.component';
import {SharedModule} from '../shared/modules/shared.module';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [DashboardComponent, FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbModule
  ],
})
export class AdminModule { }
