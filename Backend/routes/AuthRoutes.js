const express = require('express');
const { RegisterController, LoginController, ForgotPasswordController, ResetPasswordController } = require('../Controllers/AuthController');


const router = express.Router()

//routes
//REGISTER||POST
router.post('/register',RegisterController)

//login
router.post('/login',LoginController);

//forgotpassword
router.post('/forgotPassword',ForgotPasswordController);

//reset password
router.post('/resetPassword',ResetPasswordController);

module.exports = router;