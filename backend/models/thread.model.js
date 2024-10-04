const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    threadId: {
        type: String,
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
    },
    title: String,
});

module.exports = mongoose.model('Thread', threadSchema);