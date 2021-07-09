import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { LoginComponent } from './login/login.component';
import { CandidateListingComponent } from './candidate-listing/candidate-listing.component';
import { JobEditorComponent } from './job-editor/job-editor.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { JobListComponent } from './job-list/job-list.component';
import { SignupComponent } from './signup/signup.component';
import { JobComponent } from './job/job.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CandidateProfileComponent,
    EmployerProfileComponent,
    JobListingComponent,
    LoginComponent,
    CandidateListingComponent,
    JobEditorComponent,
    CandidateListComponent,
    JobListComponent,
    SignupComponent,
    JobComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
