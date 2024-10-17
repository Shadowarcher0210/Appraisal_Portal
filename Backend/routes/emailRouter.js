const express = require('express');
const { sendConfirmationEmails } = require('../controllers/emailController');


const router = express.Router();

router.post('/email',sendConfirmationEmails);

module.exports = router;