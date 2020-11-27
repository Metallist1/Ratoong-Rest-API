
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {Observable, Subject} from 'rxjs';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {GetResorts, SetFilter} from '../../shared/states/resorts/resorts.action';
import {Resort} from '../../shared/states/resorts/entities/resort';
import {Logout} from '../../shared/states/admin-auth/admin-auth.action';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.scss']
})


export class ResortsComponent implements OnInit, OnDestroy {

  isLoading = false;
  private ngUnsubscribe = new Subject();

  @Select(ResortsState.resortList) currentResorts: Observable<Resort[]>;
  resorts = [];
  resortsPage = [];

  page = 1;
  pageSize = 4;


  constructor(private store: Store,
              private actions$: Actions) {

    this.actions$.pipe(ofActionSuccessful(GetResorts),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

    this.actions$.pipe(ofActionSuccessful(SetFilter),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

    this.currentResorts.subscribe(data => {
        this.resorts = [];
        data.forEach((value) => {
          this.resorts.push(value);
        });
        this.refreshResorts();
    });
  }


  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  refreshResorts(): void {
    this.resortsPage = this.resorts
      .map((resort, i) => ({id: i + 1, ...resort}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  ngOnInit(): void {

    this.isLoading = true;

    this.store.dispatch(new GetResorts());
  }

  updateFilter(str): void {
    this.isLoading = true;
    
    this.store.dispatch(new SetFilter(str));
  }
}
