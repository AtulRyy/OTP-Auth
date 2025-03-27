const express=require('express')
const dotenv=require('dotenv').config()
const path=require('path')

const app=express()

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//routes
const dashboardRoute=require('./routes/dashboardRoute')

app.use('/atul',dashboardRoute)

require('./scheduler/scheduleEmail')

app.use(express.json());


app.get('/', (req, res) => {
    res.send('✅ Server is running smoothly!');
});





const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})
