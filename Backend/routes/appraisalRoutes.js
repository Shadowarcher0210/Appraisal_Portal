const express = require('express');
const { displayAppraisal,saveAppraisalDetails, getAppraisals } = require('../controllers/appraisalController');
const {authenticateUser} = require('../middleware/authenticateUser')

const router = express.Router()

router.post('/save',authenticateUser, displayAppraisal)
router.post('/saveDetails/:userId/:startDate/:endDate',authenticateUser,saveAppraisalDetails)
router.get('/display/:userId', getAppraisals);


module.exports = router;