const express = require('express');
const { displayAppraisal,saveAppraisalDetails, getAppraisals, updateAppraisalStatus, getAppraisalAnswers } = require('../controllers/appraisalController');
const {authenticateUser} = require('../middleware/authenticateUser')

const router = express.Router()

router.post('/display',authenticateUser, displayAppraisal)
router.put('/status/:userId/:startDate/:endDate', updateAppraisalStatus)
router.post('/saveDetails/:userId/:startDate/:endDate',authenticateUser,saveAppraisalDetails)
router.get('/display/:userId', getAppraisals);
router.get('/displayAnswers/:userId/:startDate/:endDate', getAppraisalAnswers);


module.exports = router;