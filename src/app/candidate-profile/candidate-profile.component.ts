import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";

import {Candidate} from "../candidate";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileDialogComponent} from "./edit-profile-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {
  candidate: Candidate;
  skillDict = {};

  constructor(
      private storage: StorageService,
      public dialog: MatDialog,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.candidate = undefined
    this.storage.getCandidate("current").subscribe(res => {
        this.candidate = new Candidate(res.name, res.statement, res.skills, res.searchable)
    })
    this.storage.getSkillList().subscribe(skills => {
      skills.forEach(skill => {
        this.skillDict[skill._id] = skill.name
      })
    })
  }

  isLoaded(): boolean {
    return this.candidate !== undefined
  }

  editProfile() {
    const dialogData: EditProfileDialogData = {
      profile: this.candidate,
      allowDelete: true,
      showDeleteConfirm: false,
    };
    this.dialog.open(EditProfileDialogComponent, {data: dialogData})
    this.dialog.afterAllClosed.subscribe(res => {
      window.location.reload()
    })
  }

  viewJobs() {
    //TODO implement
  }

  viewInterestedJobs() {
    //TODO implement
  }
}

export interface EditProfileDialogData {
  profile: Candidate;
  allowDelete: boolean;
  showDeleteConfirm: boolean;
}

