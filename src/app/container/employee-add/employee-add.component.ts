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
    "first_name"      : "",
    "last_name"       : "",
    "email"           : "",
    "password"        : "",
    "profile_picture" : "",
    "address"         : "",
    "mobile"          : "",
    "role"            : "",
    "ip_Address"      : ""
  }
  files: File[] = [];
  roleData:any= [];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EmployeeAddComponent>) { }

  ngOnInit(): void {
    this.getRole();
  }

// Get Role Type
async getRole(){
  this.ngxService.start();
  await(this._api.getRole().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data)
      this.roleData = response.data;
      console.log(this.roleData)
    }else{
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.ngxService.stop();
  }));

}


  // add new Sub Admin
  async addSubAdmin(){
    await(this._api.addSubAdmin(this.formData).subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.openSnackBar(response.message);
      }else{
        this.openSnackBar(response.message);
      }
      console.log(res);
      this.dialogRef.close('Close');
    },err => {
      const error = err.error;
      this.openSnackBar(error.message);
      this.ngxService.stop();
    }));
  }


  // onSelect image
  async uploadDoc(event) {
    console.log(event);
    this.files = [...event.addedFiles];
    if(event.addedFiles.length > 0){

      await(this._api.uploadDoc(event.addedFiles[0]).subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.formData.profile_picture = response.data;

        }else{
          this.openSnackBar(response.message);
        }
        console.log(res);
      },err => {
        const error = err.error;
        this.openSnackBar(error.message);
        this.ngxService.stop();
      }));
    }else{
      this.openSnackBar('File size is too large');
    }
  }

  // onRemove image
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
