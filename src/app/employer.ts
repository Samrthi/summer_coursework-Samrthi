import {Job} from "./job";

export class Employer {
    constructor(
        public name: string,
        public jobs?: string[]
    ) {}
}