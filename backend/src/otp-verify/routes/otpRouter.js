const express = require('express');
const { sendOTP, verifyOTP } = require('../otpController');

const router = express.Router();

router.get('/sendotp', sendOTP);
router.get('/verifyotp', verifyOTP);

module.exports = router;