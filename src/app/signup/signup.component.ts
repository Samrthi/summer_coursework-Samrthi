import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  signupForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private auth: AuthService) { }

  get email(): string | null {
    if (this.signupForm.get('email')) {
      return this.signupForm.get('email')?.value
    }
    return null
  }

  get password(): string | null {
    if (this.signupForm.get('password')) {
      return this.signupForm.get('password')?.value
    }
    return null
  }

  signUp() {
    console.log(this.email)
    if (this.email && this.password) {
      console.log("towards auth service")
      this.auth.signup(this.email, this.password).subscribe(res => {
        console.log(res)
      })
      // show fail
      // show success by navigating to next page
    } else {
      // notify user of error -> something went wrong
    }
  }
}
