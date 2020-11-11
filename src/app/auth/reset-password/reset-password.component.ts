import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formData = {
    otp: '',
    newPassword: '',
    confirmPassword:'',
  }
  constructor(public _auth: AuthServiceService, private ngxService: NgxUiLoaderService, private _snackBar: MatSnackBar, public router:Router) { }

  ngOnInit(): void {
  }

  // login api calling
  async reset(){
    this.ngxService.start();
    await(this._auth.resetPassword(this.formData).subscribe(res => {
      this.ngxService.stop();
      const response: any = res;
      if (response.success == true){
        this.openSnackBar(response.message);
        this.router.navigate(['/login']);
      }else{
        this.openSnackBar(response.message);
      }
      console.log(res);
    },err => {
      const error = err.error;
      this.ngxService.stop();
      this.openSnackBar(error.message);
    }));
  }


  // alert message after api response
  openSnackBar(msg) {
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
