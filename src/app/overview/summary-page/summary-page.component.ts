import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Actions, ofActionCompleted, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {Country} from '../../shared/states/resorts/entities/country';
import {Resort} from '../../shared/states/resorts/entities/resort';
import {GetAllLocations, GetFilteredResortData} from '../../shared/states/resorts/resorts.action';
import {AdminAuthState} from '../../shared/states/admin-auth/admin-auth.state';
import {AdminsUsers} from '../../shared/states/admin-auth/entities/AdminUser';
import {LoginAdmin} from '../../shared/states/admin-auth/admin-auth.action';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  genderSelect = 'None';
  countrySelect = 'None';
  ageSelect = 'None';
  selectedResort = 'default';
  isLoading = false;
  startDate = null;
  endDate = null;


  private ngUnsubscribe = new Subject();

  @Select(AdminAuthState.getAdminAuth) user: Observable<AdminsUsers>;
  @Select(ResortsState.summaryLocationList) summarList: Observable<Resort[]>;
  @Select(ResortsState.countryList) listOfCountries: Observable<Country[]>;

  @Select(ResortsState.getStatistics) statistics: Observable<object>;
  allStats: object;
  locationSummaryList: Resort[];

  constructor(private store: Store,
              private actions$: Actions) {

    this.actions$.pipe(ofActionCompleted(GetAllLocations),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

    this.actions$.pipe(ofActionSuccessful(GetFilteredResortData),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

    this.user.subscribe((data) => {
      this.isLoading = true;
      this.store.dispatch(new GetAllLocations(data.resortID));
    });
  }

  ngOnInit(): void {
    this.summarList.subscribe(
      (data) => {
        this.locationSummaryList = data;
      });
    this.statistics.subscribe(
      (data) => {
        console.log(data);
        this.allStats = data;
      });
  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  modifyStartDate(newDate: NgbDate): any {
    if (newDate != null){
      this.startDate = newDate.year + '-' +  newDate.month + '-' + newDate.day;
    }
  }

  modifyEndDate(newDate: NgbDate): any {
    if (newDate != null){
      this.endDate = newDate.year + '-' +  newDate.month + '-' + newDate.day;
    }
  }

  getInfo(): any{
    this.isLoading = true;
    this.store.dispatch(new GetFilteredResortData(this.selectedResort, this.countrySelect, this.ageSelect, this.genderSelect,
      this.startDate, this.endDate));
  }
}
