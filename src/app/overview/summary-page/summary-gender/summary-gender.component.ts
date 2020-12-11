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
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public timeOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'RIDE FREQUENCY (WEEKS/YEAR)',
      display: true
    }
  };

  public timeLabels: Label[] = ['1-3', '4-7', '8+'];

  public timeData: SingleDataSet = [1, 1, 1];

  public typeOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'TYPE OF USER',
      display: true
    }
  };

  public typeLabels: Label[] = ['Skier', 'Snowboarder'];
  public typeData: SingleDataSet = [1, 1];
  @Input() genderData: Array<object>;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
    // @ts-ignore
    for (let i = 0; i <  this.genderData.gender.length; i++) {
      // @ts-ignore
      switch (this.genderData.gender[i][0]) {
        case 'male': {
          // @ts-ignore
          this.pieChartData[1] =  this.genderData.gender[i][1];
          break;
        }
        case 'female': {
          // @ts-ignore
          this.pieChartData[0] =  this.genderData.gender[i][1];
          break;
        }
        case 'donttell': {
          // @ts-ignore
          this.pieChartData[2] =  this.genderData.gender[i][1];
          break;
        }
      }
    }
    // @ts-ignore
    for (let i = 0; i <  this.genderData.skier.length; i++) {
      // @ts-ignore
      if (this.genderData.skier[i][0]) {
        // @ts-ignore
        this.typeData[0] = this.genderData.skier[i][1];
      }
    }
    // @ts-ignore
    for (let i = 0; i <  this.genderData.snowboarder.length; i++) {
      // @ts-ignore
      if (this.genderData.snowboarder[i][0]) {
        // @ts-ignore
        this.typeData[1] = this.genderData.snowboarder[i][1];
      }
    }
    // @ts-ignore
    for (let i = 0; i <  this.genderData.travelCount.length; i++) {
      // @ts-ignore
      switch (this.genderData.travelCount[i][0]) {
        case 'rare': {
          // @ts-ignore
          this.timeData[0] =  this.genderData.travelCount[i][1];
          break;
        }
        case 'common': {
          // @ts-ignore
          this.timeData[1] =  this.genderData.travelCount[i][1];
          break;
        }
        case 'frequent': {
          // @ts-ignore
          this.timeData[2] =  this.genderData.travelCount[i][1];
          break;
        }
      }
    }
  }

}
