const mongoose = require('mongoose');

const BorrowRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'returned'],
    default: 'pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  approvalDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
    required: function () {
      return this.status === 'approved';
    },
  },
  returnDate: {
    type: Date,
  },
  actualReturnDate: {
    type: Date,
  },
  fine: {
    type: Number,
    default: 0,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: String,
  },
});

const BorrowRequest = mongoose.model('BorrowRequest', BorrowRequestSchema);
module.exports = BorrowRequest;
