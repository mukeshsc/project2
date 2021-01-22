import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {
  @Input() data:string;

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartColors: Color[] = []
  public doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
    let graphData = JSON.parse(this.data)
    this.doughnutChartData = graphData.percentage;
    this.doughnutChartColors =  [{ // all colors in order
      backgroundColor: graphData.colors
    }];
    this.doughnutChartLabels = graphData.label
    // for(let item of graphData.colors){
    //   this.doughnutChartColors.push({
    //     borderColor: item,
    //     backgroundColor: item
    //   })
    // }

  }

}
