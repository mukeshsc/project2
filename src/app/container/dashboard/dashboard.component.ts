import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';


@Component({
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})


export class DashboardComponent implements OnInit {
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  public data: object [] = [{
      Id: 3,
      Subject: 'Testing',
      StartTime: new Date(2018, 1, 11, 9, 0),
      EndTime: new Date(2018, 1, 11, 10, 0),
      IsAllDay: false
      },{
      Id: 4,
      Subject: 'Vacation',
      StartTime: new Date(2018, 1, 13, 9, 0),
      EndTime: new Date(2018, 1, 13, 10, 0),
      IsAllDay: false
  }];
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  displayedColumns: string[] = ['position', 'name', 'designation', 'status'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }


}
export interface PeriodicElement {
  name: string;
  position: any;
  designation: string;
  status: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: './assets/img/Ellipse_1.png', name: 'Romika gupta', designation: 'Sr. Associate', status: 0},
  {position: './assets/img/Ellipse_1_g.png', name: 'Ryan Sandoval', designation: 'Manager Level 2', status: 1},
  {position: './assets/img/Ellipse_1_gq.png', name: 'Fatima', designation: 'Director Manager', status: 2},
  {position: './assets/img/Ellipse_1_gx.png', name: 'Romika gupta', designation: 'Sr. Associate', status: 0},
  {position: './assets/img/Ellipse_1.png', name: 'Ryan Sandoval', designation: 'Manager Level 2', status: 1},
  {position: './assets/img/Ellipse_1_g.png', name: 'Fatima', designation: 'Director Manager', status: 2},
];
