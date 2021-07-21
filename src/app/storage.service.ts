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

  getEmployer(jobId: string): Observable<Employer> {
    return this.http.get<Employer>('/api/employer/' + jobId)
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

  getInterestedJobs (candidateId: string): Observable<Job[]> {
    return this.http.get<Job[]>('/api/interested_jobs/' + candidateId)
  }

  getsShortlistedJobs (candidateId: string): Observable<Job[]> {
    return this.http.get<Job[]>('/api/shortlisted_jobs/' + candidateId)
  }

  getJobList (): Observable<Job[]> {
    return this.http.get<Job[]>('/api/job-list/')
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

  addJob(job: Job): Observable<unknown> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/job', job, options)
  }

  // PUT
  updateCandidate(candidate: Candidate) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.http.put('/api/candidate', formatSkillsForBackend(candidate), options).subscribe()
  }

  updateEmployer(employer: Employer){
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.http.put('/api/employer', employer, options).subscribe()
  }

  // potentially not needed

  // updateJob(job: Job): Observable<unknown> {
  //   const options = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.put('/api/job', job, options)
  // }

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
function formatSkillsForBackend(candidate: Candidate) {
  candidate.skills = candidate.skills
      .map(id => JSON.parse('{"id": "' + mongoose.Types.ObjectId(id) + '"}'))
  return candidate
}

function formatSkillsForFrontend(candidate) {
  candidate.skills = candidate.skills.map(id => id["id"])
  return candidate
}
