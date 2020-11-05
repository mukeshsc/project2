import { Component,  ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') public drawer: MatDrawer;
  title = 'hrmd';
  showHeader = true;
  toggleMenu(): void{this.drawer.toggle(); }
  constructor(public router: Router){}

}
