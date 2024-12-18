const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./app/config/index'); // Import config từ file config/index.js
const {ApiError} = require('./app/api-error');
const path = require('path')
const app = express();
require('dotenv').config();
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',  // Đây là khóa bí mật để mã hóa session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Đặt thành true nếu bạn dùng HTTPS
}));

// Sử dụng các middleware
app.use(cors({
  origin: 'http://localhost:3001', // URL của frontend
  credentials: true, // Cho phép cookie được gửi kèm
}));
app.use(express.json());

// Kết nối tới MongoDB sử dụng config.db.url
mongoose.connect(config.db.url, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Các route
const bookRoutes = require('./app/routes/bookRoutes');
const userRoutes = require('./app/routes/userRoutes');
const adminRoutes = require('./app/routes/adminRoutes');

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Middleware xử lý lỗi
app.use((err, req, res, next) => {
  if(err instanceof ApiError){
    res.status(err.statusCode).json({message: err.message});
  } else {
    res.status(500).json({message: 'Internal server error'});
  }
})



// Xuất app để server.js có thể sử dụng
module.exports = app;
