const Otps = require('./db/dbOtp');
const {userModel} = require('../login/db/dbUsers')
const {room} = require('../room-chat/db/db-rooms')
const otpGenerator = require('otp-generator')
const sendEmail = require('./sendEmails');

function generateOTP() {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false });
}

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.query;
        const otp = generateOTP(); 
        const newOTP = new Otps({ email, otp });
        await newOTP.save();

        
        await sendEmail({
            to: email,
            subject: 'OTP verification',
            message: `<h1>Hello user</h1><h2>Your OTP is ${otp}</h2>`,
        });

        res.status(200).json({ success: true, message: 'OTP sent successfully' , otp:otp});
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp,username } = req.query;
        const existingOTP = await Otps.findOneAndDelete({ email, otp });

        if (existingOTP) {
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            const del = await userModel.findOneAndDelete({ email });
            const dele = await room.findOneAndDelete({username})
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};