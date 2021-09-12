import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-createtache',
  templateUrl: './createtache.component.html',
  styleUrls: ['./createtache.component.css']
})
export class CreatetacheComponent implements OnInit {

  form!: FormGroup;
  id: any;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.form = this.fb.group({ 
      nom: ['', Validators.required], 
      description: ['', Validators.required], 
      date: ['', Validators.required], 
      id_projet: [this.id], 
    });
  }

  createtache() {
    let b = this.form.value 
    this._api.postTypeRequest('createtache', b).subscribe((res: any) => {
    this.router.navigate(['/project', this.id])
    }, err => {
    console.log(err)
    });
  }

}
