import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {StorageService} from "./storage.service";
import {Candidate} from "./candidate";
import {Employer} from "./employer";

@Injectable()
export class AuthService {
  constructor(
      private http: HttpClient,
      private router: Router,
      private storage: StorageService,
  ) {}

  loggedIn(): Observable<any> {
    return this.http.get('/api/logged-in')
  }

  login(email: string, password: string) {
    let credentials = {
      email: email,
      password: password
    }
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post('/api/login', credentials, options)
  }

  logout(): void {
    this.router.navigate(['/login'])
    this.http.get('/api/logout').subscribe()
  }

  signup(name: string, email: string, password: string) {
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

  deleteUser(){
    return this.http.delete('api/delete-user')
  }

  getName() {
    return this.http.get('api/get-name')
  }


  addProfile(profile_type: string) {
    // in case the user already has a profile, this should not occur
    this.http.get('api/has-profile').subscribe(res => {
      let has_profile = res["has_profile"]

      if (has_profile) {
        if (res['profile_type'] == "candidate") {
          this.router.navigate(['/candidate-profile'])
          if (res['profile_type'] == "employer") {
            this.router.navigate(['/employer-profile'])
          }
        }
      }
    })

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let profile = {
      profile_type: profile_type,
      id: null
    }

    this.getName().subscribe(res => {
      if (profile_type == "candidate") {
        this.storage.addCandidate(
            new Candidate(res["name"])
        ).subscribe(res => {
          profile.id = res["profile_id"]
          this.http.put('/api/add-profile', profile, options).subscribe(res => {
            this.router.navigate(['/candidate-profile'])
          })
        })
      } else if (profile_type == "employer") {
        this.storage.addEmployer(
            new Employer(res["name"])
        ).subscribe(res => {
          profile.id = res["profile_id"]
          this.http.put('/api/add-profile', profile, options).subscribe(res => {
            this.router.navigate(['/employer-profile'])
          })
        })
      }
    })
  }
}


