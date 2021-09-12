import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  url = 'http://127.0.0.1:8000/account';
  account: any;
  add: any;
  entre: any;
  spe: any;
  email: any;
  position: any;
  p: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public fb: FormBuilder,
  ) {
    route.params.subscribe(val => {
      const routeParams = this.route.snapshot.paramMap;
      this.email = routeParams.get('email');
      this.p = routeParams.get('position');
      let param = new HttpParams()
        .set('email', this.email || '{}')
        .set('position', this.p || '{}');
      this.http.get(this.url, { params: param })
        .toPromise().then((data) => {
          this.account = data;
        });
      this.position = this.p.charAt(0).toUpperCase() + this.p.slice(1)
    });
  }

  ngOnInit(): void {

  }

  disablepass() {
    if (sessionStorage.getItem('position') == 'admin') {
      return true
    } else {
      return (this.email == sessionStorage.getItem('email')) && (this.p == sessionStorage.getItem('position'))
    }
  }

  admin() {
    return sessionStorage.getItem('position') == 'admin'
  }
  chef() {
    if (this.p == 'chef') {
      return true;
    } else {
      return false;
    }
  }
  dev() {
    if (this.p == 'developper') {
      return true;
    } else {
      return false;
    }
  }
  client() {
    if (this.p == 'client') {
      return true;
    } else {
      return false;
    }
  }

  modifier() {
    if ((<HTMLInputElement>document.getElementById("entre")) == null) {
      this.entre = '';
    } else {
      this.entre = (<HTMLInputElement>document.getElementById("entre")).value;
    }
    if ((<HTMLInputElement>document.getElementById("spe")) == null) {
      this.spe = '';
    } else {
      this.spe = (<HTMLInputElement>document.getElementById("spe")).value;
    }
    this.http.post(this.url, {
      position: sessionStorage.getItem('position'),
      adresse: (<HTMLInputElement>document.getElementById("add")).value,
      email_old: sessionStorage.getItem('email'),
      email_new: (<HTMLInputElement>document.getElementById("mail")).value,
      numero: (<HTMLInputElement>document.getElementById("num")).value,
      password: (<HTMLInputElement>document.getElementById("pass")).value,
      specialite: this.spe,
      entreprise: this.entre,
    }).toPromise().then((data: any) => {
      if (data) {
        sessionStorage.setItem('email', data[0])
        this.router.navigate(['account', data[0], this.p]);
      }
    })

  }

}
