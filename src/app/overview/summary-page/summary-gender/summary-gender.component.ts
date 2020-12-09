import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-summary-gender',
  templateUrl: './summary-gender.component.html',
  styleUrls: ['./summary-gender.component.scss']
})
export class SummaryGenderComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'GENDER',
      display: true
    }
  };
  public pieChartLabels: Label[] = ['Female', 'Male', 'Other'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  public skillOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'Skill Level',
      display: true
    }
  };

  public skillLabels: Label[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  public skillData: SingleDataSet = [28, 48, 40, 19];

  public timeOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'HOW MANY WEEKS PER YEAR DO YOU RIDE?',
      display: true
    }
  };

  public timeLabels: Label[] = ['1-3', '4-7', '8+'];

  public timeData: SingleDataSet = [65, 59, 90];

  public typeOptions: ChartOptions = {
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

  public typeLabels: Label[] = ['Skier', 'Snowboarder', 'Not Specified'];
  public typeData: SingleDataSet = [50, 60, 200];

  @Input() genderData: Array<object>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
  }

}
