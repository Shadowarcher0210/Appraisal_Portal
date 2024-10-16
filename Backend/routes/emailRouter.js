const express = require('express');
const { sendConfirmationEmails } = require('../controllers/EmailController');


const router = express.Router();

router.post('/email',sendConfirmationEmails);

module.exports = router;