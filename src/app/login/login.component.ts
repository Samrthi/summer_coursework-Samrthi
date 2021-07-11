import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";


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
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private auth: AuthService) {}

  get email(): string | null {
    if (this.loginForm.get('email')) {
      return this.loginForm.get('email')?.value
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
    if (this.email && this.password) {
      this.auth.login(this.email, this.password).subscribe(res => {
        console.log(res)
      })
      // navigate forward when successful
      // show wrong password message otherwise/no user (retrieves as "error")

    } else {
      // notify user of error
    }
  }
}
