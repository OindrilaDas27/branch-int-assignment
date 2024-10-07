const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emailId: String,
    userName: String,
    role: String,
    numberOfQueries: Number,
})

module.exports = mongoose.model('User', userSchema);