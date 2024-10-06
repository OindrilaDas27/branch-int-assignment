const express = require('express');
const router = express.Router();

const threadController = require('../controllers/thread.controller');

// route to get threads
router.get('/get-all-thread/:userId', threadController.getAllThreadsForUser);
router.get('/get-agent-thread/:agentId', threadController.getAllThreadsForAgent);


module.exports = router;