import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {Candidate} from "./candidate";
import {Employer} from "./employer";

@Injectable()
export class AuthService {
  public loggedIn = false;

  constructor(
      private http: HttpClient,
      private router: Router,
      private storage: StorageService,
      public auth: AuthService
  ) {}

  // @ts-ignore
  login(email: string, password: string): Observable<unknown> {
    let credentials = {
      email: email,
      password: password
    }
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post('/api/login', credentials, options)
  }

  // @ts-ignore
  logout(): Observable<unknown> {
    this.loggedIn = false;
    this.router.navigate(['/login'])
    this.http.get('/api/logout').subscribe(res => {
        if (res == 200) {
          this.auth.loggedIn = false
        }
    })
  }

  signup(name: string, email: string, password: string): Observable<unknown> {
    let account = {
      name: name,
      email: email,
      password: password
    }
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/add-user', account, options)
  }

  deleteUser(): Observable<unknown>{
    return this.http.delete('api/delete-user/')
  }

  getName(): Observable<unknown> {
    return this.http.get('api/get-name')
  }


  addProfile(profile_type: string): Observable<unknown> {
    // @ts-ignore
    this.http.get('api/has-profile').subscribe(res => {
      // @ts-ignore
      let has_profile = res["has_profile"]

      if (has_profile) {
        // @ts-ignore
        if (res['profile_type'] == "candidate") {
          this.router.navigate(['/candidate-profile'])
        } else { // @ts-ignore
          if (res['profile_type'] == "employer") {
            this.router.navigate(['/employer-profile'])
          }
        }
        return new Observable<unknown>()
      }
    })

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
