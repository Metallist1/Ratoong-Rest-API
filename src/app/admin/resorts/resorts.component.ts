
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {Observable, Subject} from 'rxjs';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {GetResortDetails, GetResorts, SetFilter, SortResorts} from '../../shared/states/resorts/resorts.action';
import {Resort} from '../../shared/states/resorts/entities/resort';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.scss']
})


export class ResortsComponent implements OnInit, OnDestroy {

  isLoading = true;
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

  refreshResorts(): void {
    this.resortsPage = this.resorts.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetResorts());
  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateFilter(str): void {
    this.isLoading = true;
    this.store.dispatch(new SetFilter(str));
  }
  onSort(str): void {
    this.store.dispatch(new SortResorts(str));
  }
  selectResort(id): void{
    this.store.dispatch(new GetResortDetails(id));
  }
}
