const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

/* GET users listing. */

router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.post('/signup', userController.signupUser);

// Add the signup route

module.exports = router;