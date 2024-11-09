const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./app/config/index'); // Import config từ file config/index.js
const {ApiError} = require('./app/api-error');
const path = require('path')
const app = express();

// Sử dụng các middleware
app.use(cors());
app.use(express.json());

;


// Đảm bảo đường dẫn chính xác tới thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Kết nối tới MongoDB sử dụng config.db.url
mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

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
