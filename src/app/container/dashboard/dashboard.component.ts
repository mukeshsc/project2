import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'designation', 'status'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  name: string;
  position: any;
  designation: string;
  status: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: './assets/img/Ellipse_1.png', name: 'Romika gupta', designation: 'Sr. Associate', status: 0},
  {position: './assets/img/Ellipse_1_g.png', name: 'Ryan Sandoval', designation: 'Manager Level 2', status: 1},
  {position: './assets/img/Ellipse_1_gq.png', name: 'Fatima', designation: 'Director Manager', status: 2},
  {position: './assets/img/Ellipse_1_gx.png', name: 'Romika gupta', designation: 'Sr. Associate', status: 0},
  {position: './assets/img/Ellipse_1.png', name: 'Ryan Sandoval', designation: 'Manager Level 2', status: 1},
  {position: './assets/img/Ellipse_1_g.png', name: 'Fatima', designation: 'Director Manager', status: 2},
];
