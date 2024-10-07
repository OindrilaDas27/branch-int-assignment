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
        const user = await User.findById(messageData.userId);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const newMessage = new Message({
            userId: messageData.userId,
            message: messageData.message,
            messageStatus: user.role === 'customer' ? msgStatus.unresolved : msgStatus.active,
            threadId: messageData.threadId,
            role: user.role,
            createdAt: messageData.createdAt ? new Date(messageData.createdAt) : undefined,
        });

        setPriority(newMessage);

        user.numberOfQueries += 1;
        console.log(user.numberOfQueries)
        await user.save();

        const message = await newMessage.save();
        res.status(200).json ({ message: "Message posted successfully", messageId: message._id});
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
        const agentId = req.body.agentId;
        const messageId = req.body.messageId;
        const threadName = req.body.threadName;
        console.log(req.body)

        let issue = await Message.findById(messageId);

        if(!issue) {
            console.log("error from here the issue")
            return res.status(404).json("Issue not found");
        }

        if(issue.messageStatus === msgStatus.active) {
            return res.status(400).json("Issue already claimed");
        }

        let agent = await User.findOne({ _id: agentId, role: "agent"});

        if(!agent) {
            console.log("error from agent ad agenid")
            return res.status(404).json("Agent not found");
        }

        // creating a new thread
        let newThread = await Thread.create({
            title: threadName,
            userId: issue.userId,
            agentId: agentId,
            msgId: messageId
        })

        issue.messageStatus = msgStatus.active;
        issue.threadId = newThread._id;

        await newThread.save();
        await issue.save();

        res.status(200).json({ "threadId": newThread._id,  "messageId": messageId });
    } catch (error) {
        console.log(error);
    }
}

const getAllMessagesInThread = async (req, res) => {
    try {
        const threadId = req.params.threadId

        const thread = await Thread.findById(threadId)

        if(!thread) {
            return res.status(404).json({ error: "Thread not found"});
        }

        // const originalMsg = await Message.findById( thread.msgId );
        // console.log("original msgId:", thread.msgId);

        let messagesInThread = await Message.find({ threadId: threadId })

        // const allMsg = [messagesInThread];
        res.status(200).json({ 'messages': messagesInThread })
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

        const newMessage = new Message({
            userId: thread.userId,
            message: messageData.message,
            status: msgStatus.active,
            threadId: messageData.threadId,
            role: messageData.role
        })

        let message = await newMessage.save();

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const getMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;  

        const messages = await Message.find({ userId: userId });

        // Check if any messages were found
        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: "No messages found for this user." });
        }

        res.status(200).json({ messages });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "An error occurred while fetching messages." });
    }
};

const getMessagesByMsgId = async (req, res) => {
    try {
        const { msgId } = req.params;  

        const message = await Message.findById(msgId);

        // Check if any messages were found
        if (!message) {
            return res.status(404).json({ message: "No messages found." });
        }

        res.status(200).json({ message });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "An error occurred while fetching messages." });
    }
};


module.exports = { createMessage, getUnresolvedMessage, claimIssue, getAllMessagesInThread, createThreadMessage, getMessagesByUserId, getMessagesByMsgId };