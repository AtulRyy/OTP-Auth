const cron = require('node-cron');
const sendOtpEmail = require('../controllers/sendOtpEmail');

// Schedule at 9:03 PM every day
cron.schedule('0 0 * * *', () => {
    console.log(`⏰ Running OTP job at ${new Date().toLocaleString()}`);
    sendOtpEmail();

}, {
    timezone: "Asia/Kolkata"
});
console.log("Scheduler is running");
