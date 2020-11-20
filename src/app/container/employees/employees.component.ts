import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { environment } from '../../../environments/environment';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  // set header column
  displayedColumns: string[] = ['position', 'name', 'email', 'designation', 'status', 'action'];

  //set static data for table
  dataSource = new MatTableDataSource([]);

  // table sorting and pagination
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  constructor(public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getList();
  }

 // Get Sub Admin List
 async getList(){
  this.ngxService.start();
  await(this._api.getSubAdmin().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data);
      const arr = [];
      for (const item of response.data){
        const obj = {position: `${environment.apiBaseUrl}${item.profile_picture}`, name: item.first_name + ' ' + item.last_name, email: item.email, designation: item.roleName, status: item.status,id:item.superAdmin_id,role_id:item.role.toString(), address:item.address,mobile:item.mobile};
        arr.push(obj);
      }
      this.dataSource = new MatTableDataSource([...arr]);
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


// Delete Sub Admin
async deleteSubAdmin(id){
  this.ngxService.start();
  let formData = {
    superAdmin_id:id
  }
  await(this._api.deleteSubAdmin(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getList();
    }else{
      this.openSnackBar(response.message);
    }


    console.log(res);
  }, err => {
    const error = err.error;
    this.openSnackBar(error.message);
    this.ngxService.stop();
  }));

}

// Update Sub Admin status
async statusSubAdmin(id,status){
  this.ngxService.start();
  let formData = {
    "superAdmin_id":id,
    "status":status ,
    "ip_Address":"1111"
  }
  await(this._api.updateSubAdminStatus(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getList();
    }else{
      this.openSnackBar(response.message);
    }


    console.log(res);
  }, err => {
    const error = err.error;
    this.openSnackBar(error.message);
    this.ngxService.stop();
  }));

}

  // open add Sub Admin modal
  openSubAddModal() {
    const dialogRef = this.dialog.open(EmployeeAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getList()
    });
  }

  // open add Sub Admin modal
  openSubEditModal(e) {
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      data: {
        subAdmin: JSON.stringify(e)
      }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getList()
    });
  }


  //Searching
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
