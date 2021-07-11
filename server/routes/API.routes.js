const Database = require('../models/database.model')
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken')
const config = require('../../config')

mongoose.set('useFindAndModify', false);

// TODO update only if exists, otherwise return error
// TODO return with success or fail
// TODO return correct failure code and correct success code

function http_error(res, code, message){
    res.status(code).json({
        error: message
    })
}

// AUTH ROUTES
router.post('/add-user', jsonParser, function (req, res){
    const user_instance = new User.UserModel(req.body)
    user_instance.save(function (err) {
        console.log(err)
        if (err) return http_error(res, 500, err.message);
        res.status(201).send()
    });
})

// remove user
// add profile
// remove profile

router.get('/logout', function (req, res){
    res.clearCookie('t').send()
})

router.post('/login', jsonParser, function (req, res){

    User.UserModel.findOne({email: req.body.email}, "", function (err, user) {
        if (err) return http_error(res, 500, err.message);
        if (!user) return http_error(res,401, "No user registered under this email address")
        if (!user.authenticate(req.body.password)) {
            return http_error(res,401, "Password incorrect")
        }

        // create a token
        const token = jwt.sign({
                _id: user.profile.id,
                profile_type: user.profile.type
            },
            config.jwtSecret,
            {
                expiresIn: "1800s" // 30 minutes
            });

        res.cookie('t', token, {
            // expires: new Date() + 10,
            sameSite: "strict",
            secure: true,
            httpOnly: true,
        })

        return res.json()
    })
})



// GET METHODS
router.get('/candidate/:candidate_id', function (req, res) {
    const candidate_id = req.params['candidate_id']
    Database.CandidateModel.findById(candidate_id, function (err, candidate){
        if (err) return http_error(res, 500, "Something went wrong");
        if (!candidate) return http_error(res, 404, "No candidate with this id exists")
        res.json(candidate)
    })
})

router.get('/job/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Database.Models.JobModelModel.findById(job_id, function (err, job){
        if (err) return http_error(res, 500, "Something went wrong");
        res.json(job)
    })
})

router.get('/skill/:skill_id', function (req, res) {
    const skill_id = req.params['skill_id']
    Database.Models.SkillModelModel.findById(skill_id, function (err, skill){
        if (err) return http_error(res, 500, "Something went wrong");
        res.json(skill)
    })
})

router.get('/searchable_candidates', function (req, res) {
    Database.CandidateModel.find({searchable: true}, function (err, candidates) {
        if (err) return http_error(res, 500, "Something went wrong");
        res.json(candidates)
    })
})

router.get('/shortlist/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Database.JobModel.findById(job_id, 'shortlist', function (err, job){
        if (err) return http_error(res, 500, "Something went wrong");
        if (!job) return http_error(res, 404, "No job with this id exists")

        const shortlist = job.shortlist.map(x => x['id'])

        Candidate.find({_id: {"$in": shortlist}},function (err, candidates) {
            if (err) return http_error(res, 500, "Something went wrong");
            res.json(candidates)
        })
    })
})

router.get('/interested_jobs/:candidate_id', function (req, res) {
    const candidate_id = req.params['candidate_id']
    Database.CandidateModel.findById(candidate_id, 'interested_jobs', function (err, candidate){
        if (err) return http_error(res, 500, "Something went wrong");
        if (!candidate) return http_error(res, 404, "No candidate with this id exists")

        const job_list = candidate.interested_jobs.map(x => x['id'])

        Database.JobModel.find({_id: {"$in": job_list}},function (err, jobs) {
            if (err) return http_error(res, 500, "Something went wrong");
            res.json(jobs)
        })
    })
})

router.get('/shortlisted_jobs/:candidate_id', function (req, res) {
    const candidate_id = req.params['candidate_id']
    Database.JobModel.find({"shortlist.id": candidate_id},function (err, jobs) {
        if (err) return http_error(res, 500, "Something went wrong");
        res.json(jobs)
    })
})


router.get('/job-list', function (req, res) {
    Database.JobModel.find(function (err, jobs) {
        if (err) return http_error(res, 500, "Something went wrong");
        res.json(jobs)
    })
})

router.get('/skill-list', function (req, res) {
    Database.SkillModel.find(function (err, skills) {
        if (err) return http_error(res, 500, "Something went wrong");
        res.json(skills)
    })
})

// POST METHODS
router.post('/candidate', jsonParser, function (req, res) {

    // test command
    // curl -X POST -H "Content-Type: application/json" -d '{"name":"Sam"}' "http://localhost:3000/api/candidate"

    const candidate_instance = new Database.CandidateModel(req.body);
    candidate_instance.save(function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(201).send()
    });
})

router.post('/employer', jsonParser, function (req, res) {
    const employer_instance = new Database.EmployerModel(req.body);
    employer_instance.save(function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(201).send()
    });
})

router.post('/job', jsonParser, function (req, res) {
    const job_instance = new Database.JobModel(req.body);
    job_instance.save(function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(201).send()
    });
})


// PUT METHODS
router.put('/candidate/:candidate_id', jsonParser, function (req, res) {
    // test command
    // curl -X PUT -H "Content-Type: application/json" -d '{"name":"Samantha", "searchable":"false"}' "http://localhost:3000/api/candidate/60e7784d95bd90f005d60a99"

    const candidate_id = req.params['candidate_id']
    Database.CandidateModel.findByIdAndUpdate(candidate_id, req.body, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})

router.put('/employer/:employer_id', jsonParser, function (req, res) {
    const employer_id = req.params['employer_id']
    Database.EmployerModel.findByIdAndUpdate(employer_id, req.body, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
    res.status(200).send()
})

router.put('/job/:job_id', jsonParser, function (req, res) {
    const job_id = req.params['job_id']
    Database.JobModel.findByIdAndUpdate(job_id, req.body, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})


// DELETE METHODS
router.delete('/candidate/:candidate_id', function (req, res) {
    // testing command
    // curl -X DELETE "http://localhost:3000/api/candidate/60e775648ce84bef921747b8"

    const candidate_id = req.params['candidate_id']
    Database.CandidateModel.findByIdAndDelete(candidate_id, function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})

router.delete('/employer/:employer_id', function (req, res) {
    const employer_id = req.params['employer_id']
    Database.EmployerModel.findByIdAndDelete(employer_id, function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})

router.delete('/job/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Database.JobModel.findByIdAndDelete(job_id, function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})

module.exports = router
