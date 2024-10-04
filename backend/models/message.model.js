const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: String,
    messageStatus: String,
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread', 
    },
    messageFrom: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Message', messageSchema);