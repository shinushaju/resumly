import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'Download Resume',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      route: '/download'
    },
    {
      label: 'My Profile',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: '/myprofile'
    },
    {
      label: 'Settings',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: '/settings'
    },
    {
      label: 'Log in',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      route: '/signin'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
}
