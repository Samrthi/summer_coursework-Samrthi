import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { LoginComponent } from './login/login.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import {StorageService} from "./storage.service";
import {MaterialModule} from "./material/material.module";
import {AuthService} from "./auth.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CandidateProfileComponent,
    EmployerProfileComponent,
    JobListingComponent,
    LoginComponent,
    CandidateListingComponent,
    CandidateListComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    StorageService,
    AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
