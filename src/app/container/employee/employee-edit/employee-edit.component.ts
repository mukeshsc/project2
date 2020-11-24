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

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
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
    total: 0,
    basic: 0,
    home_Allowance: 0,
    transportation_Allowance: 0,
    other_Allowance: 0,
    maternity: '',
    medical: '',
    annual: '',
    unpaid_Leaves: '',
    others: '',
    working_HoursTo: '' ,
    working_HoursFrom: '',
    company_id: null,
    role: null,
    ip_Address: '123',
    created_By : '',
    updated_By: ''
  };

  employeeData: any;
  roleData: any = [];
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
      total: this.employeeData.total,
      basic: this.employeeData.basic,
      home_Allowance: this.employeeData.home_Allowance,
      transportation_Allowance: this.employeeData.transportation_Allowance,
      other_Allowance: this.employeeData.other_Allowance,
      maternity: this.employeeData.maternity,
      medical: this.employeeData.medical,
      annual: this.employeeData.annual,
      unpaid_Leaves: this.employeeData.unpaid_Leaves,
      others: this.employeeData.others,
      working_HoursTo: this.employeeData.working_HoursTo,
      working_HoursFrom: this.employeeData.working_HoursFrom,
      company_id: this.employeeData.company_id,
      role: Number(this.employeeData.role),
      ip_Address: '123',
      created_By : JSON.parse(localStorage.getItem('userData')).user_id,
      updated_By: JSON.parse(localStorage.getItem('userData')).user_id
    };
    this.getRole();
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


  // add new Sub Admin
  async editEmployee(){
    await(this._api.updateEmployee(this.formData).subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.openSnackBar(response.message);
      }else{
        this.openSnackBar(response.message);
      }
      console.log(res);
      this.dialogRef.close('Close');
    }, err => {
      const error = err.error;
      this.openSnackBar(error.message);
      this.ngxService.stop();
    }));
  }

// alert message after api response
 openSnackBar(msg) {
  this._snackBar.open(msg, 'Ok', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  });
}
}
