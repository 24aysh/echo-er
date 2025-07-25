const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10,
  },
});

const Otps = mongoose.model('otp', otpSchema);

module.exports = Otps;