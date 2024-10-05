const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: String,
    userId: String,
    message: String,
    messageStatus: String,
    threadId: String,
    priority: String,
    role: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Message', messageSchema);