import User from "../models/user.model";
import express from "express";
const router = express.Router()

router.param('userId', function (req, res, next, id) {
    const user = User.findById("123", function(err) {
        if (err) {
            return res.status('400').json({
                error: "Could not retrieve user"
            })
        }

        if (!user) {
            return res.status('400').json({
                error: "User not found"
            })
        }

        req.profile = user
        next()
    })
})