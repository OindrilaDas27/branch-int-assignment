const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// route to create user
router.post('/create-user', userController.createUser);

//route to get user by id/email
router.get('/get-user/:id', userController.findUser);

router.get('/get-user-by-email', userController.findUserByEmail);


module.exports = router;