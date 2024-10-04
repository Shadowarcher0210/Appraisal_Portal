const express = require('express');
const { getEmployees } = require('../controllers/dashboardController');

const router = express.Router()

router.get('/emp',getEmployees)

module.exports = router;