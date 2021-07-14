import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {
  name: string = ""
  constructor(
      private storage: StorageService,
      private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getName().subscribe(res => {
      // @ts-ignore
      this.name = " " + res['name']
    })
  }
}