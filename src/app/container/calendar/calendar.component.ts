import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';



@Component({
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
