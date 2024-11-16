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
    required: true,
  }],
  language: {
    type: String,
    required: false,
  },
  totalCopies: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 5,
  },
  publicationDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },
  description: {
    type: String,
    required: false,
  },
  images: [{
    type: String, // Lưu đường dẫn của ảnh
  }],
  position: {
    floor: {
      type: Number,
      required: true,
    },
    shelf: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: false,
    },
  }
});

BookSchema.pre('save', function(next) {
  if (this.availableCopies === 0) {
    this.status = 'unavailable';
  } else {
    this.status = 'available';
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema);
