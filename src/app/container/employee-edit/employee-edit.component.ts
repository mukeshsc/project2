import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  subAdmin: string;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  formData = {
    "superAdmin_id"   : "",
    "first_name"      : "",
    "last_name"       : "",
    "email"           : "",
    "profile_picture" : "",
    "address"         : "",
    "mobile"          : "",
    "role"            : "",
    "ip_Address"      : ""
  }

  subAdminData:any;
  files: File[] = [];
  roleData:any= [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EmployeeEditComponent>) { }

  ngOnInit(): void {
    this.subAdminData = JSON.parse(this.data.subAdmin);
    console.log(this.subAdminData)
    this.formData = {
      "superAdmin_id"              : this.subAdminData.id,
      "first_name"      : (this.subAdminData.name.split(' '))[0],
      "last_name"       : (this.subAdminData.name.split(' '))[1],
      "email"           : this.subAdminData.email,
      "profile_picture" : this.subAdminData.profile_picture,
      "address"         : this.subAdminData.address,
      "mobile"          : this.subAdminData.mobile,
      "role"            : this.subAdminData.role,
      "ip_Address"      : "12345"
    }
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
  async editSubAdmin(){
    await(this._api.updateSubAdmin(this.formData).subscribe(res => {
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
  async onSelect(event) {
    console.log(event);
    this.files=[...event.addedFiles];
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
