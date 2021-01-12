import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  img: string;
}
@Component({
  selector: 'app-payslip-detail',
  templateUrl: './payslip-detail.component.html',
  styleUrls: ['./payslip-detail.component.scss']
})
export class PayslipDetailComponent implements OnInit {
  tempData:any;
  tempNo:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public dialogRef: MatDialogRef<PayslipDetailComponent>) { }

  ngOnInit(): void {
    this.tempData = this.data.img;
  }

}
