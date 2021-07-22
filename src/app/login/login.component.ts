import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../notification.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(
      private auth: AuthService,
      private router: Router,
      private notificationService: NotificationService
  ) {}

  get email(): string | null {
    if (this.loginForm.get('email')) {
      return this.loginForm.get('email')?.value.toLowerCase()
    }
    return null
  }

  get password(): string | null {
    if (this.loginForm.get('password')) {
      return this.loginForm.get('password')?.value
    }
    return null
  }

  signIn() {
    this.auth.loggedIn().subscribe(res => {
      if(res["logged_in"]) {
        this.notificationService.error$.next("You are already logged in, please log out before attempting to log in with a different account")
      }
    })

    if (this.email && this.password) {
      this.auth.login(this.email, this.password).subscribe(res => {
        if (res["match"]) {
          if (res["profile"].profile_type == "candidate") {
            this.router.navigate(['/candidate-profile'])
          } else if (res["profile"].profile_type == "employer") {
            this.router.navigate(['/employer-profile'])
          } else {
            this.router.navigate(['/choose-profile'])
          }
        }
      })
    }
  }
}
