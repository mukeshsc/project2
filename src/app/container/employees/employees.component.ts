import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name','email', 'designation', 'status','action'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }


}
export interface PeriodicElement {
  name: string;
  position: any;
  designation: string;
  email: string;
  status: number;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: './assets/img/Ellipse_1.png', name: 'Romika gupta',email:'romika@gmail.com', designation: 'Sr. Associate', status: 0, action:'Expiring Visa'},
  {position: './assets/img/Ellipse_1_g.png', name: 'Ryan Sandoval',email:'romika@gmail.com', designation: 'Manager Level 2', status: 1, action:'Expiring Visa'},
  {position: './assets/img/Ellipse_1_gq.png', name: 'Fatima',email:'romika@gmail.com', designation: 'Director Manager', status: 2, action:'Expiring Visa'},
  {position: './assets/img/Ellipse_1_gx.png', name: 'Romika gupta',email:'romika@gmail.com', designation: 'Sr. Associate', status: 0, action:'Expiring Visa'},
  {position: './assets/img/Ellipse_1.png', name: 'Ryan Sandoval',email:'romika@gmail.com', designation: 'Manager Level 2', status: 1, action:'Expiring Visa'},
  {position: './assets/img/Ellipse_1_g.png', name: 'Fatima',email:'romika@gmail.com', designation: 'Director Manager', status: 2, action:'Expiring Visa'},
];
