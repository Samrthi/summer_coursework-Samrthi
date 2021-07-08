const Example = require('../schema/schema')
const express = require('express')
const router = express.Router()



// GET METHODS
router.get('/candidate', function (req, res) {
    // by id
})

router.get('/job', function (req, res) {
    // by id
})

router.get('/skill', function (req, res) {
    // by id
})

router.get('/candidate-list', function (req, res) {
    // list
})

router.get('/job-list', function (req, res) {
    // list
})

router.get('/skill-list', function (req, res) {
    // list
})


// PUT METHODS
router.put('/candidate', function (req, res) {
})

router.put('/employer', function (req, res) {
})

router.put('/job', function (req, res) {
})


// POST METHODS
router.post('/candidate', function (req, res) {
})

router.post('/employer', function (req, res) {
})

router.post('/job', function (req, res) {
})


// DELETE METHODS
router.delete('/candidate', function (req, res) {
})

router.delete('/employer', function (req, res) {
})

router.delete('/job', function (req, res) {
})

module.exports = router
