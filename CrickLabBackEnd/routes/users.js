const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();


router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.post('/signup', userController.signupUser);



module.exports = router;