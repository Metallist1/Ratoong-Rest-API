import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ResortsComponent } from './resorts/resorts.component';
import {FooterComponent} from './navigations/footer/footer.component';
import {NavbarComponent} from './navigations/navbar/navbar.component';
import {SharedModule} from '../shared/modules/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [ResortsComponent, FooterComponent, NavbarComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbModule
  ],
})
export class AdminModule { }
