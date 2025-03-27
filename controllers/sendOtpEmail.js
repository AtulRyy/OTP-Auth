const nodemailer = require('nodemailer');
const generateDailyOtp = require('./generateOtp');
const fs = require('fs');
const path = require('path');

const sendOtpEmail = async () => {
    try {
        const otp = generateDailyOtp();

        const filePath = path.join(__dirname, '../otp_template/template.html');
        let htmlTemplate = fs.readFileSync(filePath, 'utf-8');

        htmlTemplate = htmlTemplate.replace('{{OTP}}', otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Daily OTP',
            html: htmlTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
        
    } catch (error) {
        console.error(`❌ Failed to send email: ${error.message}`);
    }
};

module.exports = sendOtpEmail;
