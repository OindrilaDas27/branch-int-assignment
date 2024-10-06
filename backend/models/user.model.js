const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    emailId: String,
    userName: String,
    role: String,
    numberOfQueries: Number,
})

module.exports = mongoose.model('User', userSchema);