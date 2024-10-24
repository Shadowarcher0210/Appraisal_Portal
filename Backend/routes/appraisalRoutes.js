const express = require('express');
const { displayAppraisal,saveAppraisalDetails, getAppraisals, updateAppraisalStatus, getAppraisalAnswers, getEmployeeAppraisal, createAppraisalForm, sendExpiringAppraisalNotification} = require('../controllers/appraisalController');
const {authenticateUser} = require('../middleware/authenticateUser')

const router = express.Router()

router.post('/display',authenticateUser, displayAppraisal)
router.put('/status/:userId/:startDate/:endDate', updateAppraisalStatus)
router.put('/saveDetails/:userId/:startDate/:endDate',authenticateUser,saveAppraisalDetails)
router.post('/createAppraisal',createAppraisalForm);
router.get('/display/:userId', getAppraisals);
router.get('/displayAnswers/:userId/:startDate/:endDate', getAppraisalAnswers);
router.get('/performance/:userId', getEmployeeAppraisal)
router.get('/expiry/:userId/:startDate',sendExpiringAppraisalNotification );


module.exports = router;