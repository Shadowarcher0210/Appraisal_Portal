const express = require('express');
const { GetTimePeriodController } = require('../Controllers/TimePeriodController');

const router = express.Router();

router.get('/getTime',GetTimePeriodController);

module.exports = router;