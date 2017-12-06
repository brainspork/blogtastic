import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickOpenNav() {
    let nav = document.getElementsByClassName('main-menu')[0];
    let fade = document.getElementsByClassName('header-nav')[0];
    let body = document.getElementsByTagName('body')[0];
    if(!nav.classList.contains('main-open')) {
      nav.classList.add('main-open');
      fade.classList.add('fade-in');
      body.classList.add('stop-scrolling');
    } else {
      nav.classList.remove('main-open');
      fade.classList.remove('fade-in');
      body.classList.remove('stop-scrolling');
    }
  }

  onLogoutClick() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    return false;
  }
}
