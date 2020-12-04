import {Component, Input, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {SummaryLocation} from '../../shared/states/resorts/entities/summaryLocation';
import {Country} from '../../shared/states/resorts/entities/country';
import * as firebase from 'firebase';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {
  genderSelect = 'None';
  countrySelect = 'None';
  ageSelect = 'None';

  isLoading = false;
  startDate = null;
  endDate = null;
  selectedResort = null;

  @Select(ResortsState.summaryLocationList) summarList: Observable<SummaryLocation[]>;
  @Select(ResortsState.countryList) listOfCountries: Observable<Country[]>;
  locationSummaryList: SummaryLocation[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.summarList.subscribe(
      (data) => {
        this.locationSummaryList = [];
        data.forEach((value) => {
          if (value.name) {
            this.locationSummaryList.push(value);
          }
        });
      });
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
    const getFilteredData = firebase.functions().httpsCallable('getFilteredData');
    getFilteredData({ id: this.selectedResort,
      country: this.countrySelect,
      age: this.ageSelect,
      gender: this.genderSelect,
      fromDate: this.startDate,
      toDate: this.endDate})
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result.data);
      });
  }
}
