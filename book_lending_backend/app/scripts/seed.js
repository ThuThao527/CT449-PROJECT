// scripts/seed.js
const mongoose = require('mongoose');
const { Admin, Reader } = require('@/models/user'); 

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Tạo Admin mặc định
  const newAdmin = new Admin({
    userFullName: 'Default Admin',
    dayOfBirth: '1980-01-01',
    gender: true,
    phoneNumber: '1234567890',
    email: 'admin@example.com',
    password: 'hashed_password',
    managedFloors: [1, 2],
  });

  await newAdmin.save();
  console.log('Admin created successfully');

  // Tạo Reader mặc định
  const newReader = new Reader({
    userFullName: 'Default Reader',
    dayOfBirth: '1995-05-15',
    gender: false,
    phoneNumber: '0987654321',
    email: 'reader@example.com',
    password: 'hashed_password',
    idStudent: 'ST12345',
  });

  await newReader.save();
  console.log('Reader created successfully');

  mongoose.connection.close();
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  mongoose.connection.close();
});
