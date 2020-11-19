import { Component, OnInit } from '@angular/core';
import {ResortState} from '../../shared/states/resorts/resort.state';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {GetResorts, SetFilter} from '../../shared/states/resorts/resort.action';
import {Resort} from '../../shared/states/resorts/entities/resorts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @Select(ResortState.resortList) currentResorts: Observable<Resort[]>;
  resorts = [];
  resortsPage = [];

  page = 1;
  pageSize = 4;

  constructor(private store: Store) {
    this.currentResorts.subscribe(data => {
        this.resorts = [];
        data.forEach((value) => {
          this.resorts.push(value);
        });
        this.refreshCountries();
    });
  }

  refreshCountries(): void {
    this.resortsPage = this.resorts
      .map((resort, i) => ({id: i + 1, ...resort}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  ngOnInit(): void {
    this.store.dispatch(new GetResorts());
  }

  updateFilter(str): void {
    this.store.dispatch(new SetFilter(str));
  }
}
