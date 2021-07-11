import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {CandidateProfileComponent} from "./candidate-profile/candidate-profile.component";
import {CandidateListComponent} from "./candidate-list/candidate-list.component";
import {CandidateListingComponent} from "./candidate-listing/candidate-listing.component";
import {Employer} from "./employer";
import {JobListingComponent} from "./job-listing/job-listing.component";
import {SignupComponent} from "./signup/signup.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'candidate-profile',component: CandidateProfileComponent },
  { path: 'candidates',component: CandidateListComponent },
  { path: 'candidate',component: CandidateListingComponent },
  { path: 'employer-profile',component: Employer },
  { path: 'job-listing',component: JobListingComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }








