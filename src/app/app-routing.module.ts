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
import {AuthGuard} from "./auth.guard";
import { JobListComponent } from './job-list/job-list.component';


// if everything goes as planned
// the auth guard shouldn't be necessary
// as users shouldn't end up on pages when they're logged in
// but just in case, it's there

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'choose-profile', component: CreateProfileComponent, canActivate: [AuthGuard]},
  { path: 'candidate-profile',component: CandidateProfileComponent, canActivate: [AuthGuard] },
  { path: 'candidates/:type',component: CandidateListComponent, canActivate: [AuthGuard] },
  { path: 'candidate',component: CandidateListingComponent, canActivate: [AuthGuard] },
  { path: 'employer-profile', component: EmployerProfileComponent, canActivate: [AuthGuard] },
  { path: 'job-list/:type',component: JobListComponent, canActivate: [AuthGuard] },

  { path: 'unauthenticated', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }








