const Thread = require('../models/thread.model');

const getThreads = async (searchParam, type) => {
    try {
        if (type === "user") {
            const threads = await Thread.find({ userId: searchParam });
            return threads;
        } 
        if (type === "agent") {
            const threads = await Thread.find({ agentId: searchParam });
            return threads;
        }
        if (type === "id") {
            const threads = await Thread.find({ threadId: searchParam });
            return threads;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getThreads };