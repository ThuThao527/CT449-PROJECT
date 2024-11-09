const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: [{
    type: String,
    enum: ['Fiction', 'Adventure', 'Mystery', 'Romance', 'Science fiction', 'Fantasy',
    'Thriller', 'Historical fiction', 'Dystopian', 'Horror', 'Satire',
    'Non-fiction', 'Biography', 'Autobiography', 'Memoir', 'Self-help', 'Health',
    'True crime', 'Philosophy', 'Psychology', 'Travel', 'Science', 'History',
    'Politics', 'Children', 'Picture books', 'Early reader', 'Middle grade',
    'Young adult', 'Educational', 'Textbooks', 'Academic', 'Reference',
    'Language learning', 'Mathematics', 'Engineering', 'Computer science',
    'Business', 'Entrepreneurship', 'Marketing', 'Management', 'Finance',
    'Economics', 'Investing', 'Religion', 'Buddhism', 'Christianity', 'Islam',
    'Spirituality', 'New age', 'Lifestyle', 'Cooking', 'Gardening', 'Home improvement',
    'Fashion', 'Art', 'Photography', 'Poetry', 'Essays', 'Short stories', 'Anthology',
    'Graphic novels', 'Comics', 'Drama'],
    required: true,
  }],
  totalCopies: { // Tổng số lượng sách trong thư viện
    type: Number,
    required: true,
  },
  availableCopies: { // Số lượng sách hiện có
    type: Number,
    required: true,
  },
  rating: { // Đánh giá 5 sao
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  status: { // Tình trạng sách (còn hay hết)
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },
  description: {
    type: String,
    required: false,
  },
  images: [{
    type: String,

  }]
});

// Middleware để cập nhật status dựa trên availableCopies
BookSchema.pre('save', function(next) {
  if (this.availableCopies === 0) {
    this.status = 'unavailable';
  } else {
    this.status = 'available';
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema);
 