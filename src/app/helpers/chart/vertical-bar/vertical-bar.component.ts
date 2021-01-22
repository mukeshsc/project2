import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent implements OnInit {
  @Input() data:string;

  // bar
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];
  public barChartColors: Color[] = []
  public barChartType: ChartType = 'horizontalBar';
  constructor() { }

  ngOnInit(): void {
    let graphData = JSON.parse(this.data)
    this.barChartData = [{data:[graphData.percentage[0]], label:graphData.label[0]},{data:[graphData.percentage[1]], label:graphData.label[1]},{data:[graphData.percentage[2]], label:graphData.label[2]}];
    console.log(this.barChartData)
    this.barChartColors =  [{ // all colors in order
      backgroundColor: graphData.colors
    }];

  }

}
