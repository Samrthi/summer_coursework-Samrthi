import { Injectable } from '@angular/core';
import { Candidate } from "./candidate";
import { Employer} from "./employer";
import { Job } from "./job";
import { Skill } from "./skill";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StorageService {
  constructor(private http: HttpClient) {}

  // GET
  getCandidate(candidateId: string): Observable<Candidate> {
    return this.http.get<Candidate>('/api/candidate/' + candidateId)
  }

  getJob(jobId: string): Observable<Job> {
    return this.http.get<Job>('/api/job/' + jobId)
  }

  getSkill(skillId: string): Observable<Skill> {
    return this.http.get<Skill>('/api/skill/' + skillId)
  }

  getSearchableCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('/api/searchable_candidates/')
  }

  getShortlistCandidates(jobId: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('/api/shortlist/' + jobId)
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
    return this.http.get<Skill[]>('/api/skill-list/')
  }

  // POST
  addCandidate(candidate: Candidate): Observable<unknown> {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      return this.http.post('/api/candidate', candidate, options)
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
    return this.http.post('/api/candidate', job, options)
  }

  // PUT
  updateCandidate(candidate: Candidate): Observable<unknown> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put('/api/candidate', candidate, options)
  }

  updateEmployer(employer: Employer): Observable<unknown> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put('/api/candidate', employer, options)
  }

  updateJob(job: Job): Observable<unknown> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put('/api/candidate', job, options)
  }

  // DELETE
  deleteCandidate(candidateId: string): Observable<unknown> {
    return this.http.delete('/api/candidate/' + candidateId)
  }

  deleteEmployer(employerId: string): Observable<unknown> {
    return this.http.delete('/api/employer/' + employerId)
  }

  deleteJob(jobId: string): Observable<unknown> {
    return this.http.delete('/api/job/' + jobId)
  }
}
