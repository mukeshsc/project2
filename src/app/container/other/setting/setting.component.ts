import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { AccessServiceService } from 'src/app/service/access-service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  files: File[] = [];
  files2: File[] = [];
  themeDataSet:any;
  smtpDataSet:any;
  smtpData = {}
  themeData = {
    "company_Brand":"#000000" ,
    "ligth_logo": "",
    "favicon": "",
    "company_websiteName":"",
    "created_By":null,
    "updated_By":null,
    "themeId":null,
    "ip_Address":"12.32.32.22",
  }
  passwordData = {
    "oldpassword": "",
    "newpassword":"",
    "confirmpassword":""
  }
  passNotMatched: boolean = false;
  accessPermission:boolean;
  constructor( public _access:AccessServiceService,public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    //getting access permission
    this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
    this.getTheme();
    this.getsmtp();
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
          this.openErrrorSnackBar(response.message);
        }
        console.log(res);
      },err => {
        const error = err.error;
        this.ngxService.stop();
        this.openErrrorSnackBar(error.message);
      }));
    }

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
          "updated_By":this.themeDataSet.updated_By,
          "themeId":this.themeDataSet.theme_id,
          "ip_Address":"12.32.32.22",
        }
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
      this.openErrrorSnackBar(response.message);
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.ngxService.stop();
    this.openErrrorSnackBar(error.message);
  }));

}

 // Get smtp
 async getsmtp(){
  this.ngxService.start();
  await(this._api.getSmtp().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.smtpDataSet = response.data;
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

// update smptp

async updateSmtp(){
  let data = {
    "smtpId":this.smtpDataSet.smtp_id,
    "mail_Server":this.smtpDataSet.mail_Server,
    "smtp_Port":this.smtpDataSet.smtp_Port,
    "userName":this.smtpDataSet.userName,
    "password":this.smtpDataSet.password,
    "server_Security":this.smtpDataSet.server_Security,
    "default_sender":this.smtpDataSet.default_Sender,
    "default_SenderName":this.smtpDataSet.default_SenderName,
    "ip_Address":"12.32.32.22",
    "companyId":JSON.parse(localStorage.getItem('userData')).company_id
  }
  this.ngxService.start();
  await(this._api.smptypDetailUpdate(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getsmtp();
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

  // upload logo image
  async onSelect(event) {
    console.log(event);
    this.files = [...event.addedFiles];
    if(event.addedFiles.length > 0){

      await(this._api.uploadThemeDoc(event.addedFiles[0],'logo').subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.themeData.ligth_logo = response.data;

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

  // upload favicon image
  async onFaviSelect(event) {
    console.log(event);
    this.files2 = [...event.addedFiles];
    if(event.addedFiles.length > 0){

      await(this._api.uploadThemeDoc(event.addedFiles[0],'favicon').subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.themeData.favicon = response.data;

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

  onFaviRemove(event) {
    console.log(event);
    this.files2.splice(this.files.indexOf(event), 1);
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
