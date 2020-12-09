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
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'YOUR SKI HOLIDAY FOCUS' }
  ];

  public radarChartType: ChartType = 'radar';

  @Input() preferences: Array<object>;

  ngOnInit(): void {
  }

}
