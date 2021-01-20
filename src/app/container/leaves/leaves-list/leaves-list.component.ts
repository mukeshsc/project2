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
import { LeaveFilterComponent } from '../leave-filter/leave-filter.component';
import * as moment from 'moment';
import { ManageLeavesComponent } from '../manage-leaves/manage-leaves.component';
import { LeaveAddComponent } from '../leave-add/leave-add.component';
import { EmployeeLeaveManageComponent } from '../employee-leave-manage/employee-leave-manage.component';
@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent implements OnInit {
// set header column
displayedColumns: string[] = ['profile_picture', 'name', 'email', 'department','leave_From', 'is_leave', 'action'];

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
  "companyId":"",
  "userId":"",
  "employee":"",
  "department":"",
  "byWhich":{"startDate":'',"endDate":''}
}

constructor(public _access:AccessServiceService, public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.formData.companyId = JSON.parse(localStorage.getItem('userData')).company_id;
//getting access permission
  this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);
  this.getList();
}

// Get Leave List
async getList(){
this.ngxService.start();
if(this.formData.byWhich.startDate != ''){

  this.formData.byWhich = {startDate:moment(this.formData.byWhich.startDate).format('YYYY-MM-DD'),endDate:moment(this.formData.byWhich.endDate).format('YYYY-MM-DD')}
}
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




// open filter modal
openManageLeaveModal(id,leaveBalance) {
  const dialogRef = this.dialog.open(EmployeeLeaveManageComponent, {
    width:'50%',
    data: {
      userId: id,
      leaveBalance:JSON.stringify(leaveBalance)
    }
   });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.getList()
  });
}



// open filter modal
openAddLeaveModal() {
  const dialogRef = this.dialog.open(LeaveAddComponent, {
    width:'50%',
   });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.getList()
  });
}

// open filter modal
openFilterModal() {
  const dialogRef = this.dialog.open(LeaveFilterComponent, {
    width:'50%',
    data: {
      leaveFilter: JSON.stringify(this.formData)
    }});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.formData = JSON.parse(result);
    this.getList()
  });
}


// open modify leave modal
openModifyModal(e) {
  const dialogRef = this.dialog.open(ManageLeavesComponent, {
    width:'50%',
    data: {
      leaveData: JSON.stringify(e)
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
// date formating
formatDate(date){
  return moment(date).format('DD-MM-YYYY')
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
  this.download_csv(csv.join('\n'), 'Leave-List.csv');
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
