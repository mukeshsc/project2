import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData:any;
  @Output('toggleMenu') toggelMenu: EventEmitter<any> = new EventEmitter();
  constructor(public router:Router) {
    this.userData = JSON.parse(localStorage.getItem('userData'))
  }

  ngOnInit(): void {

  }
  toggelChild(): void{
    this.toggelMenu.emit();
  }
  logout(){
    localStorage.removeItem('userData');
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
