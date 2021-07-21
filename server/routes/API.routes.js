const Database = require('../models/database.model')
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false);

function http_error(res, code, message){
    res.status(code).send(message.toString())
}

// AUTH ROUTES
router.post('/add-user', jsonParser, function (req, res){
    const user_instance = new User.UserModel(req.body)
    // TODO more explicit handling of email already being registered
    user_instance.save(function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(201).send()
    });
})

router.put('/add-profile', jsonParser, function(req, res) {
    let user_id = jwt.decode(req.cookies['t']).user_id
    let name = jwt.decode(req.cookies['t']).name
    let profile_id = req.body.id
    let profile_type = req.body.profile_type

    User.UserModel.findByIdAndUpdate(user_id, {profile: req.body}, function (err) {
        if (err) return http_error(res, 500, err.message);

        let token_payload = {
            user_id: user_id,
            name: name,
            profile_id: profile_id,
            profile_type: profile_type
        }

        // create a token
        const token = jwt.sign(
            token_payload,
            process.env.jwtSecret,
            {
                expiresIn: "1800s" // 30 minutes
            });

        res.clearCookie('t')
        res.cookie('t', token, {
            sameSite: "strict",
            secure: true,
            httpOnly: true,
        })

        res.status(200).send()
    })
})




router.get('/logged-in', function (req, res) {
    let response = {"logged_in": false}
    if (req.cookies['t']) {
        response.logged_in = true
    }
    res.status(200).json(response)
})

router.get('/has-profile', function (req, res) {
    let response = {"has_profile": false}
    if (req.cookies['t'] && jwt.decode(req.cookies['t']).profile) {
        response.has_profile = true
        response.profile_type = jwt.decode(req.cookies['t']).profile_type
    }
    res.status(200).json(response)
})

router.get('/get-name', function (req, res) {
    res.json({name: jwt.decode(req.cookies['t']).name})
})

router.get('/logout', function (req, res){
    res.clearCookie('t').clearCookie('user').send()
})

router.post('/login', jsonParser, function (req, res){
    User.UserModel.findOne({email: req.body.email}, "", function (err, user) {
        if (err) return http_error(res, 500, err.message);
        if (!user) return http_error(res,401, "No user registered under this email address")
        if (!user.authenticate(req.body.password)) {
            return http_error(res,401, "Password incorrect")
        }


        let token_payload = {
            user_id: user.id,
            name: user.name,
        }

        if (user.profile) {
            token_payload.profile_id = user.profile.id
            token_payload.profile_type = user.profile.type
        }

        // create a token
        const token = jwt.sign(
            token_payload,
            process.env.jwtSecret,
            {
                expiresIn: "1800s" // 30 minutes
            });

        res.cookie('t', token, {
            // expires: new Date() + 10,
            sameSite: "strict",
            secure: true,
            httpOnly: true
        })


        return res.status(200)
            .json({
                match: true,
                profile: user.profile
            })
    })
})



// GET METHODS
router.get('/candidate/:candidate_id', function (req, res) {
    let candidate_id = req.params['candidate_id']
    if (candidate_id === "current") {
        candidate_id = jwt.decode(req.cookies['t']).profile_id
    }
    Database.CandidateModel.findById(candidate_id, function (err, candidate){
        if (err) return http_error(res, 500, err.message);
        if (!candidate) return http_error(res, 404, "No candidate with this id exists")
        res.json(candidate)
    })
})

router.get('/employer/:employer_id', function (req, res) {
    let employer_id = req.params['employer_id']
    if (employer_id === "current") {
        employer_id = jwt.decode(req.cookies['t']).profile_id
    }
    Database.EmployerModel.findById(employer_id, function (err, employer){
        if (err) return http_error(res, 500, err.message);
        if (!employer) return http_error(res, 404, "No employer with this id exists")
        res.json(employer)
    })
})

router.get('/job/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Database.JobModel.findById(job_id, function (err, job){
        if (err) return http_error(res, 500, err.message);
        res.json(job)
    })
})

router.get('/skill/:skill_id', function (req, res) {
    const skill_id = req.params['skill_id']
    Database.SkillModel.findById(skill_id, function (err, skill){
        if (err) return http_error(res, 500, err.message);
        res.json(skill)
    })
})

router.get('/searchable_candidates', function (req, res) {
    Database.CandidateModel.find({searchable: true}, function (err, candidates) {
        if (err) return http_error(res, 500, err.message);
        res.json(candidates)
    })
})

