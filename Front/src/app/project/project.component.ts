import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  edit: string = 'assets/img/edit.png'
  add: string = 'assets/img/add.png'
  project: any;
  url = 'http://127.0.0.1:8000/tache';
  urlcheck = 'http://127.0.0.1:8000/status';
  urlreview = 'http://127.0.0.1:8000/review';
  taches: any;
  id_project: any;
  dev: any;
  cl: any;
  t: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let id = Number(routeParams.get('id'));
    let projects = JSON.parse(window.localStorage.getItem('projects') || '{}');
    for (let i of projects) {
      if (i.id == id) {
        this.project = i;
      }
    }
    this.id_project = id;
    this.dev = this.project.developper.split(" ");
    this.cl = this.project.client.split(" ");

    let param = new HttpParams().set('id', id);
    this.http.get(this.url, {params: param})
    .toPromise().then((data) => {
      localStorage.setItem('taches', JSON.stringify(data));
      this.taches = data;
      });
  }

  positionchef() {
    if (sessionStorage.getItem('position') == 'chef') {
      return true;
    }else {
      return false;
    }
  }
  positiondev() {
    if (sessionStorage.getItem('position') == 'developper') {
      return true;
    }else {
      return false;
    }
  }
  positionclient() {
    if (sessionStorage.getItem('position') == 'client') {
      return true;
    }else {
      return false;
    }
  }

  checked(s: any) {
    if (s == 1) {
      return true
    }else {
      return false;
    }
  }

  check(s: any) {
    for (let i of this.taches) {
      if (i.id == s) {
        this.t = i;
      }
    }
    if (this.t.status == 1) {
      this.t.status = 0
    }else {
      this.t.status = 1
    }
    this.http.post(this.urlcheck, {
      id_projet: this.project.id,
      id: this.t.id,
      status: this.t.status,
    }).toPromise()
  }

  review(s: any) {
    for (let i of this.taches) {
      if (i.id == s) {
        this.t = i;
      }
    }
    this.http.post(this.urlreview, {
      id: s,
      review: (<HTMLInputElement>document.getElementById(this.t.id)).innerText,
    }).toPromise()
  }

}
