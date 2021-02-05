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
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
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
graphData:any
formData = {
  "companyId":"1",
  "isType":""
}
reportData:any =[];
totalPercent:any;
percentData:any = []
constructor(private sanitizer: DomSanitizer, public _access:AccessServiceService, public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.formData.companyId = JSON.parse(localStorage.getItem('userData')).company_id;
//getting access permission
  this.accessPermission = this._access.getRouteAccess('User roles',JSON.parse(localStorage.getItem('userData')).moduleAccess);

  this.getComapnsationList();
  this.showDepartmentSalary();

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
            if(sal[i][key] != ''){
              console.log(sal[i][key])
              total+= parseInt(sal[i][key]);
            }
          }
        }
      }

      item['salary'] = isNaN(total)?0:total;
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

async GenerateReport(e){
  this.formData.isType = e;
  this.ngxService.start();
  await(this._api.showPaySlipReport(this.formData).subscribe(res => {
    const response: any = res;
    if (response.success == true){
      this.reportData = response.data;
      for(let item of this.reportData){
       item.userDetail = JSON.parse(item.userDetail)

       item.userEarning = JSON.parse(item.userEarning)
      }
      console.log(this.reportData)
      setTimeout(()=>{
        this.sampleCsv()
      },2000)
    }else{
      this.ngxService.stop();
      this.openErrrorSnackBar(response.message)
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.openErrrorSnackBar(error)
    this.ngxService.stop();
  }));
}


async showTemplate(tempNo, user_id){
  let formData = {
    "currentMonth":moment().format('MM'),
    "userID":user_id,
    "isType":"0"
}
  this.ngxService.start();
  await(this._api.payslipMail(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data[0].paySlip_Image)
      const dialogRef = this.dialog.open(PayslipDetailComponent,{
        width:'100%',
        data: {
          img:response.data[0].paySlip_Image
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else{
      this.openErrrorSnackBar(response.message)
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.openErrrorSnackBar(error)
    this.ngxService.stop();
  }));



}

async downloadSlip(tempNo, user_id){
  let formData = {
    "currentMonth":moment().format('MM'),
    "userID":user_id,
    "isType":"0"
}
  this.ngxService.start();
  await(this._api.payslipMail(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data[0].paySlip_Image)
      let imageFile;
      let downloadLink;

      // CSV FILE
      imageFile = new Blob([response.data[0].paySlip_Image], {type: 'image/jpg'});

      // Download link
      downloadLink = document.createElement('a');

      // File name
      downloadLink.download = response.data[0].paySlip_Image;

      // We have to create a link to the file
      downloadLink.href = response.data[0].paySlip_Image;

      // Make sure that the link is not displayed
      downloadLink.style.display = 'none';

      // Add the link to your DOM
      document.body.appendChild(downloadLink);

      // Lanzamos
      downloadLink.click();
      this.ngxService.stop();

    }else{
      this.openErrrorSnackBar(response.message)
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.openErrrorSnackBar(error)
    this.ngxService.stop();
  }));
}

async showDepartmentSalary(){
  this.ngxService.start();
  await(this._api.showDepartmentSalary().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data)
      this.totalPercent = response.total[0];
      this.percentData = response.data;
      let graphdata = {label:[],percentage:[],colors:['#3F51B5','#FFAA00','#F44336','#C86CE6','#FF4081','#15C1DC','#3F5248','#FFAB56','#F44BA2','#C86AA2','#FF41BC','#15C2AC']}
      let count = 0;
      for(let item of this.percentData){
        // graphdata.label.push(item.department)
        let per = (parseInt(item.current) *100)/parseInt(this.totalPercent.total)
        console.log(per)
        graphdata.percentage.push(per)
        item['color'] = graphdata.colors[count]
        count++;
      }
      this.graphData = JSON.stringify(graphdata);
      console.log(this.percentData.length)
      if(this.percentData.length > 0){
        this.getList();
      }
    }else{
      this.openErrrorSnackBar(response.message)
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.openErrrorSnackBar(error)
    this.ngxService.stop();
  }));



}



 // mail pay slip
 async mailPaySlip(user_id){
  let formData = {
    "currentMonth":moment().format('MM'),
    "userID":user_id,
    "isType":"1"
}
  this.ngxService.start();
  await(this._api.payslipMail(formData).subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      this.openSnackBar(response.message)
    }else{
      this.openErrrorSnackBar(response.message)
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.openErrrorSnackBar(error)
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
  this.download_csv(csv.join('\n'), 'SalaryReport.csv');
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

getDate(d){
  return moment(d).format('MM/YYYY')
}

}
