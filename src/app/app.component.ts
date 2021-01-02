import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetAllCountries, GetQuestions} from './shared/states/summary/summary.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ratoong';
  constructor(private store: Store) {
    this.store.dispatch(new GetAllCountries());
    this.store.dispatch(new GetQuestions());
  }

  ngOnInit(): any{
  }

  ngOnDestroy(): any {
  }

}
