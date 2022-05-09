const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    dateOfBirth: Date,
    firstname: String,
    surname: String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel