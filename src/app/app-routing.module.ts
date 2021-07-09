import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {CandidateProfileComponent} from "./candidate-profile/candidate-profile.component";
import {AuthGuard} from "./auth.guard";
import {CandidateListComponent} from "./candidate-list/candidate-list.component";
import {CandidateListingComponent} from "./candidate-listing/candidate-listing.component";
import {Employer} from "./employer";
import {JobListingComponent} from "./job-listing/job-listing.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'candidate-profile',
    component: CandidateProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'candidates',
    component: CandidateListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'candidate',
    component: CandidateListingComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'employer-profile',
    component: Employer,
    canActivate: [AuthGuard]
  },

  {
    path: 'job-listing',
    component: JobListingComponent,
    canActivate: [AuthGuard]
  },
  { path: 'unauthenticated', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }








