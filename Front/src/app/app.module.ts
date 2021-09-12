import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateprojectComponent } from './createproject/createproject.component';
import { CreatetacheComponent } from './createtache/createtache.component';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { ModifyprojectComponent } from './modifyproject/modifyproject.component';
import { ModifytacheComponent } from './modifytache/modifytache.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor-service.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    CreateprojectComponent,
    CreatetacheComponent,
    ProjectComponent,
    ModifyprojectComponent,
    ModifytacheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
