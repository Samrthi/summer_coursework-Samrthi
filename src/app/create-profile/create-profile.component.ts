import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  constructor(
      private auth: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  createCandidateProfile() {
    this.auth.addProfile("candidate")
  }

  createEmployerProfile() {
    this.auth.addProfile("employer")
  }

  deleteAccount() {
    this.auth.deleteUser().subscribe(res => {
      this.router.navigate(['signup'])
    })
  }
}
