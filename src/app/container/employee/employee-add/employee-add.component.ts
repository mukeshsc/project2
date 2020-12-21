import { Component, OnInit } from '@angular/core';

import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  providers: [
  {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EmployeeAddComponent implements OnInit {
  formData = {
    first_name:'',
    last_name:'',
    email:'',
    reporting_Manager:'',
    department:'',
    role:'',
    employee_joiningDate:'',
    insurance_plan_name:'',

    // total: null,
    // basic: null,
    // home_Allowance: null,
    // transportation_Allowance: null,
    // other_Allowance: null,

    // maternity:null,
    // medical:null,
    // annual:null,
    // unpaid_Leaves:null,
    // others:null,

    salary:[],
    leaves:[],

    working_HoursTo:'',
    working_HoursFrom:'',

    company_id:null,
    ip_Address:'123',
	  created_By :'1',
    updated_By:'1'
  };

  departmentData:any = [];
  roleData: any = [];
  leaveData:any =[];
  salaryData:any = [];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EmployeeAddComponent>) { }

  ngOnInit(): void {
    this.formData.company_id = JSON.parse(localStorage.getItem('userData')).company_id;
    this.formData.created_By = JSON.parse(localStorage.getItem('userData')).user_id;
    this.formData.updated_By = JSON.parse(localStorage.getItem('userData')).user_id;
    this.getRole();
    this.getDepartment();
    this.getLeave();
    this.getSalary();
  }



// Get Leave
async getLeave(){
  this.ngxService.start();
  await(this._api.showLeave().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.leaveData = response.data;
      for(let item of this.leaveData){
        let obj = {};
        obj[item.leave_Type] = '';
        this.formData.leaves.push(obj);
      }
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

// Get Salary breakdown
async getSalary(){
  this.ngxService.start();
  await(this._api.showSalary().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.salaryData = response.data;
      for(let item of this.salaryData){
        let obj = {};
        obj[item.salary_Type] = '';
        this.formData.salary.push(obj);
      }
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

// Get Role Type
async getRole(){
  this.ngxService.start();
  await(this._api.getRole().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data);
      this.roleData = response.data;
      console.log(this.roleData);
    }else{
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.ngxService.stop();
  }));

}

// Get Department
async getDepartment(){
  this.ngxService.start();
  await(this._api.showDepartment().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.departmentData = response.data;
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

  // add new Employee
  async addEmployee(){
    this.ngxService.start();
    await(this._api.addEmployee(this.formData).subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.openSnackBar(response.message);
      }else{
        this.openErrrorSnackBar(response.message);
      }
      console.log(res);
      this.dialogRef.close('Close');
    }, err => {
      const error = err.error;
      this.openErrrorSnackBar(error.message);
      this.ngxService.stop();
    }));
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
