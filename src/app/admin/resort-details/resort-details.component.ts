import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {ResortsState} from '../../shared/states/resorts/resorts.state';


@Component({
  selector: 'app-resort-details',
  templateUrl: './resort-details.component.html',
  styleUrls: ['./resort-details.component.scss']
})
export class ResortDetailsComponent implements OnInit {

  @Select(ResortsState.selectedResort) selectedResort: any;

  resort: any;

  constructor() {
    this.selectedResort.subscribe(data => {
      this.resort = data;
      console.log(this.resort);
    });
  }

  ngOnInit(): void {
  }

}
