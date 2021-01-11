import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { PayslipOneComponent } from '../payslip-one/payslip-one.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payslip-generate',
  templateUrl: './payslip-generate.component.html',
  styleUrls: ['./payslip-generate.component.scss']
})
export class PayslipGenerateComponent implements OnInit {
  @ViewChild(PayslipOneComponent) payslipeone:PayslipOneComponent;

  @ViewChild('screen') screen: ElementRef;
  data={
    address:true,
    department:true,
    designation:true,
    passport:true,
    template:true,
    count:0
  }
  employeeData :any;
  responseData:any = [];
  salarySlipId = 1000;
  constructor(public router:Router, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPayslipId()
    this.getList()
    this.getEmployeeList()
  }


  //Get last payslip id
  async getPayslipId(){
    this.ngxService.start();
    await(this._api.showLastPaySlipId().subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.salarySlipId = parseInt(response.data)
      }else{
      }
      console.log(res);
    }, err => {
      const error = err.error;
      this.ngxService.stop();
    }));
  }

  // Get compansation List
  async getList(){
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
async getEmployeeList(){
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
        let salAr = [];
        if(item.salaryBalance != null){
          let sal = JSON.parse(item.salaryBalance)
          for(let i =0;i< sal.length;i++){
            for (var key in sal[i]) {
              salAr.push({label:key,value:sal[i][key]})
              total+= parseInt(sal[i][key]);
            }
          }
        }

        item['salary'] = total;
        item['salaryArray'] = salAr;
      }
    }else{
    }
    console.log(res);

  }, err => {
    const error = err.error;
    this.ngxService.stop();
  }));

}
async generateSlip(){

  this.ngxService.start();
  if(this.responseData){
    for(let item of this.responseData){
      let userDetail = [];
      this.salarySlipId+= 1;
      let name = item.first_name+' '+item.last_name;
      userDetail.push({key:'name',value:name})
      userDetail.push({key:'dateOfJoining',value:item.employee_joiningDate})
      this.data.department && userDetail.push({key:'department',value:item.department})
      this.data.designation && userDetail.push({key:'designation',value:item.designation})
      this.data.address && userDetail.push({key:'workLocation',value:''})
      this.data.passport && userDetail.push({key:'passport',value:item.passport})
      let obj = {
        "userId":"2",
        "userDetail":userDetail,
        "userEarning":item.salaryArray,
        "userDeduction":[],
        "paySlipId":this.salarySlipId,
        "netSalary":item.salary,
        "salaryDate":moment().format('MM-DD-YYYY'),
        "department":item.department,
        "ip_Address":"12.32.33.22",
        "companyId":JSON.parse(localStorage.getItem('userData')).company_id,
        "departmentID":"1",
        "paySlipImage":await html2canvas(this.screen.nativeElement).then(canvas => {
          return canvas.toDataURL();
        })
      }
      console.log(obj.paySlipImage)
      await(this._api.addPatSlip(obj).subscribe(res => {

        const response: any = res;
        if (response.success == true){
          this.payslipeone.getCount();
        }else{
          this.openErrrorSnackBar(response.msg)
          return;
        }
        console.log(res);
      }, err => {
        const error = err.error;

        this.ngxService.stop();
      }));
    }

  }
  this.openSnackBar('SalarySlip Generated successfully');
  this.ngxService.stop();
  this.router.navigate(['/employee-salary'])
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
