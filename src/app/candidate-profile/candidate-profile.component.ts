import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";
import { Job } from "../job";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {

  constructor(
      private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

    private loadData(): void {

    }


}