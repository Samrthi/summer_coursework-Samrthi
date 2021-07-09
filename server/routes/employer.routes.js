import express from "express";
const router = express.Router()

function http_error(res, code, message){
    res.status(code).json({
        error: message
    })
}

module.exports = router