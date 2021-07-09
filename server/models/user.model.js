const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: String
})

module.exports = {UserSchema: mongoose.model('User', UserSchema)}