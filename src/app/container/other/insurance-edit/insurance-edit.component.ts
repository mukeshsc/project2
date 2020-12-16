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
  selector: 'app-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.scss']
})
export class InsuranceEditComponent implements OnInit {
  currentDate = new Date();
  formData = {
    insuranceDetail_id:'',
    insurance_Name:'',
    expiryDate:'',
    insurance_Plan:'',
    insurance_Benefit:'',
    network:'',
    ip_Address:'123',
    // company_id: null,
  };
  BenifitType = '0';
  NetworkType = '0';
  roleData: any = [];
  files:any=[];
  files1:any=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<InsuranceEditComponent>) { }

  ngOnInit(): void {
    console.log(this.data.insurance)
    // this.formData.company_id = JSON.parse(localStorage.getItem('userData')).company_id;
    this.formData.insurance_Name = JSON.parse(this.data.insurance).main.insuranceName;
    this.formData.expiryDate = JSON.parse(this.data.insurance).main.date;
    this.formData.insurance_Plan = JSON.parse(this.data.insurance).sub.insurance_Plan;
    this.formData.insurance_Benefit = JSON.parse(this.data.insurance).sub.insurance_Benefit;
    this.formData.network = JSON.parse(this.data.insurance).sub.network;
    this.formData.insuranceDetail_id = JSON.parse(this.data.insurance).sub.insuranceDetail_id;
  }



  // edit new Insurance
  async editInsurance(){
    await(this._api.editInsurance(this.formData).subscribe(res => {
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
            this.formData.insurance_Benefit = response.data;

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
            this.formData.network = response.data;

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
