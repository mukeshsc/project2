import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userData:any;
  moduleData:any = [];
  constructor(public router:Router) {
    if(localStorage.getItem('userData')){
        this.userData = JSON.parse(localStorage.getItem('userData'))
        this.moduleData = JSON.parse(localStorage.getItem('userData')).moduleAccess;
        console.log(this.moduleData)
      }
  }
  pages = [
    {
      title:'Dashboard',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Calendar',
      url:'/calendar',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Chat',
      url:'/chat',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'divider',
      url:'',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Employees',
      url:'/employees',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Roles & access',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      access:false,
      children:[
        {
          title:'User roles',
          url:'/user-roles',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Access',
          url:'/access',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
      ]
    },
    {
      title:'Documents',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      access:false,
      children:[
        {
          title:'Contracts',
          url:'/contracts',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Ids',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Others',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        }
      ]
    },
    {
      title:'Announcements',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Salary Management',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      access:false,
      children:[
        {
          title:'Employee Salary',
          url:'/employee-salary',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Payslips',
          url:'/payslip',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
      ]
    },
    {
      title:'Surveys',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      access:false,
      children:[
        {
          title:'Active Survey',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Create New',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Initial Survey',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Response & Status',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
      ]
    },
    {
      title:'Reports',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'divider',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Health & Wellness',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Insurance',
      url:'/insurance',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Rewards',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      access:false,
      children:[
        {
          title:'Active Reward',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Create Reward',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Initial Reward',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
        {
          title:'Report',
          url:'/dashboard',
          open:false,
          icon:'stop_circle',
          children:[],
          access:false,
        },
      ]
    },
    {
      title:'divider',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
    },
    {
      title:'Company Profile',
      url:'/dashboard',
      open:false,
      icon:'sentiment_satisfied',
      access:false,
      children:[{
        title:'Profile',
        url:'/dashboard',
        open:false,
        icon:'stop_circle',
        children:[],
        access:false,
      },
      {
        title:'FAQs',
        url:'/dashboard',
        open:false,
        icon:'stop_circle',
        children:[],
        access:false,
      }]
    },
    {
      title:'Settings',
      url:'/setting',
      open:false,
      icon:'sentiment_satisfied',
      children:[],
      access:false,
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
    // for define access for user
    this.getRouteAccess(this.pages,this.moduleData);
  }

  getRouteAccess(page,module){
    for(let item of page){
      for(let mod of module){
        if(mod.name == item.title){
          item.access = mod.read;
          if(mod.children && mod.children.length > 0){
            this.getRouteAccess(item.children,mod.children)
          }
        }
      }
    }
  }

}
