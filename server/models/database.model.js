const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CandidateSchema = new Schema({
    name: { type: String, required: true },
    statement: String,
    skills: [{id: Schema.Types.ObjectId}],
    searchable: {
        type: Boolean,
        Default: false
    },
    interested_jobs: [{id: Schema.Types.ObjectId}],
})

const EmployerSchema = new Schema({
    name: { type: String, required: true },
    jobs: [{id: Schema.Types.ObjectId}]
})


const JobSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    skills: [{id: String}],
    shortlist: [{id: Schema.Types.ObjectId}]
})


const SkillSchema = new Schema({
    name: { type: String, required: true }
})

module.exports = {
    CandidateModel: mongoose.model('Candidate', CandidateSchema),
    EmployerModel: mongoose.model('Employer', EmployerSchema),
    JobModel: mongoose.model('Job', JobSchema),
    SkillModel: mongoose.model('Skill', SkillSchema)
}