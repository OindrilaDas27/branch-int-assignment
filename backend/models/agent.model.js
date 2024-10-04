const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    agentId: String,
    agentName: String,
})

module.exports = mongoose.model('Agent', agentSchema);