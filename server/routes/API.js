const Model = require('../schema/schema')
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
mongoose.set('useFindAndModify', false);

// TODO improve error handling
// TODO update only if exists, otherwise return error
// TODO return with success or fail


// GET METHODS
router.get('/candidate/:candidate_id', function (req, res) {
    const candidate_id = req.params['candidate_id']
    Model.CandidateModel.findById(candidate_id, function (err, candidate){
        if (err) return res.send(err);
        res.json(candidate)
    })
})

router.get('/job/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Model.JobModel.findById(job_id, function (err, job){
        if (err) return res.send(err);
        res.json(job)
    })
})

router.get('/skill/:skill_id', function (req, res) {
    const skill_id = req.params['skill_id']
    Model.SkillModel.findById(skill_id, function (err, skill){
        if (err) return res.send(err);
        res.json(skill)
    })
})

router.get('/searchable_candidates', function (req, res) {
    Model.CandidateModel.find({searchable: true}, function (err, candidates) {
        if (err) { res.send(err) }
        res.json(candidates)
    })
})

router.get('/shortlist/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Model.JobModel.findById(job_id, 'shortlist', function (err, job){
        if (err) return res.send(err);
        if (!job) {
            res.send("not a valid job id")
            return
        }

        const shortlist = job.shortlist.map(x => x['id'])

        Model.CandidateModel.find({_id: {"$in": shortlist}},function (err, candidates) {
            if (err) return res.send(err);
            res.json(candidates)
        })
    })
})

router.get('/interested_jobs/:candidate_id', function (req, res) {
    const candidate_id = req.params['candidate_id']
    Model.CandidateModel.findById(candidate_id, 'interested_jobs', function (err, candidate){
        if (err) return res.send(err);
        if (!candidate) {
            res.send("not a valid candidate id")
            return
        }

        const job_list = candidate.interested_jobs.map(x => x['id'])

        Model.JobModel.find({_id: {"$in": job_list}},function (err, jobs) {
            if (err) return res.send(err);
            res.json(jobs)
        })
    })
})

router.get('/shortlisted_jobs/:candidate_id', function (req, res) {
    const candidate_id = req.params['candidate_id']
    Model.JobModel.find({"shortlist.id": candidate_id},function (err, jobs) {
        if (err) {return res.send(err)}
        res.json(jobs)
    })
})


router.get('/job-list', function (req, res) {
    Model.JobModel.find(function (err, jobs) {
        if (err) return res.send(err);
        res.json(jobs)
    })
})

router.get('/skill-list', function (req, res) {
    Model.SkillModel.find(function (err, skills) {
        if (err) return res.send(err);
        res.json(skills)
    })
})

// PUT METHODS
router.put('/candidate', jsonParser, function (req, res) {

    // test command
    // curl -X PUT -H "Content-Type: application/json" -d '{"name":"Sam"}' "http://localhost:3000/api/candidate"

    const candidate_instance = new Model.CandidateModel(req.body);
    candidate_instance.save(function (err) {
        if (err) return res.send(err.message);
    });
})

router.put('/employer', jsonParser, function (req, res) {
    const employer_instance = new Model.EmployerModel(req.body);
    employer_instance.save(function (err) {
        if (err) return res.send(err.message);
    });
})

router.put('/job', jsonParser, function (req, res) {
    const job_instance = new Model.JobModel(req.body);
    job_instance.save(function (err) {
        if (err) return res.send(err.message);
    });
})


// POST METHODS
router.post('/candidate/:candidate_id', jsonParser, function (req, res) {
    // test command
    // curl -X POST -H "Content-Type: application/json" -d '{"name":"Samantha", "searchable":"false"}' "http://localhost:3000/api/candidate/60e7784d95bd90f005d60a99"

    const candidate_id = req.params['candidate_id']
    Model.CandidateModel.findByIdAndUpdate(candidate_id, req.body, function(err) {
        if (err) return res.send(err.message);
    })
})

router.post('/employer/:employer_id', jsonParser, function (req, res) {
    const employer_id = req.params['employer_id']
    Model.EmployerModel.findByIdAndUpdate(employer_id, req.body, function(err) {
        if (err) return res.send(err.message);
    })
})

router.post('/job/:job_id', jsonParser, function (req, res) {
    const job_id = req.params['job_id']
    Model.JobModel.findByIdAndUpdate(job_id, req.body, function(err) {
        if (err) return res.send(err.message);
    })
})


// DELETE METHODS
router.delete('/candidate/:candidate_id', function (req, res) {
    // testing command
    // curl -X DELETE "http://localhost:3000/api/candidate/60e775648ce84bef921747b8"

    const candidate_id = req.params['candidate_id']
    Model.CandidateModel.findByIdAndDelete(candidate_id, function (err) {
        if (err) return res.send(err.message);
    })
})

router.delete('/employer/:employer_id', function (req, res) {
    const employer_id = req.params['employer_id']
    Model.EmployerModel.findByIdAndDelete(employer_id, function (err) {
        if (err) return res.send(err.message);
    })
})

router.delete('/job/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Model.JobModel.findByIdAndDelete(job_id, function (err) {
        if (err) return res.send(err.message);
    })
})

module.exports = router
