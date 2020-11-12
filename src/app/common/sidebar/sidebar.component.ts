import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(public router:Router) { }
  pages = [
    {
      title:'Dashboard',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Calendar',
      url:'/calendar',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Chat',
      url:'/chat',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'divider',
      url:'',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Employees',
      url:'/employees',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Roles & access',
      url:'/user-roles',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Documents',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Announcements',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Salary Management',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[
        {
          title:'Employee Salary',
          url:'/employee-salary',
          open:false,
          icon:'stop_circle',
          children:[]
        },
        {
          title:'Payslips',
          url:'/',
          open:false,
          icon:'stop_circle',
          children:[]
        },
      ]
    },
    {
      title:'Surveys',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Reports',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'divider',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Health & Wellness',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Insurance',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Rewards',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'divider',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Company Profile',
      url:'/*',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
    {
      title:'Settings',
      url:'/setting',
      open:false,
      icon:'sentiment_satisfied',
      children:[]
    },
  ]
  ngOnInit(): void {
    for(let item of this.pages){
      if(item.children.length > 0){
        for(let i of item.children){
          if(i.url === this.router.url){
            item.open = true;
          }
        }
      }
    }
  }

}
