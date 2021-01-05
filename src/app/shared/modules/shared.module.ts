import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {LocationAdderComponent} from '../ui/modals/location-adder/location-adder.component';

import {PasswordModalComponent} from '../ui/modals/password-modal/password-modal.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbAlertModule,
    ],
  declarations: [
    LocationAdderComponent,
    PasswordModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocationAdderComponent,
    PasswordModalComponent
  ],
  entryComponents: [],
})
export class SharedModule {
}
