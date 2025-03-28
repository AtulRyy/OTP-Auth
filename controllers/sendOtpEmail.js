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
            host: 'mail.ammaspastries.in',  // Outgoing mail server
            port: 465,                      // SMTP port for SSL
            secure: true,                   // True for 465, false for other ports
            auth: {
                user: process.env.EMAIL,    // Your email from .env (pin@ammaspastries.in)
                pass: process.env.PASSWORD, // Your email account's password from .env
            },
            tls: {
                rejectUnauthorized: false,  // Allow self-signed certificates (if needed)
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
