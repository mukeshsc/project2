import { Component, Inject, OnInit } from '@angular/core';

import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

export interface DialogData {
  userId: string;
  leaveBalance:any;
}


@Component({
  selector: 'app-employee-leave-manage',
  templateUrl: './employee-leave-manage.component.html',
  styleUrls: ['./employee-leave-manage.component.scss']
})
export class EmployeeLeaveManageComponent implements OnInit {

  formData = {
    "userId":"",
    "companyId":"",
    "ip_Address":"12.21.44.22",
    "leaveBalace":[]
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EmployeeLeaveManageComponent>) { }

  ngOnInit(): void {
    this.formData.companyId = JSON.parse(localStorage.getItem('userData')).company_id;
    this.formData.userId = JSON.parse(this.data.userId);
    this.formData.leaveBalace = JSON.parse(this.data.leaveBalance)
  }



async manageEmployeeleaveBalance(){
  this.ngxService.start();
  await(this._api.manageEmployeeleaveBalance(this.formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message)
      this.dialogRef.close('close');
    }else{
      this.openErrrorSnackBar(response.message)
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.openErrrorSnackBar(error)
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
