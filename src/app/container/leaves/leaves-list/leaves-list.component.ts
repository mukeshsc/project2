import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { environment } from '../../../../environments/environment';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/confirm-box/confirm-box.component';
import { AccessServiceService } from 'src/app/service/access-service.service';

@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent implements OnInit {
// set header column
displayedColumns: string[] = ['profile_picture', 'name', 'email', 'department', 'is_leave', 'action'];

//set static data for table
dataSource = new MatTableDataSource([]);

// table sorting and pagination
@ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
@ViewChild(MatSort,{static:false}) sort: MatSort;

filePath = environment.apiBaseUrl
responseData:any = [];
csvFile:any = '';
newRequest:number = 0;
accessPermission:boolean;
formData = {
  "companyId":"1",
	"userId":"",
	"date":"",
	"weekly":"",
	"month":"",
	"dateRange":"",
	"allemployees":"",
	"department":"",
}
constructor(public _access:AccessServiceService, public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

ngOnInit(): void {
//getting access permission
  this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
  this.getList();
}

// Get Leave List
async getList(){
this.ngxService.start();
await(this._api.getLeave(this.formData).subscribe(res => {
  this.ngxService.stop();
  const response: any = res;
  if (response.success == true){
    console.log(response.data);
    this.responseData = response.data;
    for (const item of response.data){
      if(item.is_leave == 0){
        this.newRequest++
      }
    }
    this.dataSource = new MatTableDataSource([...this.responseData]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }else{
  }
  console.log(res);
}, err => {
  const error = err.error;
  this.ngxService.stop();
}));

}


// Delete Employee
async deleteEmployee(id){
this.ngxService.start();
let formData = {
  user_id:id,
  company_id:JSON.parse(localStorage.getItem('userData')).company_id
}
await(this._api.deleteEmployee(formData).subscribe(res => {
  this.ngxService.stop();
  const response: any = res;
  if (response.success == true){
    this.openSnackBar(response.message);
    this.getList();
  }else{
    this.openErrrorSnackBar(response.message);
  }


  console.log(res);
}, err => {
  const error = err.error;
  this.openErrrorSnackBar(error.message);
  this.ngxService.stop();
}));

}

// Update Employee status
async updateEmployeeStatus(id,status){
this.ngxService.start();
let formData = {
  user_id:id,
  status:status ,
  company_id:JSON.parse(localStorage.getItem('userData')).company_id
}
await(this._api.updateEmployeeStatus(formData).subscribe(res => {
  this.ngxService.stop();
  const response: any = res;
  if (response.success == true){
    this.openSnackBar(response.message);
    this.getList();
  }else{
    this.openErrrorSnackBar(response.message);
  }


  console.log(res);
}, err => {
  const error = err.error;
  this.openErrrorSnackBar(error.message);
  this.ngxService.stop();
}));

}

// Get sample csv
async getSampleCsv(){
this.ngxService.start();
await(this._api.getSampleCsv().subscribe(res => {
  this.ngxService.stop();
  const response: any = res;
  if (response.success == true){
    // this.openSnackBar(response.message);
    this.csvFile = response.data;
  }else{
    this.openErrrorSnackBar(response.message);
  }


  console.log(res);
}, err => {
  const error = err.error;
  this.openErrrorSnackBar(error.message);
  this.ngxService.stop();
}));

}


// send invitation link to employee
async invitationLink(id){
this.ngxService.start();
let formData = {
  user_id:id,
  company_id:JSON.parse(localStorage.getItem('userData')).company_id
}
await(this._api.invitationLink(formData).subscribe(res => {
  this.ngxService.stop();
  const response: any = res;
  if (response.success == true){
    this.openSnackBar(response.message);
    this.getList();
  }else{
    this.openErrrorSnackBar(response.message);
  }


  console.log(res);
}, err => {
  const error = err.error;
  this.openErrrorSnackBar(error.message);
  this.ngxService.stop();
}));

}




//Searching
applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
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

// confirm message
confirmDialog(id): void {
  const message = `Are you sure you want to delete this?`;

  const dialogData = new ConfirmDialogModel('Confirm Action', message);

  const dialogRef = this.dialog.open(ConfirmBoxComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      this.deleteEmployee(id);
    }
  });
}
}
