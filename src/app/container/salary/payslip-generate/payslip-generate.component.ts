import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payslip-generate',
  templateUrl: './payslip-generate.component.html',
  styleUrls: ['./payslip-generate.component.scss']
})
export class PayslipGenerateComponent implements OnInit {


  @ViewChild('screen') screen: ElementRef;
  data={
    address:true,
    department:true,
    designation:true,
    passport:true,
    template:true
  }
  responseData:any = [];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getList()
    this.getEmployeeList()
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
      this.responseData = response.data;
      for(let item of this.responseData){
        let total = 0
        if(item.salaryBalance != null){
          let sal = JSON.parse(item.salaryBalance)
          for(let i =0;i< sal.length;i++){
            for (var key in sal[i]) {
              total+= parseInt(sal[i][key]);
            }
          }
        }

        item['salary'] = total;
      }
    }else{
    }
    console.log(res);
  }, err => {
    const error = err.error;
    this.ngxService.stop();
  }));

  }

generatePDF() {
  html2canvas(this.screen.nativeElement).then(canvas => {
    console.log(canvas.toDataURL());
  });
}
}
