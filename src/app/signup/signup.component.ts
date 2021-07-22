import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  nameFormControl = new FormControl(null, [
    Validators.required
  ])
  emailFormControl= new FormControl(null, [
    Validators.required,
    Validators.email
  ])
  passwordFormControl= new FormControl(null, [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern(/\d/),
    Validators.pattern(/[a-z]/),
    Validators.pattern(/[A-Z]/)
  ])

  matcher = new MyErrorStateMatcher();

  constructor(
      private auth: AuthService,
      private router: Router,
  ) { }

  get name(): string | null {
    return this.nameFormControl.value
  }

  get email(): string | null {
    return this.emailFormControl.value.toLowerCase()
  }

  get password(): string | null {
    return this.passwordFormControl.value
  }

  signUp() {
    if (this.name && this.email && this.password) {
      this.auth.signup(this.name, this.email, this.password).subscribe(res => {
        this.router.navigate(['/login'])
      })
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}