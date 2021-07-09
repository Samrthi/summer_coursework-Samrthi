const express = require('express')
const router = express.Router()
// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();

function http_error(res, code, message){
    res.status(code).json({
        error: message
    })
}


router.get('/candidate/:candidate_id', function (req, res) {

})

module.exports = router