import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { CreatetacheComponent } from './createtache/createtache.component';
import { ProjectComponent } from './project/project.component';
import { ModifyprojectComponent } from './modifyproject/modifyproject.component';
import { ModifytacheComponent } from './modifytache/modifytache.component';
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
  { 
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full' 
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account/:email/:position',
    component: AccountComponent,
  },
  {
    path: 'createp',
    component: CreateprojectComponent,
  },
  {
    path: 'createt/:id',
    component: CreatetacheComponent,
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
  },
  {
    path: 'modifyp/:id',
    component: ModifyprojectComponent,
  },
  {
    path: 'modifyt/:idp/:idt',
    component: ModifytacheComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
