import {Component, Input, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {AdminAuthState} from '../../shared/states/admin-auth/admin-auth.state';
import {Observable} from 'rxjs';
import {AdminsUsers} from '../../shared/states/admin-auth/entities/AdminUser';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {SummaryLocation} from '../../shared/states/resorts/entities/summaryLocation';
import {GenerateAPIKey} from '../../shared/states/admin-auth/admin-auth.action';
import {first} from 'rxjs/operators';
import {GetAllLocations} from '../../shared/states/resorts/resorts.action';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {
  constructor(private store: Store) {
    this.store.dispatch(new GetAllLocations())
      .pipe(first())
      .subscribe(
        data => {

        },
        error => {
          this.isLoading = false;
        });
  }

  isLoading = false;
  startDate = null;
  endDate = null;
  selectedResort = null;

  @Select(ResortsState.summaryLocationList) summarList: Observable<SummaryLocation[]>;
  locationSummaryList: SummaryLocation[];

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
    this.startDate = newDate;
  }

  modifyEndDate(newDate: NgbDate): any {
    this.endDate = newDate;
  }

}
