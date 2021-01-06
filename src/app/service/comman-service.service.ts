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

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
		return this.http.post(`${environment.apiBaseUrl}api/v1/hrAdmin/uploadEventIcon`,fileData, {headers}).pipe(map(res => <any>res));
  }

  // upload theme doc
  uploadThemeDoc(file: File,folder) {
    console.log(file);
    const fileData: FormData = new FormData();
    fileData.append('file', file);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
		return this.http.post(`${environment.apiBaseUrl}api/v1/hrAdmin/companyThemeUpload?theme_Folder=${folder}`,fileData, {headers}).pipe(map(res => <any>res));
  }

   // upload document

   uploadDocDoc(file: File) {
    console.log(file);
    const fileData: FormData = new FormData();
    fileData.append('file', file);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
		return this.http.post(`${environment.apiBaseUrl}api/v1/hrAdmin/documentUpload`,fileData, {headers}).pipe(map(res => <any>res));
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

uploadEmployeeCsv(formData,param){
  console.log(formData)
  const fileData: FormData = new FormData();
  fileData.append('', formData);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}csvFileUpload?company_id=${param.company_id}&ip_Address=${param.ip}&userID=1`,fileData, {headers}).pipe(map(res => <any>res));
}

// get access modules list
accessModuleList(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}api/v1/superAdmin/accessModuleList `,formData, {headers}).pipe(map(res => <any>res));
}

// get access module by role

accessDetail(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}accessDetail `,formData, {headers}).pipe(map(res => <any>res));
}

// update access allocation
accessAllocation(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}accessAllocation `,formData, {headers}).pipe(map(res => <any>res));
}

// getting company working day
companyWorkingDay(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}companyWorkingDay `, {headers}).pipe(map(res => <any>res));
 }

 // getting company working day
companyWorkingDaySet(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyWorkingDayUpdate `,formData, {headers}).pipe(map(res => <any>res));
 }

// update smtp detail
smptypDetailUpdate(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}companyUpdateSMTP `,formData, {headers}).pipe(map(res => <any>res));
 }

// get employee select list
showEmployeeName(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showEmployeeName `, {headers}).pipe(map(res => <any>res));
 }

 // add doc
addDoc(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addEmpDocument `,formData, {headers}).pipe(map(res => <any>res));
 }

// show Doc
showDoc(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}showEmployeeDocument `, formData, {headers}).pipe(map(res => <any>res));
 }

 // update doc status
docStatusUpdate(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}statusEmployeeDocument `,formData, {headers}).pipe(map(res => <any>res));
 }

  // delete Docs
docDelete(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteEmployeeDocument `,formData, {headers}).pipe(map(res => <any>res));
 }

// Show Insurance List
showInsurance(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showInsurance `, {headers}).pipe(map(res => <any>res));
 }

// Insurance add
addInsurance(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addInsurance `,formData, {headers}).pipe(map(res => <any>res));
 }

 // Delete Insurance
deleteInsurance(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteInsurance `,formData, {headers}).pipe(map(res => <any>res));
 }

 // Edit insurance

 editInsurance(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}updateInsurance `,formData, {headers}).pipe(map(res => <any>res));
 }


 //invitation link for employee
 invitationLink(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}invitationLink `,formData, {headers}).pipe(map(res => <any>res));
 }

 // Show Department List
showDepartment(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showDepartment `, {headers}).pipe(map(res => <any>res));
 }

 //add departement
 addDepartment(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addDepartment `,formData, {headers}).pipe(map(res => <any>res));
 }

 //delete departement
 deleteDepartment(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteDepartment `,formData, {headers}).pipe(map(res => <any>res));
 }

  // Show Leave List
showLeave(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showLeave `, {headers}).pipe(map(res => <any>res));
 }

 //add leave
 addLeave(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addLeave `,formData, {headers}).pipe(map(res => <any>res));
 }

 //delete leave
 deleteLeave(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteLeave `,formData, {headers}).pipe(map(res => <any>res));
 }


  // Show Salary breakdown List
showSalary(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showSalary `, {headers}).pipe(map(res => <any>res));
 }

 //add salary type
 addSalary(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addSalary `,formData, {headers}).pipe(map(res => <any>res));
 }

 //delete salary type
 deleteSalary(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteSalary `,formData, {headers}).pipe(map(res => <any>res));
 }



  // Show Holiday List
showHoliday(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showHoliday `, {headers}).pipe(map(res => <any>res));
 }

 //add holiday
 addHoliday(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addHoliday `,formData, {headers}).pipe(map(res => <any>res));
 }

 //delete holiday
 deleteHoliday(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteHoliday `,formData, {headers}).pipe(map(res => <any>res));
 }


  // Show Doc type List
showDocType(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}showDocumentType `, {headers}).pipe(map(res => <any>res));
 }

 //add Doc Type
 addDocType(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addDocumentType `,formData, {headers}).pipe(map(res => <any>res));
 }

 //delete doc type
 deleteDocType(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}deleteDocumentType `,formData, {headers}).pipe(map(res => <any>res));
 }

 // test email
 testEmail(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}testmailSMTP `,formData, {headers}).pipe(map(res => <any>res));
 }



  // get subAdmin list
  getSubAdmin(){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}subAdminHrList `, {headers}).pipe(map(res => <any>res));
  }


  // update sub admin
  updateSubAdminStatus(formData){
  let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token
  });
  return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}profileStatus `,formData, {headers}).pipe(map(res => <any>res));
  }

  // employee notification for doucment related
  notifyUser(formData){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
      });
      return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}employeeNotification `,formData, {headers}).pipe(map(res => <any>res));
  }
  // employee missing doc list
  missingDoc(formData){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
      });
      return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}employeeDocMissingList `,formData, {headers}).pipe(map(res => <any>res));
  }

  // download sample csv
  getSampleCsv(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}csvColumn`, {headers}).pipe(map(res => <any>res));
    }
  //get leave data
  getLeave(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}showLeaveEmployeeList`, formData,{headers}).pipe(map(res => <any>res));
  }

  // manage leave
  modifyEmployeeleave(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}modifyEmployeeleave`, formData,{headers}).pipe(map(res => <any>res));
  }

  //Accept reject leave request
  requestEmployeeleave(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}requestEmployeeleave`, formData,{headers}).pipe(map(res => <any>res));
  }


  //manage leave balance
  manageEmployeeleaveBalance(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}manageEmployeeleaveBalance`, formData,{headers}).pipe(map(res => <any>res));
  }

  //add leave
  addLeaveEmployee(formData){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}addLeaveEmployee`, formData,{headers}).pipe(map(res => <any>res));
  }


  //doucment type list
  documentTypeList(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token
    });
    return this.http.get(`${environment.apiBaseUrl}${environment.apiPath}documentTypeList`, {headers}).pipe(map(res => <any>res));
    }


}


