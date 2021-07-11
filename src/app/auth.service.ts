import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {Candidate} from "./candidate";
import {Employer} from "./employer";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthService {

  constructor(
      private http: HttpClient,
      private router: Router,
      private storage: StorageService,
      private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<unknown> {
    let credentials = {
      email: email,
      password: password
    }
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.cookieService.set("logged_in", "true") // not security related, just for showing logout button
    return this.http.post('/api/login', credentials, options)
  }

  logout(): Observable<unknown> {
    this.cookieService.delete("logged_in")
    this.router.navigate(['/login'])
    return this.http.get('/api/logout')
  }

  signup(email: string, password: string): Observable<unknown> {
    let credentials = {
      email: email,
      password: password
    }
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/add-user', credentials, options)
  }

  deleteUser(): Observable<unknown>{
    return this.http.delete('api/delete-user/')
  }

  addProfile(profile_type: string): Observable<unknown> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let profile = {
      profile_type: profile_type,
      id: null
    }
    if (profile_type == "candidate") {
      this.storage.addCandidate(
          new Candidate("Mystery Candidate")
      ).subscribe(res => {
        // @ts-ignore
        profile.id = res.profile_id
        this.router.navigate(['/candidate-profile'])
        return this.http.put('/api/add-profile', profile, options).subscribe(res => {
          console.log(res)
        })
      })
    } else if (profile_type == "employer") {
      this.storage.addEmployer(
          new Employer("Mystery Employer")
      ).subscribe(res => {
        // @ts-ignore
        profile.id = res.profile_id
        this.router.navigate(['/employer-profile'])
        return this.http.put('/api/add-profile', profile, options).subscribe(res => {
          console.log(res)
        })
      })
    }
    return new Observable<unknown>()
  }

  deleteProfile(id: string, profile_type: string): Observable<unknown> {
    if (profile_type == "candidate") {
      return this.http.delete('api/delete-candidate-profile/' + id)
    } else if (profile_type == "employer") {
      return this.http.delete('api/delete-employer-profile/' + id)
    }

    return new Observable<unknown>()
  }
}
