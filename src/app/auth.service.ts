import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http: HttpClient,
      private router: Router) {}

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

  logout(): Observable<unknown> {
    this.router.navigate(['/login'])
    return this.http.get('/api/logout')
  }
}
