import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url = 'http://127.0.0.1:8000/home';
  projects : any;
  jide: any;
  constructor (private http: HttpClient) {

   }
   readonly = true;
  ngOnInit(): void {
    this.jide = 'false';
    let email = sessionStorage.getItem('email');
    let param = new HttpParams().set('email', sessionStorage.getItem('email') || '{}');
    this.http.get(this.url, {params: param})
    .toPromise().then((data) => {
      localStorage.setItem('projects', JSON.stringify(data));
      this.projects = data;
      });
  }

  positionchef() {
    return sessionStorage.getItem('position') == 'chef'
  }
  positionadmin() {
    return sessionStorage.getItem('position') == 'admin'
  }

  check(s: any) {
    if (s == 1) {
      return true
    }else {
      return false
    }
  }

}
