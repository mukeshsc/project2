import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  employee: string;
}

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
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  providers: [
  {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EmployeeEditComponent implements OnInit {
  formData = {
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    reporting_Manager: '',
    department: '',
    employee_joiningDate: '',
    insurance_plan_name: '',
    leaveBalance:[],
    salaryBalance:[],
    working_HoursTo: '' ,
    working_HoursFrom: '',
    company_id: null,
    role: 0,
    designation:'',
    ip_Address: '123',
    created_By : '',
    updated_By: '',
    isType:0
  };

  employeeData: any;
  roleData: any = [];
  departmentData:any = [];
  leaveData:any =[];
  salaryData:any = [];
  employeeList:any = [];
  insuranceData:any=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EmployeeEditComponent>) { }

  ngOnInit(): void {
    this.employeeData = JSON.parse(this.data.employee);
    console.log(this.employeeData);
    this.formData = {
      user_id: this.employeeData.user_id,
      first_name: this.employeeData.first_name,
      last_name: this.employeeData.last_name,
      email: this.employeeData.email,
      reporting_Manager: this.employeeData.reporting_Manager,
      department: this.employeeData.department,
      employee_joiningDate: this.employeeData.employee_joiningDate,
      insurance_plan_name: this.employeeData.insurance_plan_name,
      salaryBalance:this.employeeData.salaryBalance?JSON.parse(this.employeeData.salaryBalance):[],
      leaveBalance: this.employeeData.leaveBalance?JSON.parse(this.employeeData.leaveBalance):[],
      working_HoursTo: this.employeeData.working_HoursTo,
      working_HoursFrom: this.employeeData.working_HoursFrom,
      designation:this.employeeData.designation,
      company_id: this.employeeData.company_id,
      role:0,
      ip_Address: '123',
      created_By : JSON.parse(localStorage.getItem('userData')).user_id,
      updated_By: JSON.parse(localStorage.getItem('userData')).user_id,
      isType:0
    };
    this.getRole();
    this.getDepartment();
    this.getLeave();
    this.getSalary();
    this.getList()
    this.getInsuranceList()
  }

// Get Insurance List
async getInsuranceList(){
  this.ngxService.start();
  await(this._api.showInsurance().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data);

      this.insuranceData = response.data;
      console.log(this.insuranceData);
    }else{
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.ngxService.stop();
  }));

}


// Get Leave
async getLeave(){
  // console.log(this.formData.leaves)
  this.ngxService.start();
  await(this._api.showLeave().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.leaveData = response.data;
      let t = this.leaveData.length - this.formData.leaveBalance.length;
      console.log(t)
      for(let i = (this.leaveData.length - t); i <= this.leaveData.length; i++){
        let obj = {};
        obj[this.leaveData[i-1].leave_Type] = '';
        this.formData.leaveBalance.push(obj);
      }
      console.log(this.formData.leaveBalance)
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

      let t = this.salaryData.length - this.formData.salaryBalance.length;
      console.log(t)
      for(let i = (this.salaryData.length - t); i <= this.salaryData.length; i++){
        let obj = {};
        obj[this.salaryData[i-1].salary_Type] = '';
        this.formData.salaryBalance.push(obj);
      }
      console.log(this.formData.salaryBalance)

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
// Get Employee List
async getList(){
  this.ngxService.start();
  await(this._api.getEmployee().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data);
      this.employeeList = response.data;
    }else{
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.ngxService.stop();
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

  // add new Sub Admin
  async editEmployee(){
    this.ngxService.start();
    await(this._api.updateEmployee(this.formData).subscribe(res => {
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
