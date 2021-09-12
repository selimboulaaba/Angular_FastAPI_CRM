import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  form !: FormGroup;
  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    private router: Router,) {
   }

  ngOnInit(): void {
    
    this.form = this.fb.group({ 
      nom: ['', Validators.required], 
      description: ['', Validators.required], 
      chef: [''],
      developper: ['', Validators.required], 
      client: ['', Validators.required], 
      date:['', Validators.required], 
    }); 
  }

  create() {
    let b = this.form.value 
    b.chef = sessionStorage.getItem('email');
    this._api.postTypeRequest('createprojet', b).subscribe((res: any) => {
      this.router.navigate(['home'])
    }, err => {
      console.log(err)
    });
  }
  
}
