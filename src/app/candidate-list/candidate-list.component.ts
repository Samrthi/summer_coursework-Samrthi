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
    skillDict = {};


    constructor(private storage: StorageService,) { }

    ngOnInit(): void {
        this.storage.getSkillList().subscribe(skills => {
            skills.forEach(skill => {
                this.skillDict[skill._id] = skill.name
            })
        })

        this.storage.getSearchableCandidates().subscribe((candidates: Candidate[]) => {
            this.candidates = this.convertSkillIdtoName(candidates)
        })
    }


    convertSkillIdtoName(candidates: Candidate[]) {
        return candidates.map(candidate => {
            candidate.skills = candidate.skills.map(skill => this.skillDict[skill])
            return candidate
        })
    }
}
