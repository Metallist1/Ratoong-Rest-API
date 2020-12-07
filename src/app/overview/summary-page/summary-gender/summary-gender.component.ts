import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-summary-gender',
  templateUrl: './summary-gender.component.html',
  styleUrls: ['./summary-gender.component.scss']
})
export class SummaryGenderComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Male', 'Female', 'Other', 'Not Specified'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  @Input() genderData: Array<object>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
  }

}
