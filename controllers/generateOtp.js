const crypto=require('crypto')

function generateDailyOtp(){

    const now = new Date();

    // Convert to IST (Asia/Kolkata)
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + istOffset);

    // Format date as YYYY-MM-DD
    const year = istTime.getUTCFullYear();
    const month = String(istTime.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(istTime.getUTCDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    console.log("IST Date:", date);
    const hash = crypto.createHash('sha256').update(date).digest('hex');
    // console.log(hash);
     const numbersOnly = hash.replace(/\D/g, ''); // Remove non-digits

     const otp = numbersOnly.slice(0, 4).padEnd(4, '0');
    // console.log(otp);
    console.log(otp);
    
    return otp;
}

module.exports=generateDailyOtp;
