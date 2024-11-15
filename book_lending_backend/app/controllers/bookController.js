const Book = require('../models/book');
const User = require("../models/user")
const BorrowRequest = require('../models/borrowRequest')
const path = require('path');
const upload = require('../middleware/multerConfig')
const { BadRequestError, NotFoundError, InternalServerError } = require('../api-error');


// Lấy danh sách tất cả các sách
exports.getAllBooks = async (req, res) => {
  try {
    // Nhận các tham số lọc từ query string
    const { genre, language, author, sortBy } = req.query;
    let filter = {};

    // Áp dụng bộ lọc nếu có
    if (genre) {
      filter.genre = genre;
    }
    if (language) {
      filter.language = language;
    }
    if (author) {
      filter.author = new RegExp(author, 'i'); // Không phân biệt chữ hoa chữ thường
    }

    let books = await Book.find(filter);

    // Sắp xếp theo yêu cầu (nếu có)
    if (sortBy) {
      if (sortBy === 'popularity') {
        books = books.sort((a, b) => b.totalCopies - a.totalCopies); // Giả sử sách phổ biến dựa vào tổng số lượng
      } else if (sortBy === 'latest') {
        books = books.sort((a, b) => b.publicationDate - a.publicationDate);
      } else if (sortBy === 'rating') {
        // Nếu có trường "rating", bạn có thể sắp xếp theo đó
      }
    }

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send({ message: 'Error fetching books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).send({ message: 'Error fetching book details' });
  }
};

// Thêm sách mới
exports.addBook = async (req, res, next) => {
  console.log('Received request to add book:', req.body);
  const { title, author, genre, totalCopies, availableCopies, description, position } = req.body;

  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`.replace(/\\/g, '/')) : []; // Lấy đường dẫn của các hình ảnh đã tải lên

  // const images = req.files ? req.files.map(file => file.path) : []; // Lấy đường dẫn của các hình ảnh đã tải lên
  console.log(req.files); // Kiểm tra file có được nhận từ phía client không
  console.log(req.body);

  try {
    const newBook = new Book({
      title,
      author,
      genre: JSON.parse(genre),
      totalCopies,
      availableCopies,
      description,
      position: JSON.parse(position),
      images,
      availability: 'Available',
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Lỗi khi thêm sách:", err);
    next(new BadRequestError('Invalid book data'));
  }
};

// API để lấy danh sách sách với các bộ lọc
exports.getBook = async (req, res) => {
  try {
    const { genre, language, author, sortBy } = req.query;
    let filter = {};

    // Áp dụng bộ lọc thể loại
    if (genre) {
      filter.genre = genre;
    }

    // Áp dụng bộ lọc ngôn ngữ
    if (language) {
      filter.language = language;
    }

    // Áp dụng bộ lọc tác giả
    if (author) {
      filter.author = new RegExp(author, 'i'); // Không phân biệt hoa thường
    }

    let books = await Book.find(filter);

    // Sắp xếp theo yêu cầu
    if (sortBy) {
      if (sortBy === 'popularity') {
        books = books.sort((a, b) => b.totalCopies - a.totalCopies); // Giả sử sắp xếp theo tổng số lượng
      } else if (sortBy === 'latest') {
        books = books.sort((a, b) => b.publicationDate - a.publicationDate);
      } else if (sortBy === 'rating') {
        // Có thể thêm logic sắp xếp theo đánh giá nếu có trường rating
      }
    }

    res.json(books);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching books' });
  }
};

// 1. Tạo một yêu cầu mượn sách mới
exports.createBorrowRequest = async (req, res) => {
  try {
    console.log("Incoming borrow request data:", req.body);
    const { userId, bookId, notes } = req.body;

    // Kiểm tra xem sách có tồn tại không
    const book = await Book.findById(bookId);
    if (!book) {
      console.error("Book not found with ID:", bookId);
      return res.status(404).send({ message: 'Book not found' });
    }

    // Lấy thông tin tầng lưu trữ của sách
    const bookFloor = book.position.floor;
    console.log("Book is located at floor:", bookFloor);

    // Tìm admin quản lý tầng tương ứng
    const admins = await User.find({ managedFloors: bookFloor, role: 'admin' });
    if (admins.length === 0) {
      console.error("No admin found managing the floor:", bookFloor);
      return res.status(404).send({ message: 'No admin found for the requested floor' });
    }

    // Chọn admin đầu tiên quản lý tầng này (có thể mở rộng logic sau này)
    const assignedAdmin = admins[0];
    console.log("Assigned admin ID:", assignedAdmin._id);
    
    // Kiểm tra số lượng sách có đủ để mượn không
    if (book.availableCopies < 1) {
      console.log("No available copies of the book to borrow.");
      return res.status(400).send({ message: 'No available copies to borrow' });
    }

    // Tạo mới một BorrowRequest
    const borrowRequest = new BorrowRequest({
      userId,
      bookId,
      notes,
      status: 'pending', // Mới tạo ra là đang chờ phê duyệt
    });

    // Lưu yêu cầu mượn sách vào cơ sở dữ liệu
    const savedRequest = await borrowRequest.save();
    console.log("Borrow request created successfully:", savedRequest);

    // Gửi phản hồi thành công
    res.status(201).send({
      message: 'Borrow request submitted successfully!',
      borrowRequest: savedRequest,
    });
  } catch (error) {
    console.error("Error while creating borrow request:", error);
    res.status(500).send({ message: 'An error occurred while processing your borrow request.' });
  }
};

// 2. Phê duyệt hoặc từ chối yêu cầu mượn sách
exports.updateBorrowRequestStatus = async (req, res) => {
  try {
    const { borrowRequestId, status, adminId } = req.body;
    console.log("Updating borrow request status for request ID:", borrowRequestId);
    console.log("New status:", status);
    console.log("Admin ID:", adminId);

    // Kiểm tra xem yêu cầu mượn sách có tồn tại không
    const borrowRequest = await BorrowRequest.findById(borrowRequestId);
    if (!borrowRequest) {
      console.error("Borrow request not found with ID:", borrowRequestId);
      return res.status(404).send({ message: 'Borrow request not found' });
    }

    // Kiểm tra quyền của admin
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      console.error("Unauthorized action. Admin rights required.");
      return res.status(403).send({ message: 'Admin rights required' });
    }

    // Cập nhật trạng thái của yêu cầu mượn
    borrowRequest.status = status;
    borrowRequest.adminId = adminId;
    borrowRequest.approvalDate = status === 'approved' ? new Date() : null;

    // Nếu yêu cầu được phê duyệt, tính toán ngày trả sách
    if (status === 'approved') {
      borrowRequest.dueDate = new Date(borrowRequest.approvalDate);
      borrowRequest.dueDate.setDate(borrowRequest.dueDate.getDate() + 14); // Gia hạn thêm 14 ngày
      
      // Giảm số lượng sách có sẵn
      const book = await Book.findById(borrowRequest.bookId);
      if (book) {
        if (book.availableCopies < 1) {
          console.error("No available copies to approve borrow request.");
          return res.status(400).send({ message: 'No available copies to approve borrow request' });
        }
        book.availableCopies -= 1;
        await book.save();
        console.log("Book quantity reduced after approval.");
      }
   
    }

    const updatedRequest = await borrowRequest.save();
    console.log("Borrow request updated:", updatedRequest);

    // Gửi phản hồi thành công
    res.status(200).send({
      message: 'Borrow request status updated successfully',
      borrowRequest: updatedRequest,
    });
  } catch (error) {
    console.error("Error while updating borrow request status:", error);
    res.status(500).send({ message: 'An error occurred while processing your request.' });
  }
};

// 3. Lấy thông tin yêu cầu mượn sách
exports.getBorrowRequest = async (req, res) => {
  try {
    const { borrowRequestId } = req.params;
    console.log("Fetching borrow request with ID:", borrowRequestId);

    const borrowRequest = await BorrowRequest.findById(borrowRequestId).populate('bookId userId');
    if (!borrowRequest) {
      console.error("Borrow request not found with ID:", borrowRequestId);
      return res.status(404).send({ message: 'Borrow request not found' });
    }

    console.log("Borrow request found:", borrowRequest);
    res.status(200).send(borrowRequest);
  } catch (error) {
    console.error("Error while fetching borrow request:", error);
    res.status(500).send({ message: 'An error occurred while fetching the borrow request.' });
  }
};

// 4. Trả sách và tính phạt nếu có
exports.returnBook = async (req, res) => {
  try {
    const { borrowRequestId, actualReturnDate } = req.body;
    console.log("Returning book for borrow request ID:", borrowRequestId);
    console.log("Actual return date:", actualReturnDate);

    const borrowRequest = await BorrowRequest.findById(borrowRequestId);
    if (!borrowRequest) {
      console.error("Borrow request not found with ID:", borrowRequestId);
      return res.status(404).send({ message: 'Borrow request not found' });
    }

    if (borrowRequest.status !== 'approved') {
      console.error("Cannot return book. The request has not been approved.");
      return res.status(400).send({ message: 'The borrow request has not been approved.' });
    }

    borrowRequest.actualReturnDate = new Date(actualReturnDate);

    // Tính toán tiền phạt nếu trả sách trễ
    if (borrowRequest.actualReturnDate > borrowRequest.newDueDate) {
      const lateDays = Math.floor((borrowRequest.actualReturnDate - borrowRequest.newDueDate) / (1000 * 60 * 60 * 24));
      borrowRequest.fine = lateDays * 1; // Phạt 1 đơn vị tiền mỗi ngày trễ
      console.log(`Late return detected. Fine calculated: ${borrowRequest.fine}`);
    }

    borrowRequest.status = 'returned';
    const updatedRequest = await borrowRequest.save();
    console.log("Book returned successfully. Updated borrow request:", updatedRequest);

    res.status(200).send({
      message: 'Book returned successfully',
      borrowRequest: updatedRequest,
    });
  } catch (error) {
    console.error("Error while returning book:", error);
    res.status(500).send({ message: 'An error occurred while processing your return.' });
  }
};








