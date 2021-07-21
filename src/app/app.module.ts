import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent, PopupComponent} from './app.component';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateProfileComponent } from './create-profile/create-profile.component';
import {EditProfileDialogComponent} from "./candidate-profile/edit-profile-dialog.component";
import {ErrorInterceptor} from "./error.interceptor";
import {NewJobDialogComponent} from "./employer-profile/new-job-dialog.component";
import { JobListComponent } from './job-list/job-list.component';
import { EditJobDialogComponent } from './job-listing/edit-job-dialog.component';

@NgModule({
  entryComponents: [
    EditProfileDialogComponent
  ],
  declarations: [
    AppComponent,
    CandidateProfileComponent,
    EmployerProfileComponent,
    JobListingComponent,
    LoginComponent,
    CandidateListingComponent,
    CandidateListComponent,
    SignupComponent,
    CreateProfileComponent,
    EditProfileDialogComponent,
    PopupComponent,
    NewJobDialogComponent,
    JobListComponent,
    EditJobDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
