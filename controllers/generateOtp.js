const crypto=require('crypto')

function generateDailyOtp(){

    const now = new Date();

    // Convert to IST timezone
    const istTime = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    
    // Convert to Date object
    const istDate = new Date(istTime);
    
    // Extract YYYY-MM-DD
    const date = istDate.toISOString().split("T")[0];
    
    console.log(date);
   
    const hash = crypto.createHash('sha256').update(date).digest('hex');
    // console.log(hash);
     const numbersOnly = hash.replace(/\D/g, ''); // Remove non-digits

     const otp = numbersOnly.slice(0, 4).padEnd(4, '0');
    // console.log(otp);
    console.log(otp);
    
    return otp;
}

module.exports=generateDailyOtp;
