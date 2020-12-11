import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-summary-preferences',
  templateUrl: './summary-preferences.component.html',
  styleUrls: ['./summary-preferences.component.scss']
})
export class SummaryPreferencesComponent implements OnInit {

  public radarChartOptions: RadialChartOptions = {
    responsive: true,

  };
  public holidayTypeLabels: Label[] = ['SKI SCHOOL', 'OFFPISTE', 'PARTY', 'RELAXATION', 'SPA', 'SHOPPING', 'OTHER'];

  public holidayTypeData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'SKI HOLIDAY FOCUS' }
  ];

  public radarChartType: ChartType = 'radar';

  @Input() preferences: Array<object>;
  ngOnInit(): void {
    // @ts-ignore
    for (let i = 0; i <  this.preferences.type.length; i++) {
      // @ts-ignore
      switch (this.preferences.type[i][0]) {
        case 'school': {
          // @ts-ignore
          this.holidayTypeData.data[0] =  this.preferences.type[i][1];
          break;
        }
        case 'offpiste': {
          // @ts-ignore
          this.holidayTypeData.data[1] =  this.preferences.type[i][1];
          break;
        }
        case 'party': {
          // @ts-ignore
          this.holidayTypeData.data[2] =  this.preferences.type[i][1];
          break;
        }
        case 'relax': {
          // @ts-ignore
          this.holidayTypeData.data[3] =  this.preferences.type[i][1];
          break;
        }
        case 'spa': {
          // @ts-ignore
          this.holidayTypeData.data[4] =  this.preferences.type[i][1];
          break;
        }
        case 'shopping': {
          // @ts-ignore
          this.holidayTypeData.data[5] =  this.preferences.type[i][1];
          break;
        }
        case 'default': {
          // @ts-ignore
          this.holidayTypeData.data[6] =  this.preferences.type[i][1];
          break;
        }
      }
    }
  }

}
