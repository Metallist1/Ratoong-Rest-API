import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetAllCountries, GetAllLocations} from './shared/states/resorts/resorts.action';
import {Store} from '@ngxs/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ratoong';
  constructor(private store: Store) {
    this.store.dispatch(new GetAllCountries());
    this.store.dispatch(new GetAllLocations());
  }

  ngOnInit(): any{
  }

  ngOnDestroy(): any {
  }


}
