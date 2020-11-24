import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonServiceService } from 'src/app/service/comman-service.service';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  files: File[] = [];
  constructor(public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<CsvUploadComponent>) { }

  ngOnInit(): void {
  }

  // onSelect image
  async uploadDoc(event) {
    console.log(event);
    let fileName = (event.addedFiles[0].name).split('.');
    if(fileName[1] == 'csv'){
      this.files = [...event.addedFiles];
      if(event.addedFiles.length > 0){
        this.ngxService.start();
        await(this._api.uploadEmployeeCsv(this.files[0],{company_id:JSON.parse(localStorage.getItem('userData')).company_id,ip:'111',user_id:JSON.parse(localStorage.getItem('userData')).user_id}).subscribe(res => {
          this.ngxService.stop();
          const response: any = res;
          if (response.success == true){
            this.openSnackBar(response.message);
            this.dialogRef.close('Close');
          }else{
            this.openErrrorSnackBar(response.message);
          }
          console.log(res);
        },err => {
          const error = err.error;
          this.openErrrorSnackBar(error.message);
          this.ngxService.stop();
        }));
      }else{
        this.openErrrorSnackBar('File size is too large');
      }
    }else{
      this.openErrrorSnackBar('This file format is not allowed');
    }

  }

  // onRemove image
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
