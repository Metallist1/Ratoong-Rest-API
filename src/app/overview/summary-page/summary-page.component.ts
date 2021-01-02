import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {Country} from '../../shared/states/summary/entities/country';
import {Resort} from '../../shared/states/resorts/entities/resort';
import {AdminAuthState} from '../../shared/states/admin-auth/admin-auth.state';
import {AdminsUsers} from '../../shared/states/admin-auth/entities/AdminUser';
import {takeUntil} from 'rxjs/operators';
import {Question} from '../../shared/states/summary/entities/question';
import {SummaryState} from '../../shared/states/summary/summary.state';
import {GetAllLocations, GetFilteredResortData} from '../../shared/states/summary/summary.action';

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
  totalRatings = 0;
  totalAverage = '0';

  private ngUnsubscribe = new Subject();

  @Select(AdminAuthState.getAdminAuth) user: Observable<AdminsUsers>;
  @Select(SummaryState.summaryLocationList) summarList: Observable<Resort[]>;
  @Select(SummaryState.countryList) listOfCountries: Observable<Country[]>;

  @Select(SummaryState.getStatistics) statistics: Observable<object>;
  @Select(SummaryState.questionList) questions: Observable<Question[]>;
  questionList: Question[];

  allStats: object;
  locationSummaryList: Resort[];

  constructor(private store: Store,
              private actions$: Actions) {

    this.actions$.pipe(ofActionSuccessful(GetAllLocations),
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

    this.questions.subscribe( (data) => {
      this.questionList = data;
    });

    this.summarList.subscribe(
      (data) => {
        this.locationSummaryList = data;
      });

    this.statistics.subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.allStats = data;

          const splicedData = this.questionList.slice();
          splicedData.shift();
          let totalScore = 0;
          let totalCount = 0;
          splicedData.map((item) => {

          // @ts-ignore
          for (let i = 0; i < data.ratingData.length; i++) {
            // @ts-ignore
            if (Number(data.ratingData[i][0]) === Number(item.id)) {
              // @ts-ignore
              totalCount = totalCount + Number(data.ratingData[i][1].totalCount);
              // @ts-ignore
              totalScore = totalScore + Number(data.ratingData[i][1].totalScore);
            }
          }
          this.totalRatings = totalCount;
          if (totalCount !== 0 && totalScore !== 0) {
            this.totalAverage = (Math.round((totalScore / totalCount) * 100) / 100).toFixed(2);
          }
          });
        }
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
