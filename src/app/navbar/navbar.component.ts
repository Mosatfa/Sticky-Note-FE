import { Component, OnInit } from '@angular/core';
import { NavbarTogglerService } from '../navbar-toggler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = false;
  // open & close sideNav
  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;  
    this._NavbarTogglerService.toggle.next(this.isCollapsed)
  }
  constructor(private _NavbarTogglerService:NavbarTogglerService) { }

  ngOnInit(): void {
  }

}
