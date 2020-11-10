import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FooterComponent} from './navigations/footer/footer.component';
import {NavbarComponent} from './navigations/navbar/navbar.component';


@NgModule({
  declarations: [DashboardComponent, FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
