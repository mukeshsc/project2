import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonServiceService } from 'src/app/service/comman-service.service';
@Component({
  selector: 'app-payslip-one',
  templateUrl: './payslip-one.component.html',
  styleUrls: ['./payslip-one.component.scss']
})
export class PayslipOneComponent implements OnInit {
  @Input() data:any;
  allData:any;
  responseData:any = [];
  demoData:any;
  salData:any = [];
  currentDate = moment().format('DD MMM YYYY')
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.allData = this.data;
    this.getEmployeeList();
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
        this.demoData = this.responseData[this.responseData.length - 1];
        console.log(this.demoData)
      }else{
      }
      console.log(res);
    }, err => {
      const error = err.error;
      this.ngxService.stop();
    }));

    }
}
