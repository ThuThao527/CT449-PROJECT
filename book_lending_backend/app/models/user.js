const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userFullName: {
    type: String,
    required: true,
  },
  idStudent: {
    type: String,
    unique: true,
    required: true,
  },
  dayOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  favoriteBooks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book' 
  }],
  address: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('User', UserSchema);
