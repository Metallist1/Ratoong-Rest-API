import { Component, OnInit } from '@angular/core';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {GetResorts, SetFilter} from '../../shared/states/resorts/resorts.action';
import {Resort} from '../../shared/states/resorts/entities/resort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.scss']
})

export class ResortsComponent implements OnInit {
  @Select(ResortsState.resortList) currentResorts: Observable<Resort[]>;
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
        this.refreshResorts();
    });
  }

  refreshResorts(): void {
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
