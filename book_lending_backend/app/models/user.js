const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userFullName: {
    type: String,
    required: true,
  },
  dayOfBirth: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['Nam', 'Nữ'],
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
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    enum: ['Admin', 'Reader'], 
    default: 'Reader', 
  },
  
}, { collection: 'users' });

const User = mongoose.model('User', UserSchema);

const ReaderSchema = new mongoose.Schema({
  favoriteBooks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book',
  }],
  idStudent: {
    type: String,
    unique: true,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
});

// Tạo model Reader kế thừa từ User
const Reader = User.discriminator('Reader', ReaderSchema);

const AdminSchema = new mongoose.Schema({
  managedFloors: {
    type: [Number], // Mảng các tầng mà admin quản lý
    required: true,
  },
});

// Tạo model Admin kế thừa từ User
const Admin = User.discriminator('Admin', AdminSchema);


module.exports = {
  User,
  Reader,
  Admin,
};
