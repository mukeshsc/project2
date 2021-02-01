import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ScheduleComponent, PopupOpenEventArgs, EventRenderedArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  public data: any = [];
  public minDate: Date = new Date();
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  leaveData:any = [{label:'Event',value:'event'},{label:'Holiday',value:'holiday'}];
  files: File[] = [];
  selectedEvent:any = []
  callApi:boolean;
  ageColumn:any = [{text:'All',value:'all'}];
  departmentData:any = [{text:'All',value:'all'}];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    for(let i = 0;100 > i;i++){
      this.ageColumn.push({text:i.toString(),value:i.toString()})
    }
    this.getEvent();
    this.getDepartment();
  }

// Get Department
async getDepartment(){
  this.ngxService.start();
  await(this._api.showDepartment().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
       for(let item of response.data){
        this.departmentData.push({text:item.department_Type,value:item.department_Type})
       };
    }else{
      this.openErrrorSnackBar(response.message);
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.ngxService.stop();
    this.openErrrorSnackBar(error.message);
  }));
}
//Get event
async getEvent(){
  await(this._api.getEvent().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data)
      let colors = ['#3F51B5', ' #FFAA00', '#C86CE6', '#FF4081', '#15C1DC']
      let count = 0;
      for(let item of response.data){
        count++;
        let color = '#3F51B5';
        if(item.event_Type == '1'){
          item.IsType = 'holiday'
          color = '#F44336';
        }else{
          item.IsType = 'event'
          color = colors[Math.floor(Math.random() * colors.length)]
        }
        let obj = {
          Id: count,
          Subject: item.event_Title,
          StartTime: item.event_StartDate,
          EndTime: item.event_EndDate,
          IsAllDay: item.isAllday,
          Description:item.event_Description,
          icon:item.fileName,
          EventType:item.IsType,
          targetAudience:item.target_Audeince,
          calendarEvent_id:item.calendarEvent_id,
          IsType:item.IsType,
          CategoryColor: color,
          department:item.department,
          gender:item.gender,
          ageFrom:item.ageFrom?item.ageFrom.toString():'',
          ageTo:item.ageTo?item.ageTo.toString():''
        }
        this.data.push(obj)
      }
      console.log(this.data)
        this.scheduleObj.saveEvent(this.data);
        this.callApi = false;
        this.scheduleObj.refresh();

    }else{
      this.openErrrorSnackBar(response.message);
    }
  },err => {
    const error = err.error;
    this.openErrrorSnackBar(error.message);
    this.ngxService.stop();
  }));
}

async addNew() {
  let cellData: Object = {
      startTime: new Date(),
      endTime: new Date(),
  };
  this.scheduleObj.openEditor(cellData,'Add');

}

//action begin
onActionBegin(args){
  console.log(args.requestType)
}


// add custome field on event add modal
onPopupOpen(args: PopupOpenEventArgs): void {
  this.callApi = true;
  if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
          // Custom event type field
          let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
          let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
          formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
          let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
          let inputEle: HTMLInputElement = createElement('input', {
              className: 'e-field', attrs: { name: 'EventType' }
          }) as HTMLInputElement;
          container.appendChild(inputEle);
          row.appendChild(container);
          let drowDownList: DropDownList = new DropDownList({
              dataSource:this.leaveData,
              fields: { text: 'label', value: 'value' },
              value: (args.data as { [key: string]: Object }).EventType as string,
              floatLabelType: 'Always', placeholder: 'Select Event Type'
          });
          drowDownList.appendTo(inputEle);
          inputEle.setAttribute('name', 'EventType');




        // Custom audience trigger field
          let row2: HTMLElement = createElement('div', { className: 'custom-field-row' });
          let formElement2: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
          formElement2.insertBefore(row2, formElement2.childNodes[1]);
          let container2: HTMLElement = createElement('div', { className: 'custom-field-container' });
          let h2: HTMLElement = createElement('span', { className: 'card-subtitle' });
          h2.innerText = 'Target Audience';
          let inputEle2: HTMLInputElement = createElement('input', {
            className: 'e-field', attrs: { name: 'gender' }
        }) as HTMLInputElement;
          container2.appendChild(h2);
          container2.appendChild(inputEle2);
          row2.appendChild(container2);
          let drowDownList1: DropDownList = new DropDownList({
            dataSource:[
              {
                text:'All',value:'all'
              },{
                text:'Male',value:'male'
              },{
                text:'Female',value:'female'
              }
            ],
            fields: { text: 'text', value: 'value' },
            value: (args.data as { [key: string]: Object }).EventType as string,
            floatLabelType: 'Always', placeholder: 'Gender'
        });
          drowDownList1.appendTo(inputEle2);
          inputEle2.setAttribute('name', 'gender');

        // Custom audience trigger field
        let row3: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement3: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement3.insertBefore(row3, formElement3.childNodes[2]);
        let container3: HTMLElement = createElement('div', { className: 'custom-field-container' });
        let inputEle3: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'department' }
      }) as HTMLInputElement;
        container3.appendChild(inputEle3);
        row3.appendChild(container3);
        let drowDownList2: DropDownList = new DropDownList({
          dataSource:[...this.departmentData],
          fields: { text: 'text', value: 'value' },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Always', placeholder: 'Department'
      });
        drowDownList2.appendTo(inputEle3);
        inputEle3.setAttribute('name', 'department');

        // Custom audience trigger field
        let row4: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement4: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement4.insertBefore(row4, formElement4.childNodes[3]);
        let container4: HTMLElement = createElement('div', { className: 'custom-field-container' });
        let inputEle4: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'ageFrom' }
        }) as HTMLInputElement;

        container4.appendChild(inputEle4);
        row4.appendChild(container4);


        let drowDownList3: DropDownList = new DropDownList({
          dataSource:[...this.ageColumn],
          fields: { text: 'text', value: 'value' },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Always', placeholder: 'Age From'
        });
        drowDownList3.appendTo(inputEle4);
        inputEle4.setAttribute('name', 'ageFrom');


        // Custom audience trigger field
        let row5: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement5: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement5.insertBefore(row5, formElement5.childNodes[4]);
        let container5: HTMLElement = createElement('div', { className: 'custom-field-container' })
        let inputEle5: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'ageTo' }
        }) as HTMLInputElement;

        container5.appendChild(inputEle5);
        row5.appendChild(container5);
        let drowDownList4: DropDownList = new DropDownList({
          dataSource:[...this.ageColumn],
          fields: { text: 'text', value: 'value' },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Always', placeholder: 'Age To'
        });
        drowDownList4.appendTo(inputEle5);
        inputEle5.setAttribute('name', 'ageTo');

    }

  }
}

