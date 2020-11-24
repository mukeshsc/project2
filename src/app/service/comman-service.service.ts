import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  token:any;
  constructor(	private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

   // fileUpload

  uploadDoc(file: File) {
    console.log(file);
    const fileData: FormData = new FormData();
    fileData.append('file', file);

		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}api/v1/hrAdmin/uploadEventIcon`,fileData, {headers}).pipe(map(res => <any>res));
  }

  //  Setting security udpate
   resetPassword(formData) {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}resetPassword`,formData, {headers}).pipe(map(res => <any>res));
  }

  // setting faq
  faq() {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyFaq`,{}, {headers}).pipe(map(res => <any>res));
  }

  // setting privacy policy
  privacyPolicy() {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyPrivacyPolicy`,{}, {headers}).pipe(map(res => <any>res));
  }

  // setting get theme
  getTheme() {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}companyShowTheme`, {headers}).pipe(map(res => <any>res));
  }

  // setting privacy policy
  updateTheme(formData) {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyUpdateTheme`,formData, {headers}).pipe(map(res => <any>res));
  }

  // setting get smtp
  getSmtp() {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}companyShowSMTP`, {headers}).pipe(map(res => <any>res));
  }

  // Event get leave type
  getleaveType() {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}leaveType `, {headers}).pipe(map(res => <any>res));
  }

  // Event get
  getEvent() {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});

    return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}companyShowCalendarEvent `, {headers}).pipe(map(res => <any>res));
  }
  // Event get
  addEvent(formData) {
		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyAddCalendarEvent `,formData, {headers}).pipe(map(res => <any>res));
  }

  // Event edit
  editEvent(formData){

		let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
		});
		return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyUpdateCalendarEvent `,formData, {headers}).pipe(map(res => <any>res));
  }



  // Role get
  getRole(){
    let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.token
     });
     return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showRole `, {headers}).pipe(map(res => <any>res));
   }

   // Role add
   addRole(formData){
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.token
     });
     return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addRole `,formData, {headers}).pipe(map(res => <any>res));
   }

   // Role edit
   editRole(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}editRole `,formData, {headers}).pipe(map(res => <any>res));
 }

 // update role status
 editRoleStatus(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}statusRole `,formData, {headers}).pipe(map(res => <any>res));
 }

 // delete role
 deleteRole(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteRole `,formData, {headers}).pipe(map(res => <any>res));
 }


// Add subAdmin
addEmployee(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addEmployee`,formData, {headers}).pipe(map(res => <any>res));
}

// get Employee list
getEmployee(){
 let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': this.token
 });
 return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showEmployee `, {headers}).pipe(map(res => <any>res));
}


// update Employee
updateEmployee(formData){
 let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': this.token
 });
 return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}editEmployee `,formData, {headers}).pipe(map(res => <any>res));
}

deleteEmployee(formData){
 let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': this.token
 });
 return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteEmployee `,formData, {headers}).pipe(map(res => <any>res));
}

// employee status update
updateEmployeeStatus(formData){
 let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': this.token
 });
 return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}statusEmployee`,formData, {headers}).pipe(map(res => <any>res));
}

}
