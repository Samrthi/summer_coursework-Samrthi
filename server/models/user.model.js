const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    profile: {
        id: String,
        profile_type: {
            type: String,
            Default: "candidate"
        }
    }
})

UserSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })

UserSchema.path('hashed_password').validate(function() {
    // if (this._password && this._password.length < 8) {
    //     this.invalidate('password', 'Password must be at least 8 characters.')
    // }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

module.exports = {UserModel: mongoose.model('User', UserSchema)} //format for consistency with database modesls