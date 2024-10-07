const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    userId: String,
    agentId: String,
    msgId: String,
    title: String,
});

module.exports = mongoose.model('Thread', threadSchema);