import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  files: File[] = [];
  faqData:any;
  privacyPolicyData:any;
  themeDataSet:any;
  themeData = {
    "company_Brand":"#000000" ,
    "ligth_logo": "",
    "favicon": "",
    "company_websiteName":"",
    "created_By":null,
    "updated_By":null
  }
  passwordData = {
    "oldpassword": "",
    "newpassword":"",
    "confirmpassword":""
  }
  passNotMatched: boolean = false;
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFaq();
    this.getPrivacyPolicy();
    this.getTheme();
  }

  // Security setting (Update password)
  async updatePassword(){
    if(this.passwordData.newpassword !== this.passwordData.confirmpassword){
      this.passNotMatched = true;
    }else{
      this.ngxService.start();
      this.passNotMatched = false;
      await(this._api.resetPassword(this.passwordData).subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.openSnackBar(response.message);
          this.passwordData ={
          "oldpassword": "",
          "newpassword":"",
          "confirmpassword":""
          }
        }else{
          this.openSnackBar(response.message);
        }
        console.log(res);
      },err => {
        const error = err.error;
        this.ngxService.stop();
        this.openSnackBar(error.message);
      }));
    }

  }

   // Get FAQ
   async getFaq(){
      this.ngxService.start();
      await(this._api.faq().subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          console.log(JSON.parse(response.data))
          this.faqData = JSON.parse(response.data);
          this.openSnackBar(response.message);
        }else{
          this.openSnackBar(response.message);
        }
        console.log(res);
      },err => {
        const error = err.error;
        this.ngxService.stop();
        this.openSnackBar(error.message);
      }));

  }


   // Get FAQ
   async getPrivacyPolicy(){
    this.ngxService.start();
    await(this._api.privacyPolicy().subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.privacyPolicyData = response.data.privacy_Policy;
        console.log(this.privacyPolicyData)
        this.openSnackBar(response.message);
      }else{
        this.openSnackBar(response.message);
      }
      console.log(res);
    },err => {
      const error = err.error;
      this.ngxService.stop();
      this.openSnackBar(error.message);
    }));

}

  // Get Theme
  async getTheme(){
    this.ngxService.start();
    await(this._api.getTheme().subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.themeDataSet = response.data;
        this.themeData = {
          "company_Brand":this.themeDataSet.company_Brand ,
          "ligth_logo":this.themeDataSet.ligth_logo,
          "favicon": this.themeDataSet.favicon,
          "company_websiteName":this.themeDataSet.company_websiteName,
          "created_By":this.themeDataSet.created_By,
          "updated_By":this.themeDataSet.updated_By
        }
        this.openSnackBar(response.message);
      }else{
        this.openSnackBar(response.message);
      }
      console.log(res);
    },err => {
      const error = err.error;
      this.ngxService.stop();
      this.openSnackBar(error.message);
    }));

}

// Update Theme
async updateTheme(){
  this.ngxService.start();
  await(this._api.updateTheme(this.themeData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.themeData = response.data;
      this.openSnackBar(response.message);
      this.getTheme()
    }else{
      this.openSnackBar(response.message);
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.ngxService.stop();
    this.openSnackBar(error.message);
  }));

}


  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

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
