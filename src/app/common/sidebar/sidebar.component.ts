import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navs:any = [];
  constructor() { }

  ngOnInit(): void {
    this.navs = [
      {
        icon: 'sentiment_satisfied',
        title: 'Dashboard',
        url: '/'
      }
    ]
  }

}
