const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models/user'); 
mongoose.connect('mongodb://localhost:27017/book-lending', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('147258369', 10);

  const newAdmin = new Admin({
    userFullName: 'Ngô Thị Thu Thảo',
    gender: 'Nữ',
    phoneNumber: '0888211527',
    email: 'thaob2207566@student.ctu.edu.vn',
    password: hashedPassword,
    managedFloors: [1],
    role : 'Admin',
    isVerified: true
  });

  try {
    await newAdmin.save();
    console.log('Admin đã được tạo thành công.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Lỗi khi tạo admin:', error);
  }
}

createAdmin();
