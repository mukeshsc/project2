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

}
