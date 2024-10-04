const express = require('express');
const { saveAppraisal,getAppraisals } = require('../controllers/appraisalController');
const {authenticateUser} = require('../middleware/authenticateUser')

const router = express.Router()

router.post('/save',authenticateUser,saveAppraisal)
router.get('/display/:userId', getAppraisals);



module.exports = router;