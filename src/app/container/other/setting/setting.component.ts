import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { AccessServiceService } from 'src/app/service/access-service.service';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  fieldconPass:boolean;
  fieldNewPass:boolean;
  fieldOldPass:boolean;
  oldNewSame:boolean;
  files: File[] = [];
  files2: File[] = [];
  themeDataSet:any;
  holidayData:any = [];
  holidaySet = {
    "event_Type":"1",
    "event_StartDate":"",
    "event_EndDate":"",
    "target_Audeince":"1",
    "event_Description":"",
    "fileName":"gergerge",
    "event_Title":"",
    "isAllday":"1",
    "ip_Address":"123"
  }
  salaryData:any = [];
  salarySet = {
    "salaryType":"",
    "ip_Address":"12.43.33.33",
    "companyId":""
  }
  departmentData:any = [];
  departmentSet = {
    "departmentType":"",
    "ip_Address":"123.444.333.33",
    "companyId":""
  }
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
  leaveDataSet = {
    "leaveType":"",
    "ip_Address":"12.43.33.33",
    "companyId":""
  }
  leaveData:any = [];
  passNotMatched: boolean = false;
  currentDate = new Date();
  accessPermission:boolean;
  constructor( public router:Router, public dialog: MatDialog, public _access:AccessServiceService,public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    //getting access permission
    this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
    this.departmentSet.companyId = JSON.parse(localStorage.getItem('userData')).company_id;
    this.leaveDataSet.companyId = JSON.parse(localStorage.getItem('userData')).company_id;
    this.salarySet.companyId = JSON.parse(localStorage.getItem('userData')).company_id;
    this.getTheme();
    this.getsmtp();
    this.getDepartment();
    this.getLeave();
    this.getSalary();
    this.getHoliday();
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
          localStorage.setItem('userData', undefined);
          localStorage.setItem('token', undefined)
          this.router.navigate(['/login']);
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

// Get Department
async getDepartment(){
  this.ngxService.start();
  await(this._api.showDepartment().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.departmentData = response.data;
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

//add department
async addDepartement(){
  this.ngxService.start();
  await(this._api.addDepartment(this.departmentSet).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getDepartment();
      this.departmentSet = {
        "departmentType":"",
        "ip_Address":"123.444.333.33",
        "companyId":""
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

// delete departemnt
async deleteDepartment(id){
  let data ={
    "departmentId":id,
    "companyId":JSON.parse(localStorage.getItem('userData')).company_id ,
    "ip_Address":"123.22.22.22"
  }
  this.ngxService.start();
  await(this._api.deleteDepartment(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getDepartment();
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

// Get Leave
async getLeave(){
  this.ngxService.start();
  await(this._api.showLeave().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.leaveData = response.data;
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

//add leave
async addLeave(){
  this.ngxService.start();
  await(this._api.addLeave(this.departmentSet).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getLeave();
      this.leaveDataSet = {
        "leaveType":"",
        "ip_Address":"12.43.33.33",
        "companyId":""
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

// delete leave
async deleteLeave(id){
  let data ={
    "leaveTypeId":id,
    "companyId":JSON.parse(localStorage.getItem('userData')).company_id ,
    "ip_Address":"123.22.22.22"
  }
  this.ngxService.start();
  await(this._api.deleteLeave(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getLeave();
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


// Get Salary breakdown
async getSalary(){
  this.ngxService.start();
  await(this._api.showSalary().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.salaryData = response.data;
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

//add Salary type
async addSalary(){
  this.ngxService.start();
  await(this._api.addSalary(this.salarySet).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.salarySet = {
        "salaryType":"",
        "ip_Address":"12.43.33.33",
        "companyId":""
      }
      this.getSalary();
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

// delete leave
async deleteSalary(id){
  let data ={
    "salaryTypeId":id,
    "companyId":JSON.parse(localStorage.getItem('userData')).company_id ,
    "ip_Address":"123.22.22.22"
  }
  this.ngxService.start();
  await(this._api.deleteSalary(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getSalary();
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

// Get Holiday
async getHoliday(){
  this.ngxService.start();
  await(this._api.showHoliday().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.holidayData = response.data;
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

//add Holiday
async addHoliday(){
  this.ngxService.start();
  await(this._api.addHoliday(this.holidaySet).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.holidaySet = {
        "event_Type":"1",
        "event_StartDate":"",
        "event_EndDate":"",
        "target_Audeince":"1",
        "event_Description":"",
        "fileName":"gergerge",
        "event_Title":"",
        "isAllday":"1",
        "ip_Address":"123"
      }
      this.getHoliday();
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

// delete Holiday
async deleteHoliday(id){
  let data ={
    "calendarEvent_id":id,
    "ip_Address":"123.22.22.22"
  }
  this.ngxService.start();
  await(this._api.deleteHoliday(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getHoliday();
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

  // testing email

  // Get Theme
  async testEmail(){
    let  data = {
      user_id:JSON.parse(localStorage.getItem('userData')).user_id,
      company_id:JSON.parse(localStorage.getItem('userData')).company_id,
      email:JSON.parse(localStorage.getItem('userData')).email,
    }
    this.ngxService.start();
    await(this._api.testEmail(data).subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.openSnackBar(response.message)
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

// confirm message for delete department
confirmDialog(id): void {
  const message = `Are you sure you want to delete this?`;

  const dialogData = new ConfirmDialogModel('Confirm Action', message);

  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      this.deleteDepartment(id);
    }
  });
}
// confirm message for delete leave
confirmDialogLeave(id): void {
  const message = `Are you sure you want to delete this?`;

  const dialogData = new ConfirmDialogModel('Confirm Action', message);

  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      this.deleteLeave(id);
    }
  });
}
// confirm message for delete salary type
confirmDialogSalary(id): void {
  const message = `Are you sure you want to delete this?`;

  const dialogData = new ConfirmDialogModel('Confirm Action', message);

  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      this.deleteSalary(id);
    }
  });
}

// confirm message for delete holiday
confirmDialogHoliday(id): void {
  const message = `Are you sure you want to delete this?`;

  const dialogData = new ConfirmDialogModel('Confirm Action', message);

  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      this.deleteHoliday(id);
    }
  });
}

//check Old and New Password
ChkOldNew(e){
  if(this.passwordData.oldpassword == e){
    console.log(e, this.passwordData.oldpassword)
    this.oldNewSame = true;
  }else{
    this.oldNewSame = false;
  }
}

}
