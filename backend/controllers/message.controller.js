const Message = require('../models/message.model');
const User = require('../models/user.model');
const Thread = require('../models/thread.model');
const shortid = require('shortid');
const { getThreads } = require('./thread.controller');

const msgStatus = Object.freeze({
    active: 'active',
    unresolved: 'unresolved'
})

const setPriority = (message) => {
    const keywords = ["loan", "loan approval process"];
    const isHighPriority = keywords.some(keyword => message.message.toLowerCase().includes(keyword.toLowerCase()));

    if(isHighPriority) {
        message.priority = "high priority";
    } else {
        message.priority = "normal";
    }

    return message;
}

const createMessage = async (req, res) => {
    try {
        const messageData = req.body;
        const user = await User.findOne({ userId: messageData.userId });

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const newMessgae = new Message({
            id: shortid.generate(),
            userId: messageData.userId,
            message: messageData.message,
            messageStatus: user.role === 'customer' ? msgStatus.unresolved : msgStatus.active,
            threadId: messageData.threadId,
            role: user.role,
            createdAt: messageData.createdAt ? new Date(messageData.createdAt) : undefined,
        });

        setPriority(newMessgae);

        await newMessgae.save();
        res.status(200).json ({ message: "Message posted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const getUnresolvedMessage = async (req, res) => {
    try {
        const message = await Message.find({ messageStatus: msgStatus.unresolved });
        res.status(200).json({ 'message': message});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const claimIssue = async (req, res) => {
    try {
        const agentId = req.body.userId;
        const messageId = req.body._id;
        const threadName = req.body.threadName;

        let issue = await Message.findById(messageId);

        if(!issue) {
            console.log("error from here the issue")
            return res.status(404).json("Issue not found");
        }

        if(issue.status === msgStatus.active) {
            return res.status(400).json("Issue already claimed");
        }

        let agent = await User.findOne({ userId: agentId, role: "agent"});

        if(!agent) {
            console.log("error from agent ad agenid")
            return res.status(404).json("Agent not found");
        }

        // creating a new thread
        let newThread = await Thread.create({
            threadId: shortid.generate(),
            title: threadName,
            userId: issue.userId,
            agentId: agentId,
            msgId: messageId
        })

        issue.messageStatus = msgStatus.active;
        issue.threadId = newThread._id;

        await newThread.save();
        await issue.save();

        res.status(200).json({ "threadId": newThread.threadId});
    } catch (error) {
        console.log(error);
    }
}

const getAllMessagesInThread = async (req, res) => {
    try {
        const threadId = req.params.threadId

        const thread = await Thread.findOne({ threadId: threadId})

        if(!thread) {
            return res.status(404).json({ error: "Thread not found"});
        }

        const originalMsg = await Message.findById( thread.msgId );
        console.log("original msgId:", thread.msgId);

        let messagesInThread = await Message.find({ threadId: threadId })

        const allMsg = [originalMsg, ...messagesInThread];
        res.status(200).json({ 'messages': allMsg })
        console.log("thread Id: ", threadId);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const createThreadMessage = async (req, res) => {
    try {
        const messageData = req.body;
        const thread = await getThreads(messageData.threadId, "id");

        const newMessgae = new Message({
            userId: thread.userId,
            message: messageData.message,
            status: msgStatus.active,
            threadId: messageData.threadId,
            role: messageData.role
        })

        let message = await newMessgae.save();

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { createMessage, getUnresolvedMessage, claimIssue, getAllMessagesInThread, createThreadMessage };