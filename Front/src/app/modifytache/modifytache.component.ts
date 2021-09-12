import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifytache',
  templateUrl: './modifytache.component.html',
  styleUrls: ['./modifytache.component.css']
})
export class ModifytacheComponent implements OnInit {

  url = 'http://127.0.0.1:8000/modtache';
  taches: any;
  tache: any;
  routeParams: any;
  idp: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.routeParams = this.route.snapshot.paramMap;
    this.idp = Number(this.routeParams.get('idp'));
    let idt = Number(this.routeParams.get('idt'));
    this.taches = JSON.parse(window.localStorage.getItem('taches') || '{}');
    for (let i of this.taches) {
      if ((i.id == idt) && (i.id_projet == this.idp)) {
        this.tache = i;
      }
    }
  }

  modifier() {
    this.http.post(this.url, {
      id: this.tache.id,
      nom: (<HTMLInputElement>document.getElementById("nom")).value,
      description: (<HTMLInputElement>document.getElementById("desc")).value,
      date: (<HTMLInputElement>document.getElementById("date")).value,
    }).toPromise().then((data: any) => {
      for (let i of this.taches) {
        if (i.id == this.idp) {
          i.nom = (<HTMLInputElement>document.getElementById("nom")).value;
          i.description = (<HTMLInputElement>document.getElementById("desc")).value;
          i.date = (<HTMLInputElement>document.getElementById("date")).value;
        }
      }
      localStorage.setItem('taches', JSON.stringify(this.taches));
      this.router.navigate(['project', this.idp]); 
    })
  }

}
