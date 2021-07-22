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
  title: string;
  employer = false
  interestedJobs

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
      this.title = "My Jobs"
      this.employer = true
      this.storage.getEmployerJobs().subscribe(res => {
        this.jobs = this.convertSkillIdtoName(res)
      })
    } else {
      this.storage.getCandidate("current").subscribe(res => {
        this.interestedJobs = res.interested_jobs

      if (type === "interested") {
        this.title = "Jobs I have expressed interest in"
          this.storage.getInterestedJobs().subscribe(res => {
            this.jobs = this.addInterestedAttr(this.convertSkillIdtoName(res))
          })
        } else if (type === "shortlisted") {
        this.title = "Jobs I have been shortlisted for"
          this.storage.getShortlistedJobs().subscribe(res => {
            this.jobs = this.addInterestedAttr(this.convertSkillIdtoName(res))
          })
        } else if (type === "all") {
        this.title = "All available Jobs"
          this.storage.getJobList().subscribe(res => {
            this.jobs = this.addInterestedAttr(this.convertSkillIdtoName(res))
          })
        }
      })
    }
  }

  addInterestedAttr(jobs: Job[]) {
    return jobs.map(job => {
      job["interested"] = this.interestedJobs.includes(job["_id"])
      return job
    })
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
