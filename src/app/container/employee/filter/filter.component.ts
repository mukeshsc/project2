import { Component, OnInit } from '@angular/core';

import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
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
  roleData: any = [];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<FilterComponent>) { }

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
