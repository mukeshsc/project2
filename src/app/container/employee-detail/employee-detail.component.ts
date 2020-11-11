import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  skills: Skill[] = [
    {name: 'skillname'},
    {name: 'skillname medium'},
    {name: 'skillname'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
    {name: 'skillname'},
    {name: 'skillname medium'},
    {name: 'skillname'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];

  drop(event: CdkDragDrop<Skill[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
}
export interface Skill {
  name: string;
}
