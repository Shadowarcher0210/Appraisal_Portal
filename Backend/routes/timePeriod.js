const express = require('express');
const { getAppraisalsByDateRange } = require('../controllers/timePeriodController');

const router = express.Router();

router.get('/getTime',getAppraisalsByDateRange);

module.exports = router;