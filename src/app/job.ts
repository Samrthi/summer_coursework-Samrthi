import {Skill} from "./skill";
import {Candidate} from "./candidate";

export class Job {
    constructor(
        public _id: string,
        public name: string,
        public description?: string,
        public skills?: Skill[],
        public shortlist?: Candidate[]
    ) {}
}