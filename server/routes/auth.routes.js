import User from "../models/user.model";
import express from "express";
const router = express.Router()

function http_error(res, code, message){
    res.status(code).json({
        error: message
    })
}


router.param('userId', function (req, res, next, id) {
    const user = User.findById("123", function(err) {
        if (err) {
            return http_error(res, 400, "Could not retrieve user")
        }

        if (!user) {
            return http_error(res, 400, "User not found")
        }

        req.profile = user
        next()
    })
})

module.exports = router