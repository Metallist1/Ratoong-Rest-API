import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-summary-type',
  templateUrl: './summary-type.component.html',
  styleUrls: ['./summary-type.component.scss']
})
export class SummaryTypeComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Skier', 'Snowboarder', 'Not Specified'];
  public pieChartData: SingleDataSet = [50, 60, 200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  @Input() types: Array<object>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
