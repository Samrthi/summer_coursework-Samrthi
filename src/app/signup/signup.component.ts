import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  signupForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
        Validators.required
    ]),
    email: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      // Validators.minLength(8)
    ])
  });

  constructor(
      private auth: AuthService,
      private router: Router
  ) { }

  get name(): string | null {
    return this.signupForm.get('name')?.value
  }

  get email(): string | null {
    return this.signupForm.get('email')?.value
  }

  get password(): string | null {
    return this.signupForm.get('password')?.value
  }

  signUp() {
    // this.auth.loggedIn().subscribe(res => {
    //   // @ts-ignore
    //   if (res["logged_in"]) {
    //     this.auth.logout().subscribe()
    //   }
    // })

    if (this.name && this.email && this.password) {
      this.auth.signup(this.name, this.email, this.password).subscribe(res => {
        this.router.navigate(['/login'])
      })
      // show fail
      // show success by navigating to next page
    } else {
      // notify user of error -> something went wrong
    }
  }
}
