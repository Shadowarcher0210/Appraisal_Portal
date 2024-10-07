const express = require('express');
const { timePeriod} = require('../controllers/timePeriodController');

const router = express.Router();

router.get('/getTime',timePeriod);

module.exports = router;