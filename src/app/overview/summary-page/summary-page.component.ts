import {Component, OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ResortsState} from '../../shared/states/resorts/resorts.state';
import {Country} from '../../shared/states/resorts/entities/country';
import {Resort} from '../../shared/states/resorts/entities/resort';
import {GetAllLocations, GetFilteredResortData} from '../../shared/states/resorts/resorts.action';
import {AdminAuthState} from '../../shared/states/admin-auth/admin-auth.state';
import {AdminsUsers} from '../../shared/states/admin-auth/entities/AdminUser';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {
  genderSelect = 'None';
  countrySelect = 'None';
  ageSelect = 'None';
  selectedResort = 'default';
  isLoading = false;
  startDate = null;
  endDate = null;

  @Select(AdminAuthState.getAdminAuth) user: Observable<AdminsUsers>;
  @Select(ResortsState.summaryLocationList) summarList: Observable<Resort[]>;
  @Select(ResortsState.countryList) listOfCountries: Observable<Country[]>;
  locationSummaryList: Resort[];

  constructor(private store: Store) {
    this.user.subscribe((data) => {
      this.store.dispatch(new GetAllLocations(data.resortID));
    });
  }

  ngOnInit(): void {
    this.summarList.subscribe(
      (data) => {
        this.locationSummaryList = data;
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
    this.store.dispatch(new GetFilteredResortData(this.selectedResort, this.countrySelect, this.ageSelect, this.genderSelect,
      this.startDate, this.endDate));
  }
}
