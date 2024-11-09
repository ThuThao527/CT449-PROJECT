const BorrowRequest = require('../models/borrowRequest');
const {NotFoundError, ConflicError, InternalServerError} = require('../api-error');
const mongoose = require('mongoose');

// Duyệt yêu cầu mượn sách
exports.approveBorrowRequest = async (req, res, next) => {
  try {
    // Kiểm tra nếu requestId không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(req.params.requestId)) {
      throw new BadRequestError('Invalid request ID');
    }

    // Tìm yêu cầu mượn sách
    const borrowRequest = await BorrowRequest.findById(req.params.requestId);

    // Kiểm tra nếu không tìm thấy yêu cầu mượn sách
    if (!borrowRequest) {
      throw new NotFoundError('Borrow request not found');
    }

    // Kiểm tra nếu yêu cầu đã được duyệt trước đó
    if (borrowRequest.status === 'approved') {
      throw new ConflictError('Borrow request is already approved');
    }

    // Duyệt yêu cầu mượn sách
    borrowRequest.status = 'approved';
    await borrowRequest.save();
    res.json({ message: 'Borrow request approved', borrowRequest });
  } catch (err) {
    next(err); // Truyền lỗi tới middleware xử lý lỗi
  }
};

// Từ chối yêu cầu mượn sách
exports.rejectBorrowRequest = async (req, res, next) => {
  try {
    // Kiểm tra nếu requestId không hợp lệ
    if (!mongoose.Types.ObjectId.isValid(req.params.requestId)) {
      throw new BadRequestError('Invalid request ID');
    }

    // Tìm yêu cầu mượn sách
    const borrowRequest = await BorrowRequest.findById(req.params.requestId);

    // Kiểm tra nếu không tìm thấy yêu cầu mượn sách
    if (!borrowRequest) {
      throw new NotFoundError('Borrow request not found');
    }

    // Kiểm tra nếu yêu cầu đã bị từ chối trước đó
    if (borrowRequest.status === 'rejected') {
      throw new ConflictError('Borrow request is already rejected');
    }

    // Từ chối yêu cầu mượn sách
    borrowRequest.status = 'rejected';
    await borrowRequest.save();
    res.json({ message: 'Borrow request rejected', borrowRequest });
  } catch (err) {
    next(err); // Truyền lỗi tới middleware xử lý lỗi
  }
};
