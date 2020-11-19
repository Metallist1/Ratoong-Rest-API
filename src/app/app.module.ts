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


import { environment } from '../environments/environment';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ModalService} from './shared/services';
import {SharedModule} from './shared/modules/shared.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AmbassadorsState} from './shared/states/ambassadors/ambassadors.state';
import {ResortState} from './shared/states/resorts/resort.state';
import * as firebase from 'firebase';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
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
    NgxsModule.forRoot([ AmbassadorsState, ResortState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth']
    }),
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule, // App routing needs to last for 404 detection
  ],
  providers: [
    ModalService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
