import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../candidate';

@Component({
  selector: 'app-candidate-listing',
  templateUrl: './candidate-listing.component.html',
  styleUrls: ['./candidate-listing.component.scss']
})
export class CandidateListingComponent implements OnInit {
  @Input() candidate: Candidate;
  constructor() { }

  ngOnInit(): void {
  }

}
