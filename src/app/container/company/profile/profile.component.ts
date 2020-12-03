import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccessServiceService } from 'src/app/service/access-service.service';
import { CommonServiceService } from 'src/app/service/comman-service.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  accessPermission:boolean;
  workingDay = []
  constructor( public _access:AccessServiceService, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) {
     //getting access permission
     this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
  }

  ngOnInit(): void {
    this.getWorkingDay();
  }

  //get working hour
  async getWorkingDay(){
    this.ngxService.start();
      await(this._api.companyWorkingDay().subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.workingDay = response.data;
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

  //update working day

  async companyWorkingDaySet(){
    let data = {
      "companyId": JSON.parse(localStorage.getItem('userData')).company_id,
      "workingDay":JSON.stringify(this.workingDay)
    }
    this.ngxService.start();
      await(this._api.companyWorkingDaySet(data).subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.openSnackBar(response.message);
          this.getWorkingDay()
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
 // employee working hour on off setup
 setOnOff(e, id){
  this.workingDay[id].OnOff = (e == 'true'?true:false)
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
