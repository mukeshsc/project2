import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { environment } from '../../../../environments/environment';

import * as _moment from 'moment';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AccessServiceService } from 'src/app/service/access-service.service';

@Component({
  selector: 'app-detail-survey',
  templateUrl: './detail-survey.component.html',
  styleUrls: ['./detail-survey.component.scss']
})
export class DetailSurveyComponent implements OnInit {
// set header column
displayedColumns: string[] = ['profile_picture', 'name', 'email',  'answer', 'action'];

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
  graphData:any

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
    this.graphData = JSON.stringify({label:['Agree','Disagree','Confused'],percentage:[50,35,15],colors:['#15C1DC','#FF6384','#C86CE6']})
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


}
