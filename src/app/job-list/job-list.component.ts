import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Employer} from "../employer";
import { Job } from '../job';
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = undefined
  skillDict = {};
  employer = false

  constructor(
      private storage: StorageService,
      private route: ActivatedRoute,
      ) {}

  ngOnInit(): void {
    this.storage.getSkillList().subscribe(skills => {
      skills.forEach(skill => {
        this.skillDict[skill._id] = skill.name
      })
    })

    const type = this.route.snapshot.paramMap.get('type')
    if (type === "employer") {
      this.employer = true
      this.storage.getEmployerJobs().subscribe(res => {
        this.jobs = this.convertSkillIdtoName(res)
      })
    } else if (type === "interested") {
      this.storage.getInterestedJobs().subscribe(res => {
        this.jobs = this.convertSkillIdtoName(res)
      })
    } else if (type === "shortlisted") {
      this.storage.getShortlistedJobs().subscribe(res => {
        this.jobs = this.convertSkillIdtoName(res)
      })
    }
  }

  convertSkillIdtoName(jobs: Job[]) {
    return jobs.map(job => {
      job.skills = job.skills.map(skill => this.skillDict[skill])
      return job
    })
  }


  isLoaded(): boolean {
    return this.jobs !== undefined
  }
}
