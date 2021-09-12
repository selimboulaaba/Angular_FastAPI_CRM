import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form!: any;
  url: any;

  constructor(
    private _api: ApiService,
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({ 
      position: ['', Validators.required], 
      nom: ['', Validators.required], 
      prenom: ['', Validators.required], 
      adresse: ['', Validators.required], 
      email: ['', Validators.required], 
      numero: ['', Validators.required], 
      password: ['', Validators.required],
      specialite: ['', Validators.required],
      entreprise: ['', Validators.required],
      annee: ['', Validators.required],
    });
  }

  chef() {
    return (<HTMLInputElement>document.getElementById("chef")).checked
  }
  dev() {
    return (<HTMLInputElement>document.getElementById("developper")).checked
  }
  client() {
    return (<HTMLInputElement>document.getElementById("client")).checked
  }

  signup() {
    if (this.chef()) {
      this.url = "signupchef"
    }else if (this.dev()) {
      this.url = "signupdev"
    }else if (this.client()) {
      this.url = "signupclient"
    }
    let b = this.form.value 
    this._api.postTypeRequest(this.url, b).subscribe((res: any) => {
    this.router.navigate(['home']);
    }, err => {
      console.log(err)
    });
  }

}
