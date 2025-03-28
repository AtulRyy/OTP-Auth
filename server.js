const express=require('express')
const dotenv=require('dotenv').config()
const path=require('path')
const generateOtp=require('./controllers/generateOtp')

const app=express()

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//routes
const dashboardRoute=require('./routes/dashboardRoute')

app.use('/ammas',dashboardRoute)

require('./scheduler/scheduleEmail')

app.use(express.json());


app.get('/', (req, res) => {
    res.send('✅ Server is running smoothly!');
});

app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;
const todaysOtp=generateOtp();
    if (!otp) {
        return res.status(400).json({ success: false, message: "OTP is required" });
    }

    if (otp === todaysOtp) {
        return res.status(200).json({ success: true, message: "OTP verified successfully!" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid OTP!" });
    }
});



const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})
