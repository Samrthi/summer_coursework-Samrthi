import {Job} from "./job";
import {Skill} from "./skill";

export class Candidate {
    constructor(
        public name: string,
        public statement?: string,
        public skills?: Skill[],
        public searchable?: boolean,
        public interested_jobs?: Job[],
    ) {}
}