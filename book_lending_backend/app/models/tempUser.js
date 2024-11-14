// tempUser.js
const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  userFullName: { type: String, required: true },
  password: { type: String, required: true },
  idStudent: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: '10m' } }, // Thời gian tồn tại là 5 phút
});

module.exports = mongoose.model('TempUser', tempUserSchema);
