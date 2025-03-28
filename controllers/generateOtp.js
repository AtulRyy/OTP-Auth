const crypto=require('crypto')

function generateDailyOtp(){
    const now = new Date();
    const istOffset = 19800 * 1000; // 5 hours 30 minutes in milliseconds
    const istTime = new Date(now.getTime() + istOffset);

    // Format to "YYYY-MM-DD"
    const date = istTime.toISOString().slice(0, 10);
   
    const hash = crypto.createHash('sha256').update(date).digest('hex');
    // console.log(hash);
     const numbersOnly = hash.replace(/\D/g, ''); // Remove non-digits

     const otp = numbersOnly.slice(0, 4).padEnd(4, '0');
    // console.log(otp);
    
    return otp;
}

module.exports=generateDailyOtp;
