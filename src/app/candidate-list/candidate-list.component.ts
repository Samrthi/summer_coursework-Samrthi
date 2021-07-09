import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";
import {Candidate} from "../candidate";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Job} from "../job";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidates?: Candidate[];


  constructor(private storage: StorageService,) { }

  ngOnInit(): void {
    this.loadData()
  }

  private loadData(): void {
    this.storage.getSearchableCandidates()
        .pipe(
            catchError((err) => {
              console.log(err)
              return of([], false)
            }))
        // @ts-ignore
        .subscribe((candidates?: Candidate[]) => {
          if (candidates) {
            this.candidates = candidates
          }
        })
  }

}
