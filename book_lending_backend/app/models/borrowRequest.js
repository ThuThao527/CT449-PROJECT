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
      return this.status === 'approved'; // Chỉ yêu cầu ngày trả khi sách đã được duyệt
    },
    default: function () {
      if (this.approvalDate) {
        // Tính toán ngày trả sách tự động (14 ngày sau approvalDate)
        return new Date(this.approvalDate).setDate(new Date(this.approvalDate).getDate() + 14);
      }
      return null;
    }
  },
  extensionDate: {
    type: Date, // Ngày yêu cầu gia hạn
  },
  newDueDate: {
    type: Date, // Ngày trả sách sau khi gia hạn
    default: function () {
      if (this.extensionDate) {
        // Nếu có ngày gia hạn, tính lại dueDate
        return new Date(this.extensionDate).setDate(new Date(this.extensionDate).getDate() + 14); // Gia hạn thêm 14 ngày
      }
      return this.dueDate;
    }
  },
  actualReturnDate: {
    type: Date,
  },
  fine: {
    type: Number,
    default: 0,
    set: function(value) {
      // Tính toán tiền phạt nếu trả trễ
      if (this.actualReturnDate && this.newDueDate && this.actualReturnDate > this.newDueDate) {
        const daysLate = Math.floor((this.actualReturnDate - this.newDueDate) / (1000 * 60 * 60 * 24));
        return daysLate * 1; // Giả sử mỗi ngày trễ sẽ phạt 1 đơn vị tiền
      }
      return value;
    }
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: String,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const BorrowRequest = mongoose.model('BorrowRequest', BorrowRequestSchema);
module.exports = BorrowRequest;
