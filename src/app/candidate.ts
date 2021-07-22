import {Job} from "./job";

export class Candidate {
    constructor(
        public name: string,
        public statement?: string,
        public skills?: string[],
        public searchable?: boolean,
        public interested_jobs?: string[],
    ) {}
}