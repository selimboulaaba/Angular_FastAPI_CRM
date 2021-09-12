import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.form = this.fb.group({ 
      email: ['', Validators.required], 
      password:['', Validators.required] 
    }); 
  }

  login(){ 
    let b = this.form.value 
    this._api.postTypeRequest('signin', b).subscribe((res: any) => {
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
        this.router.navigate(['home']);
        sessionStorage.setItem('email', b.email);
        sessionStorage.setItem('position', res.position)
      }
    }, err => {
      console.log(err)
    });
  }
}