router.get('/shortlist/:job_id', function (req, res) {
    const job_id = req.params['job_id']
    Database.JobModel.findById(job_id, 'shortlist', function (err, job){
        if (err) return http_error(res, 500, err.message);
        if (!job) return http_error(res, 404, "No job with this id exists")

        const shortlist = job.shortlist.map(x => x['id'])

        Database.CandidateModel.find({_id: {"$in": shortlist}},function (err, candidates) {
            if (err) return http_error(res, 500, err.message);
            res.json(candidates)
        })
    })
})

router.get('/interested_jobs', function (req, res) {
    const candidate_id = jwt.decode(req.cookies['t']).profile_id
    Database.CandidateModel.findById(candidate_id, 'interested_jobs', function (err, candidate){
        if (err) return http_error(res, 500, err.message);
        if (!candidate) return http_error(res, 404, "No candidate with this id exists")

        const job_list = candidate.interested_jobs.map(x => x['id'])

        Database.JobModel.find({_id: {"$in": job_list}},function (err, jobs) {
            if (err) return http_error(res, 500, err.message);
            res.json(jobs)
        })
    })
})

router.get('/shortlisted_jobs', function (req, res) {
    const candidate_id = jwt.decode(req.cookies['t']).profile_id
    Database.JobModel.find({"shortlist.id": candidate_id},function (err, jobs) {
        if (err) return http_error(res, 500, err.message);
        res.json(jobs)
    })
})


router.get('/job-list', function (req, res) {
    Database.JobModel.find(function (err, jobs) {
        if (err) return http_error(res, 500, err.message);
        res.json(jobs)
    })
})

router.get('/skill-list', function (req, res) {
    Database.SkillModel.find(function (err, skills) {
        if (err) return http_error(res, 500, err.message);
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
        res.status(201).json({
            profile_id: candidate_instance.id
        })
    });
})

router.post('/employer', jsonParser, function (req, res) {
    const employer_instance = new Database.EmployerModel(req.body);
    employer_instance.save(function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(201).json({
            profile_id: employer_instance.id
        })
    });
})

router.post('/job', jsonParser, function (req, res) {
    const employer_id = jwt.decode(req.cookies['t']).profile_id
    const job_instance = new Database.JobModel(req.body);
    job_instance.save(function (err) {
        if (err) return http_error(res, 500, err.message);
        Database.EmployerModel.findByIdAndUpdate(employer_id, {$push: {jobs: job_instance}}, function(err) {
            if (err) return http_error(res, 500, err.message);
        })

    });
})


// PUT METHODS
router.put('/candidate', jsonParser, function (req, res) {
    // test command
    // curl -X PUT -H "Content-Type: application/json" -d '{"name":"Samantha", "searchable":"false"}' "http://localhost:3000/api/candidate/60e7784d95bd90f005d60a99"
    const candidate_id = jwt.decode(req.cookies['t']).profile_id
    Database.CandidateModel.findByIdAndUpdate(candidate_id, req.body, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})

router.put('/employer', jsonParser, function (req, res) {
    const employer_id = jwt.decode(req.cookies['t']).profile_id
    console.log(req.body)
    Database.EmployerModel.findByIdAndUpdate(employer_id, req.body, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})


router.put('/job/:job_id', jsonParser, function (req, res) {
    const job_id = req.params['job_id']
    Database.JobModel.findByIdAndUpdate(job_id, req.body, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })
})


// DELETE METHODS

router.delete('/delete-user', function (req, res) {
    let id = jwt.decode(req.cookies['t']).user_id
    User.UserModel.findByIdAndDelete(id, function(err) {
        if (err) return http_error(res, 500, err.message);
        res.clearCookie('t')
        res.status(200).send()
    })
})

router.delete('/:type/', function (req, res) {
    if (req.params["type"] === "employer") {
        const employer_id = jwt.decode(req.cookies['t']).profile_id
        Database.EmployerModel.findByIdAndDelete(employer_id, function (err) {
            if (err) return http_error(res, 500, err.message);
            res.status(200).send()
        })
    } else {
        const candidate_id = jwt.decode(req.cookies['t']).profile_id
        Database.CandidateModel.findByIdAndDelete(candidate_id, function (err) {
            if (err) return http_error(res, 500, err.message);
            res.status(200).send()
        })
    }

    const user_id = jwt.decode(req.cookies['t']).user_id
    let name = jwt.decode(req.cookies['t']).name
    User.UserModel.findByIdAndUpdate(user_id, {$unset: {profile: ""}}, function (err) {
        if (err) return http_error(res, 500, err.message);
        res.status(200).send()
    })


    let token_payload = {
        user_id: user_id,
        name: name,
    }

    // create a token
    const token = jwt.sign(
        token_payload,
        process.env.jwtSecret,
        {
            expiresIn: "1800s" // 30 minutes
        });

    res.clearCookie('t')
    res.cookie('t', token, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
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
