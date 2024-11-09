const Book = require('../models/book');
const multer = require('multer');
const path = require('path');
const { BadRequestError, NotFoundError, InternalServerError } = require('../api-error');


// Lấy danh sách tất cả các sách
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(new InternalServerError('Failed to fetch books!'));
  }
};

// Lấy thông tin của một sách theo ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id); // Tìm sách dựa trên ID
    if (!book) {
      throw new NotFoundError('Book not found'); // Ném lỗi nếu không tìm thấy sách
    }
    res.json(book); // Trả về thông tin sách nếu tìm thấy
  } catch (err) {
    if (err.name === 'CastError') {
      // Kiểm tra lỗi CastError khi ID không hợp lệ
      next(new BadRequestError('Invalid book ID'));
    } else {
      next(new InternalServerError('Failed to fetch book')); // Ném lỗi nếu có lỗi khác
    }
  }
};

// Mượn sách
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    if (book.availableCopies > 0) {
      book.availableCopies -= 1;
      await book.save();
      res.json({ message: 'Book borrowed successfully', book });
    } else {
      throw new BadRequestError('Book unavailable' );
    }
  } catch (err) {
    next(err);
  }
};

// Trả sách
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    if (book.availableCopies < book.totalCopies) {
      book.availableCopies += 1;
      await book.save();
      res.json({ message: 'Book returned successfully', book });
    } else {
      throw new BadRequestError('All copies are already in the library');
    }
  } catch (err) {
    next(err);
  }
};

// Thêm sách mới
exports.addBook = async (req, res) => {
  const { title, author, genre, totalCopies, availableCopies, rating } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      genre,
      totalCopies,
      availableCopies,
      rating,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    next(new BadRequestError('Invalid book data'));
  }
};


// Multer configuration for handling multiple images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Export the multer upload to use in routes
module.exports.upload = upload;

// Upload multiple images for a book
exports.uploadBookImages = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    // Extract URLs of uploaded files
    const imageUrls = req.files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
    console.log(req.files);
    // Add new images to the book's images field
    book.images = [...book.images, ...imageUrls];
    await book.save();
    
    res.status(200).json({ message: "Images uploaded successfully", images: book.images });
  } catch (err) {
    console.error("Error:", err); 
    next(new InternalServerError("Failed to upload images for the book"));

  }
};

