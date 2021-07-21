import { Injectable } from '@angular/core';
import { Candidate } from "./candidate";
import { Employer} from "./employer";
import { Job } from "./job";
import { Skill } from "./skill";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mongoose from "mongoose";
import {map} from "rxjs/operators";

@Injectable()
export class StorageService {
  constructor(private http: HttpClient) {}

  // GET
  getCandidate(candidateId: string): Observable<Candidate> {
    return this.http.get<Candidate>('/api/candidate/' + candidateId)
        .pipe(map(candidate => formatSkillsForFrontend(candidate)))
  }

  getEmployer(employerId: string): Observable<Employer> {
    return this.http.get<Employer>('/api/employer/' + employerId)
  }

  getJob(jobId: string): Observable<Job> {
    return this.http.get<Job>('/api/job/' + jobId)
  }

  getSkill(skillId: string): Observable<Skill> {
    return this.http.get<Skill>('/api/skill/' + skillId)
  }

  getSearchableCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('/api/searchable_candidates/')
        .pipe(map(candidates => candidates.map(candidate => formatSkillsForFrontend(candidate))))
  }

  getShortlistCandidates(jobId: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('/api/shortlist/' + jobId)
        .pipe(map(candidates => candidates.map(candidate => formatSkillsForFrontend(candidate))))
  }

  getInterestedJobs (): Observable<Job[]> {
    return this.http.get<Job[]>('/api/interested_jobs/')
        .pipe(map(job => job.map(job => formatSkillsForFrontend(job))))
  }

  getShortlistedJobs (): Observable<Job[]> {
    return this.http.get<Job[]>('/api/shortlisted_jobs/')
        .pipe(map(job => job.map(job => formatSkillsForFrontend(job))))
  }

  getEmployerJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/api/employer_jobs')
        .pipe(map(job => job.map(job => formatSkillsForFrontend(job))))
  }

  getJobList (): Observable<Job[]> {
    return this.http.get<Job[]>('/api/job-list/')
        .pipe(map(job => job.map(job => formatSkillsForFrontend(job))))
  }

  getSkillList (): Observable<Skill[]> {
    return this.http.get<Skill[]>('/api/skill-list')
  }

  // POST
  addCandidate(candidate: Candidate): Observable<unknown> {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      return this.http.post('/api/candidate', formatSkillsForBackend(candidate), options)
  }

  addEmployer(employer: Employer): Observable<unknown> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/employer', employer, options)
  }

  addJob(job: Job) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.http.post('/api/job', formatSkillsForBackend(job), options).subscribe()
  }

  // PUT
  updateCandidate(update) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.http.put('/api/candidate', formatSkillsForBackend(update), options).subscribe()
  }

  updateEmployer(update){
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.http.put('/api/employer', update, options).subscribe()
  }


  updateJob(job: Job, id: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    console.log(job)
    this.http.put('/api/job/' + id, formatSkillsForBackend(job), options).subscribe()
  }

  // DELETE
  deleteCandidate(){
    this.http.delete('/api/candidate').subscribe()
  }

  deleteEmployer() {
    this.http.delete('/api/employer').subscribe()
  }

  deleteJob(jobId: string) {
    this.http.delete('/api/job/' + jobId).subscribe()
  }
}

// Helpers
function formatSkillsForBackend(instance) {
  instance.skills = instance.skills
      .map(id => JSON.parse('{"id": "' + mongoose.Types.ObjectId(id) + '"}'))
  return instance
}

function formatSkillsForFrontend(instance) {
  instance.skills = instance.skills.map(id => id["id"])
  return instance
}
