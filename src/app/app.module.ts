import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {StatisticsFilter} from './shared/states/resorts/helpers/statistics';

import { environment } from '../environments/environment';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ModalService} from './shared/services';
import {SharedModule} from './shared/modules/shared.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {ResortsState} from './shared/states/resorts/resorts.state';
import {UsersState} from './shared/states/users/users.state';
import * as firebase from 'firebase';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {AdminAuthState} from './shared/states/admin-auth/admin-auth.state';
import {NotfoundComponent} from './notfound/notfound.component';
import { SizeDetectorComponent } from './shared/ui/size-detector/size-detector.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    NotfoundComponent,
    SizeDetectorComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, ReactiveFormsModule, AngularFireAuthModule,

    NgxsModule.forRoot([ResortsState, UsersState, AdminAuthState], {

      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['AdminAuth']
    }),
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule, // App routing needs to last for 404 detection
  ],
  providers: [
    ModalService,
    StatisticsFilter
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
