const express = require('express');
const { RegisterController, LoginController, PasswordResetController } = require('./Controllers/AuthController');


const router = express.Router()

//routes
//REGISTER||POST
router.post('/register',RegisterController)

//login
router.post('/login',LoginController);

module.exports = router;