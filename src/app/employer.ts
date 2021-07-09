import {Job} from "./job";

export class Employer {
    constructor(
        public _id: string,
        public name: string,
        public jobs?: Job[]
    ) {}
}