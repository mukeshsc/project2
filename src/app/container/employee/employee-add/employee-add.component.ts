import { Component, OnInit } from '@angular/core';

import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  formData = {
    first_name:'',
    last_name:'',
    email:'',
    reporting_Manager:'',
    department:'',
    role:null,
    employee_joiningDate:'',
    insurance_plan_name:'',

    total: null,
    basic: null,
    home_Allowance: null,
    transportation_Allowance: null,
    other_Allowance: null,

    maternity:null,
    medical:null,
    annual:null,
    unpaid_Leaves:null,
    others:null,

    working_HoursTo:'',
    working_HoursFrom:'',

    company_id:null,
    ip_Address:'123',
	  created_By :'1',
    updated_By:'1'
  };
  roleData: any = [];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EmployeeAddComponent>) { }

  ngOnInit(): void {
    this.formData.company_id = JSON.parse(localStorage.getItem('userData')).company_id;
    this.formData.created_By = JSON.parse(localStorage.getItem('userData')).user_id;
    this.formData.updated_By = JSON.parse(localStorage.getItem('userData')).user_id;
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


  // add new Employee
  async addEmployee(){
    await(this._api.addEmployee(this.formData).subscribe(res => {
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
