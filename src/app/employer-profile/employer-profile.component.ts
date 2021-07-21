import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {MatDialog} from "@angular/material/dialog";
import {Employer} from "../employer";
import {NewJobDialogComponent} from "./new-job-dialog.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent implements OnInit {
  employer: Employer;
  skillDict = {};

  constructor(
      private storage: StorageService,
      public dialog: MatDialog,
      public router: Router
  ) { }

  ngOnInit(): void {
    this.employer = undefined
    this.storage.getEmployer("current").subscribe(res => {
      this.employer = new Employer(res.name, res.jobs)
    })
    this.storage.getSkillList().subscribe(skills => {
      skills.forEach(skill => {
        this.skillDict[skill._id] = skill.name
      })
    })
  }

  isLoaded(): boolean {
    return this.employer !== undefined
  }

  addJob() {
    this.dialog.open(NewJobDialogComponent)
  }

  viewJobs() {
    this.router.navigate(['job-list', "employer"])
  }

  viewCandidates() {
    this.router.navigate(['candidates', "searchable"])
  }
}

