const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

// route to create msg
router.post('/', messageController.createMessage);

// route to get all unresponded msg
router.get('/', messageController.getUnresolvedMessage);

// route to claim an issue
router.post('/claim', messageController.claimIssue);

// route to thread
router.post('/thread', messageController.createThreadMessage);

router.get('/thread/:threadId', messageController.getAllMessagesInThread);

router.get('/user/:userId', messageController.getMessagesByUserId);

router.get('/issue/:msgId', messageController.getMessagesByMsgId);

module.exports = router;