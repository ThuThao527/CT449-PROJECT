const Book = require('../models/book');
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







