import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifyproject',
  templateUrl: './modifyproject.component.html',
  styleUrls: ['./modifyproject.component.css']
})
export class ModifyprojectComponent implements OnInit {

  url = 'http://127.0.0.1:8000/modprojet';
  projects: any
  project: any;
  routeParams: any;
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.routeParams = this.route.snapshot.paramMap;
    this.id = Number(this.routeParams.get('id'));
    this.projects = JSON.parse(window.localStorage.getItem('projects') || '{}');
    for (let i of this.projects) {
      if (i.id == this.id) {
        this.project = i;
      }
    }
  }

  modifier() {
    this.http.post(this.url, {
      id: this.project.id,
      nom: (<HTMLInputElement>document.getElementById("nom")).value,
      description: (<HTMLInputElement>document.getElementById("desc")).value,
      date: (<HTMLInputElement>document.getElementById("date")).value,
      developper: (<HTMLInputElement>document.getElementById("dev")).value,
      client: (<HTMLInputElement>document.getElementById("client")).value,
    }).toPromise().then((data: any) => {
      for (let i of this.projects) {
        if (i.id == this.id) {
          i.nom = (<HTMLInputElement>document.getElementById("nom")).value;
          i.description = (<HTMLInputElement>document.getElementById("desc")).value;
          i.date = (<HTMLInputElement>document.getElementById("date")).value;
          i.developper = (<HTMLInputElement>document.getElementById("dev")).value;
          i.client = (<HTMLInputElement>document.getElementById("client")).value;
        }
      }
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.router.navigate(['project', this.project.id]);
    })
  }

}
