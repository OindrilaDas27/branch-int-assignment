const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    threadId: {
        type: String,
        default: null,
    },
    userId: String,
    agentId: String,
    title: String,
});

module.exports = mongoose.model('Thread', threadSchema);