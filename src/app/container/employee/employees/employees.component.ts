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
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { ConfirmBoxComponent, ConfirmDialogModel } from 'src/app/confirm-box/confirm-box.component';
import { CsvUploadComponent } from '../csv-upload/csv-upload.component';
import { AccessServiceService } from 'src/app/service/access-service.service';
import { FilterComponent } from '../filter/filter.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  // set header column
  displayedColumns: string[] = ['position', 'name', 'email', 'designation', 'id', 'status', 'action'];

  //set static data for table
  dataSource = new MatTableDataSource([]);

  // table sorting and pagination
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  responseData:any = [];
  csvFile:any = '';
  accessPermission:boolean;
  constructor(public _access:AccessServiceService, public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
//getting access permission
    this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
    this.getList();
    this.getSampleCsv()
  }

 // Get Employee List
 async getList(){
  this.ngxService.start();
  await(this._api.getEmployee().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data);
      this.responseData = response.data;
      const arr = [];
      for (const item of response.data){
        const obj = {position: `${environment.apiBaseUrl}${item.profile_picture}`, name: item.first_name + ' ' + item.last_name, email: item.email, designation: item.designation, status: item.status,id:item.user_id,};
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

  // open add Employee modal
  openSubAddModal() {
    const dialogRef = this.dialog.open(EmployeeAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getList()
    });
  }


  // open filter modal
  openfilterModal() {
    const dialogRef = this.dialog.open(FilterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getList()
    });
  }

  // open add Employee modal
  openSubEditModal(e) {
    let data  = this.responseData.filter(item => e.id == item.user_id);
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      data: {
        employee: JSON.stringify(data[0])
      }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getList()
    });
  }

  uploadCsv(){
    const dialogRef = this.dialog.open(CsvUploadComponent,{
      maxWidth: '500px',
    });

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

// Download list in CSV
export_table_to_csv() {
  this.ngxService.start();
  const html = document.getElementById('csvTable');
  let csv = [];
  let rows = html.querySelectorAll('table tr');

  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll('td, th');

    for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].textContent);
    }

    csv.push(row.join(','));
  }

  // Download CSV
  this.download_csv(csv.join('\n'), 'Employee-List.csv');
}


// Download list in CSV
sampleCsv() {
  this.ngxService.start();
  const html = document.getElementById('sampleCsv');
  let csv = [];
  let rows = html.querySelectorAll('table tr');

  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll('td, th');

    for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].textContent);
    }

    csv.push(row.join(','));
  }

  // Download CSV
  this.download_csv(csv.join('\n'), 'Sample.csv');
}

download_csv(csv, filename) {
  let csvFile;
  let downloadLink;

  // CSV FILE
  csvFile = new Blob([csv], {type: 'text/csv'});

  // Download link
  downloadLink = document.createElement('a');

  // File name
  downloadLink.download = filename;

  // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Make sure that the link is not displayed
  downloadLink.style.display = 'none';

  // Add the link to your DOM
  document.body.appendChild(downloadLink);

  // Lanzamos
  downloadLink.click();
  this.ngxService.stop();
}

}
