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
  public skillLabels: Label[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  public skillData: ChartDataSets[] = [
    { data: [28, 48, 40, 19], label: 'YOUR RIDING LEVEL' }
  ];
  public timeLabels: Label[] = ['1-3', '4-7', '8+'];

  public timeData: ChartDataSets[] = [
    { data: [65, 59, 90], label: 'HOW MANY WEEKS PER YEAR DO YOU RIDE?' }
  ];
  public radarChartType: ChartType = 'radar';

  @Input() preferences: Array<object>;

  ngOnInit(): void {
  }

}
