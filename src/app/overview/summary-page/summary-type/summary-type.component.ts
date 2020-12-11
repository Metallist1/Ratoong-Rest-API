import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-summary-type',
  templateUrl: './summary-type.component.html',
  styleUrls: ['./summary-type.component.scss']
})
export class SummaryTypeComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'TYPE OF SKIER',
      display: true
    }
  };
  public barChartLabels: Label[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65], label: 'Beginner' },
    { data: [28], label: 'Intermediate' },
    { data: [29], label: 'Advanced' },
    { data: [45], label: 'Expert' }
  ];

  @Input() types: Array<object>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
