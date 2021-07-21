import {Candidate} from "./candidate";

export class Job {
    constructor(
        public name: string,
        public description?: string,
        public skills?: string[],
        public shortlist?: Candidate[]
    ) {}
}