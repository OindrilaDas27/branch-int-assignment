const Thread = require('../models/thread.model');

const getThreads = async (searchParam, type) => {
    try {
        if (type === "user") {
            const threads = await Thread.find({ userId: searchParam });
            return threads;
        } else if (type === "agent") {
            const threads = await Thread.find({ agentId: searchParam });
            return threads;
        } else if (type === "id") {
            const threads = await Thread.findById(searchParam);
            return threads;
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllThreadsForUser = async(req, res) => {
    try {
        const userId = req.params.userId;
        const threads = await Thread.find({ userId: userId });

        if(threads.length === 0) {
            return res.status(404).json({ error: "No threads found for this user" });
        }

        res.status(200).json({ threads });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const getAllThreadsForAgent = async(req, res) => {
    try {
        const agentId = req.params.agentId;
        const threads = await Thread.find({ agentId: agentId });

        if(threads.length === 0) {
            return res.status(404).json({ error: "No threads found for this agent" });
        }

        res.status(200).json({ threads });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { getThreads, getAllThreadsForUser, getAllThreadsForAgent };