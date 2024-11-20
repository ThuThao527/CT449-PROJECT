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

exports.getBooksByStudent = async (req, res) => {
  const { idStudent } = req.query; // Lấy mã số sinh viên từ query
  if (!idStudent) {
    return res.status(400).json({ message: 'idStudent is required' });
  }

  try {
    // Lấy danh sách sách đang mượn (status = 'approved')
    const currentlyBorrowed = await BorrowRequest.find({ 
      idStudent, 
      status: 'approved' 
    }).populate('bookId', 'title author').select('approvalDate dueDate');

    // Lấy danh sách lịch sử mượn (status = 'returned')
    const borrowHistory = await BorrowRequest.find({ 
      idStudent, 
      status: 'returned' 
    }).populate('bookId', 'title author').select('approvalDate returnedDate');

    res.status(200).json({ currentlyBorrowed, borrowHistory });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

exports.renewBook = async (req, res) => {
  const { bookId } = req.params;
  const { newDueDate } = req.body;

  try {
    // Tìm BorrowRequest bằng bookId và cập nhật ngày gia hạn mới
    const borrowRequest = await BorrowRequest.findOneAndUpdate(
      { _id: bookId, status: 'approved' },
      { dueDate: newDueDate },
      { new: true }
    );

    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found or already returned' });
    }

    res.status(200).json({ message: 'Book renewed successfully', borrowRequest });
  } catch (error) {
    console.error('Error renewing book:', error);
    res.status(500).json({ message: 'Error renewing book' });
  }
};
