import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {CandidateProfileComponent} from "./candidate-profile/candidate-profile.component";
import {CandidateListComponent} from "./candidate-list/candidate-list.component";
import {CandidateListingComponent} from "./candidate-listing/candidate-listing.component";
import {JobListingComponent} from "./job-listing/job-listing.component";
import {SignupComponent} from "./signup/signup.component";
import {CreateProfileComponent} from "./create-profile/create-profile.component";
import {EmployerProfileComponent} from "./employer-profile/employer-profile.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'choose-profile', component: CreateProfileComponent},
  { path: 'candidate-profile',component: CandidateProfileComponent },
  { path: 'candidates',component: CandidateListComponent },
  { path: 'candidate',component: CandidateListingComponent },
  { path: 'employer-profile', component: EmployerProfileComponent },
  { path: 'job-listing',component: JobListingComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }








