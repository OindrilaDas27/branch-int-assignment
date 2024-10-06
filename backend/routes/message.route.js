const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

// route to create msg
router.post('/create-msg', messageController.createMessage);

// route to get all unresponded msg
router.get('/get-msg', messageController.getUnresolvedMessage);

// route to claim an issue
router.post('/claim-issue', messageController.claimIssue);

// route to thread
router.post('/create-thread-msg', messageController.createThreadMessage);

router.get('/get-thread/:threadId', messageController.getAllMessagesInThread)

module.exports = router;