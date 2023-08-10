

module.exports.OTPCreate =(length) => {
let otp=''
const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

for (let i=0; i<length; i++){
    const index = Math.floor(Math.random()*characters.length);
    otp += characters[index]
}
return otp
}
