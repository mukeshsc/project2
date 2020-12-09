import { Component, Inject, OnInit } from '@angular/core';

import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  insurance: string;
}
@Component({
  selector: 'app-insurance-add',
  templateUrl: './insurance-add.component.html',
  styleUrls: ['./insurance-add.component.scss']
})
export class InsuranceAddComponent implements OnInit {
  currentDate = new Date();
  formData = {
    Insurance_Name:'',
    expiryDate:'',
    Insurance_Plan:'',
    Insurance_Benefit:'',
    Network:'',
    ip_Address:'123',
    // company_id: null,
  };
  BenifitType = '0';
  NetworkType = '0';
  roleData: any = [];
  files:any=[];
  files1:any=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<InsuranceAddComponent>) { }

  ngOnInit(): void {
    // this.formData.company_id = JSON.parse(localStorage.getItem('userData')).company_id;
    this.formData.Insurance_Name = JSON.parse(this.data.insurance).name;
    this.formData.expiryDate = JSON.parse(this.data.insurance).date;
  }



  // add new Insurance
  async addInsurance(){
    await(this._api.addInsurance(this.formData).subscribe(res => {
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

    // upload Table of benifits
    async onSelect(event) {
      console.log(event);
      this.files = [...event.addedFiles];
      if(event.addedFiles.length > 0){

        await(this._api.uploadThemeDoc(event.addedFiles[0],'insuranceDoc').subscribe(res => {
          this.ngxService.stop();
          const response: any = res;
          if (response.success == true){
            this.formData.Insurance_Benefit = response.data;

          }else{
            this.openSnackBar(response.message);
          }
          console.log(res);
        },err => {
          const error = err.error;
          this.openErrrorSnackBar(error.message);
          this.ngxService.stop();
        }));
      }else{
        this.openErrrorSnackBar('File size is too large');
      }
    }

    onRemove(event) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }

    // upload network
    async onSelect1(event) {
      console.log(event);
      this.files1 = [...event.addedFiles];
      if(event.addedFiles.length > 0){

        await(this._api.uploadThemeDoc(event.addedFiles[0],'insuranceDoc').subscribe(res => {
          this.ngxService.stop();
          const response: any = res;
          if (response.success == true){
            this.formData.Network = response.data;

          }else{
            this.openSnackBar(response.message);
          }
          console.log(res);
        },err => {
          const error = err.error;
          this.openErrrorSnackBar(error.message);
          this.ngxService.stop();
        }));
      }else{
        this.openErrrorSnackBar('File size is too large');
      }
    }

    onRemove1(event) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
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
