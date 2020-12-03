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
import { ContractsAddComponent } from '../contracts-add/contracts-add.component';
import { AccessServiceService } from 'src/app/service/access-service.service';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/confirm-box/confirm-box.component';
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
// set header column
displayedColumns: string[] = ['position', 'name', 'contractValidity', 'category', 'status', 'Action'];

// set static data for table
dataSource = new MatTableDataSource([]);

// table sorting and pagination
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;
files: File[] = [];
responseData: any = [];
accessPermission:boolean;
constructor(public _access : AccessServiceService, public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
  this.showDoc();
}

// Get Doc List
async showDoc(){
  this.ngxService.start();
  await(this._api.showDoc().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data);
      this.responseData = response.data;
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

select(row){
  for (const item of this.responseData){
    if (item.documentDetail_id === row){
      item.selected = true;
    }else{
      item.selected = false;
    }
  }
  this.dataSource = new MatTableDataSource([...this.responseData]);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}


// Update Employee status
async updateDocStatus(id,status){
  this.ngxService.start();
  let formData = {
    documentId:id,
    status:status ,
    ip_Address:'1100'
  }
  await(this._api.docStatusUpdate(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.showDoc();
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

//Delete docs

async deleteDoc(id){
  this.ngxService.start();
  let formData = {
    documentId:id,
    ip_Address:'1100'
  }
  await(this._api.docDelete(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message);
      this.showDoc();
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

// open add Contracts modal
openContractAddModal() {
  const dialogRef = this.dialog.open(ContractsAddComponent, {
    maxWidth: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.showDoc();
  });
}

// Check day is negative or positive
getNegative(number){

  return Math.sign(number);

}

// document download
Download(url) {
  (document.getElementById('my_iframe') as HTMLImageElement ).src = url;
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
      this.deleteDoc(id);
    }
  });
}

}
