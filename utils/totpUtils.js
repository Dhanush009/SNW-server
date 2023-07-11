const speakeasy = require('speakeasy')
const qrCode = require('qrcode')

const generateQrCode = async () => {
    const {base32:secret, otpauth_url} = speakeasy.generateSecret({name: 'SNW'})
    const qr = await qrCode.toDataURL(otpauth_url)

    return {secret, qr}
}

const verifyOTP = (otp,secret) => speakeasy.totp.verify({secret, otp, encoding:'base32'})

module.exports = {generateQrCode, verifyOTP}