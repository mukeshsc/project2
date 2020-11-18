import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output('toggleMenu') toggelMenu: EventEmitter<any> = new EventEmitter();
  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  toggelChild(): void{
    this.toggelMenu.emit();
  }
  logout(){
    localStorage.setItem('userData', undefined);
    localStorage.setItem('token', undefined)
    this.router.navigate(['/login']);
  }
}