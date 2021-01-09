import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { AccessServiceService } from 'src/app/service/access-service.service';
import { PayslipDetailComponent } from '../payslip-detail/payslip-detail.component';
@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {

  @ViewChild('screen') screen: ElementRef;

title:string = '';
// set header column
displayedColumns: string[] = ['profile_picture', 'first_name', 'department', 'designation', 'salary', 'action'];

//set static data for table
dataSource = new MatTableDataSource([]);

// table sorting and pagination
@ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
@ViewChild(MatSort,{static:false}) sort: MatSort;
data={
  address:true,
  department:true,
  designation:true,
  passport:true,
  template:true,
  count:0
}
responseData:any = [];
csvFile:any = '';
accessPermission:boolean;
filePath = environment.apiBaseUrl
constructor(public _access:AccessServiceService, public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

ngOnInit(): void {
//getting access permission
  this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
  this.getList();
  this.getComapnsationList();
}

  // Get com[asation] List
  async getComapnsationList(){
    this.ngxService.start();
    await(this._api.compensationTemplate().subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        console.log(response.data);
        this.responseData = response.data[0];
        this.data.department = this.responseData.department == 1?true:false;
        this.data.designation = this.responseData.designation == 1?true:false;
        this.data.passport = this.responseData.passport == 1?true:false;
        this.data.address = this.responseData.workLocation == 1?true:false;
        this.data.template = this.responseData.templateId == 1?true:false;
      }else{
      }
      console.log(res);
    }, err => {
      const error = err.error;
      this.ngxService.stop();
    }));

  }

// Get Employee List
async getList(){
this.ngxService.start();
await(this._api.getEmployee().subscribe(res => {
  this.ngxService.stop();
  const response: any = res;
  if (response.success == true){
    console.log(response.data);
    let arr = []
    for(let item of response.data){
      if(item.status == 1){
        arr.push(item)
      }
    }
    this.responseData = arr;
    for(let item of this.responseData){
      let total = 0
      if(item.salaryBalance != null){
        let sal = JSON.parse(item.salaryBalance)
        for(let i =0;i< sal.length;i++){
          for (var key in sal[i]) {
            console.log(sal[i][key])
            total+= parseInt(sal[i][key]);
          }
        }
      }

      item['salary'] = total;
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

showTemplate(tempNo, count){
  console.log(count)
  this.data.count = count
  const dialogRef = this.dialog.open(PayslipDetailComponent,{
    width:'100%',
    data: {
      tempNo: tempNo,
      tempData:JSON.stringify(this.data)
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
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


}
