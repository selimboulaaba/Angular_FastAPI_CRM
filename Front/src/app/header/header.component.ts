import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string = 'assets/img/logo.png'
  logout: string = 'assets/img/logout.png'
  user: string = 'assets/img/user.png'
  email: any;
  position: any;
  ad: any;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {  
  }

  isAdmin() {
    if (!this.authService.getToken() || sessionStorage.getItem("position")=='admin') {
      return false;
    } else {
      return true;
    }
  }
  isLoggedIn() {
    if (!this.authService.getToken()) {
      return false;
    } else {
      return true;
    }
  }

  signout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['signin']);
  }
  account() {
    this.email = sessionStorage.getItem("email");
    this.position = sessionStorage.getItem("position");
    this.router.navigate(['account', this.email, this.position]);
  }

}
