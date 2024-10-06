const express = require('express');
const router = express.Router();

const threadController = require('../controllers/thread.controller');

// route to get threads
router.get('/get-thread/:threadId', threadController.getThreads);

module.exports = router;