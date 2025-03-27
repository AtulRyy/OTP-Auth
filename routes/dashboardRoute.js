const express = require('express')
const router = express.Router()
const generateOtp = require('../controllers/generateOtp')

router.get("/", (req, res) => {
    const otp = generateOtp();
    res.render('otpDashboard',{otp})
})

module.exports = router