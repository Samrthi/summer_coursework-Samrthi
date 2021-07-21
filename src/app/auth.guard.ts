import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private auth: AuthService) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.loggedIn().pipe(
        map(res => {
          if (!res["logged_in"]) {
            console.log('not logged in, access denied');
            this.router.navigate(['unauthenticated']);
          }
          return res["logged_in"]
        }),
        catchError(err => {
          this.router.navigate(['unauthenticated']);
          return of(false)
        }))

  }
}