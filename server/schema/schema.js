const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CandidateSchema = new Schema({
    statement: String,
    skills: [{id: String}],
    searchable: Boolean,
    interested_jobs: [{id: String}],
})
const CandidateModel = mongoose.model('Candidate', CandidateSchema);


const EmployerSchema = new Schema({
    jobs: [{id: String}]
})
const EmployerModel = mongoose.model('Employer', EmployerSchema);


const JobSchema = new Schema({
    skills: [{id: String}],
    shortlist: [{id: String}]
})
const JobModel = mongoose.model('Job', JobSchema);


const SkillSchema = new Schema({
    name: String
})
const SkillModel = mongoose.model('Skill', SkillSchema);




module.exports = {
    CandidateModel: CandidateModel,
    EmployerModel: EmployerModel,
    JobModel: JobModel,
    SkillModel: SkillModel
}