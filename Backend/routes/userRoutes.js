const express = require('express');
const { GetUserController } = require('../Controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');


const router = express.Router();

//Router
router.get("/getUser",AuthMiddleware, GetUserController);
module.exports = router;
