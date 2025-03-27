const crypto=require('crypto')

function generateDailyOtp(){
    const date = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const hash = crypto.createHash('sha256').update(date).digest('hex');
    // console.log(hash);
     const numbersOnly = hash.replace(/\D/g, ''); // Remove non-digits

     const otp = numbersOnly.slice(0, 4).padEnd(4, '0');
    // console.log(otp);
    
    return otp;
}

module.exports=generateDailyOtp;
