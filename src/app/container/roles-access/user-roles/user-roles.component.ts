import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RoleAddComponent } from '../role-add/role-add.component';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit , AfterViewInit  {
  roleData = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['role_Type', 'nouser', 'accesslevel', 'status', 'actionsrequired'];

  // table sorting and pagination
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  constructor(public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
  }

  ngAfterViewInit(){
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
      let arr = []
      for(let item of response.data){
        let obj = {userRole_id:item.userRole_id,role_Type: item.role_Type, nouser: 0, accesslevel: "Full Access", status: item.status, actionsrequired:4}
        arr.push(obj);
      }
      this.roleData = new MatTableDataSource([...arr]);

      this.roleData.paginator = this.paginator;
      this.roleData.sort = this.sort;
      console.log(this.roleData)
    }else{
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.ngxService.stop();
  }));

}

// update role status
async udpateStatus(id,status){
  let data = {
    "userRole_id":id,
    "status":status,
    "ip_Address":"1233"
  }
  this.ngxService.start();
  await(this._api.editRoleStatus(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getRole();
    }else{
      this.openSnackBar(response.message);
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.openSnackBar(error.message);
    this.ngxService.stop();
  }));

}

// delete role status
async deleteRole(id,status){
  let data = {
    "userRole_id":id,
    "isActive":status,
    "ip_Address":"123.123.343"
  }
  this.ngxService.start();
  await(this._api.deleteRole(data).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.getRole();
    }else{
      this.openSnackBar(response.message);
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.openSnackBar(error.message);
    this.ngxService.stop();
  }));

}

  // open add role modal
  openRoleAddModal() {
    const dialogRef = this.dialog.open(RoleAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getRole();
    });
  }

  // open add role modal
  openRoleEditModal(e) {
    const dialogRef = this.dialog.open(RoleEditComponent,{
      data: {
        role: JSON.stringify(e)
      }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getRole();
    });
  }

  //Searching
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleData.filter = filterValue.trim().toLowerCase();
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
export interface PeriodicElement {
  userRole_id:number;
  role_Type: string;
  nouser: number;
  accesslevel: string;
  status: string;
  actionsrequired: number;
}
const ELEMENT_DATA: PeriodicElement[] = [];