// add new event
async onActionComplete(event){
  if(this.callApi){
  if(event.requestType == "eventRemoved"){
    let formData = {
      calendarEvent_id:event.data[0].calendarEvent_id
    }

  this.ngxService.start();
    await(this._api.companyDeleteCalendarEvent(formData).subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.openSnackBar(response.message);
        this.getEvent();

      }else{
        this.openErrrorSnackBar(response.message);
      }
      console.log(res);
      this.callApi = false;
      // this.getEvent();
    },err => {
      const error = err.error;
      this.openErrrorSnackBar(error.message);
      this.ngxService.stop();
    }));
  }else{
    if(this.data && this.data.length > 0){
    let data;
    if(this.data.length === 1){
      data =this.data[0]
    }else{
      data = this.data.pop();
    }
    console.log(data)
    let repeatArr = [];

    let repeatType = 0
    let repeatted = 0
    if(data.RecurrenceRule){
      let repeat = data.RecurrenceRule.split(';');
      for(let item of repeat){
        let param = item.split('=');
        let obj  = {key:param[0],value:param[1]}
        repeatArr.push(obj)
      }
      if(repeatArr[0].value == 'WEEKLY'){
        repeatType = 2
      }else if(repeatArr[0].value == 'DAILY'){
        repeatType = 1
      }else if(repeatArr[0].value == 'MONTHLY'){
        repeatType = 3
      }else if(repeatArr[0].value == 'YEARLY'){
        repeatType = 4
      }
      for(let item of repeatArr){
        if(item.key == 'INTERVAL'){
          repeatted = item.value;
        }
      }
    }


    let sDate = new Date(data.StartTime);
    let eDate = new Date(data.EndTime)
    let formData = {
      "event_Type":data.EventType != null?(data.EventType == 'holiday'?'1':'0'):'0',
      "event_StartDate":moment(sDate).format('YYYY-MM-DD'),
      "event_EndDate":moment(eDate).format('YYYY-MM-DD'),
      "event_Description":data.Description || '',
      "fileName":"",
      "event_Title":data.Subject,
      "isAllday":data.IsAllDay ? 1 : 0,
      "repeatType": repeatType,
      "repeateTime":repeatted,
      "eventstartTime":moment(sDate).format('HH:mm'),
      "eventendTime":moment(eDate).format('HH:mm'),
      "department":data.department || '',
      "ageFrom":parseInt(data.ageFrom) || 0,
      "ageTo":parseInt(data.ageTo) || 0,
      "gender":data.gender || ''

    }
    if(data.calendarEvent_id && data.calendarEvent_id != ''  ){

  this.ngxService.start();
      formData['calendarEvent_id'] = data.calendarEvent_id;
      await(this._api.editEvent(formData).subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){

  this.data = []
          this.openSnackBar(response.message);
        }else{
          this.openErrrorSnackBar(response.message);
        }
        console.log(res);
        this.callApi = false;
        this.getEvent();
      },err => {
        const error = err.error;
        this.openErrrorSnackBar(error.message);
        this.ngxService.stop();
      }));
    }else{

  this.ngxService.start();
      await(this._api.addEvent(formData).subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){

  this.data = []
          this.openSnackBar(response.message);
        }else{
          this.openErrrorSnackBar(response.message);
        }
        console.log(res);
        this.callApi = false
        this.getEvent();
      },err => {
        const error = err.error;
        this.openErrrorSnackBar(error.message);
        this.ngxService.stop();
      }));
    }


    }
  }
  }
}
// selectEvent
onEventClick(event){
  console.log(event)
  this.selectedEvent = [event.event]
}

// for get only date from start date of selected event
getDate(e){
  return moment(e).format('DD MMM YYYY')
}

// for get only time from start date of selected event
getTime(e){
  return moment(e).format('HH:mm A')
}

oneventRendered(args: EventRenderedArgs): void {
  let categoryColor: string = args.data.CategoryColor as string;
  if (!args.element || !categoryColor) {
      return;
  }
  if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
  } else {
      args.element.style.backgroundColor = categoryColor;
  }
}

// alert message after api response success
openSnackBar(msg) {
  this._snackBar.open(msg, 'Ok', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['success-alert']
  });
}
// alert message after api response failure
openErrrorSnackBar(msg) {
  this._snackBar.open(msg, 'Ok', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['failure-alert']
  });
}

}
