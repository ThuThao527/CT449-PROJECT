const User = require('../models/user');
const Book = require('../models/book');

const { NotFoundError, BadRequestError, InternalServerError, ConflictError } = require('../api-error');

// Route yêu cầu người dùng phải đăng nhập để truy cập vào thông tin cá nhân

exports.getUserProfile = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ `req.userId` đã được xác thực
    const user = await User.findById(req.userId).select('-password'); // Bỏ mật khẩu khỏi kết quả trả về
    if (!user) {
       throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    throw new InternalServerError ('Error with get id user');
  }
};

// Thêm sách vào danh sách yêu thích
exports.addFavoriteBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const book = await Book.findById(req.params.bookId);

    if (!user) {
      throw new NotFoundError('User not found'); // Lỗi nếu không tìm thấy user
    }
    if (!book) {
      throw new NotFoundError('Book not found'); // Lỗi nếu không tìm thấy sách
    }

    // Kiểm tra nếu sách đã tồn tại trong danh sách yêu thích
    if (!user.favoriteBooks.includes(req.params.bookId)) {
      user.favoriteBooks.push(req.params.bookId);
      await user.save();
      res.json({ message: 'Book added to favorites', user });
    } else {
      throw new ConflictError('Book is already in favorites'); // Lỗi nếu sách đã có trong danh sách yêu thích
    }
  } catch (err) {
    next(err);
  }
};

// Xóa sách khỏi danh sách yêu thích
exports.removeFavoriteBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw new NotFoundError('User not found'); // Lỗi nếu không tìm thấy người dùng
    }

    // Loại bỏ sách khỏi danh sách yêu thích
    user.favoriteBooks = user.favoriteBooks.filter(
      (bookId) => bookId.toString() !== req.params.bookId
    );

    await user.save();
    res.json({ message: 'Book removed from favorites', user });
  } catch (err) {
    next(err);
  }
};

// Hiển thị danh sách yêu thích
exports.getFavoriteBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('favoriteBooks');
    if (!user) {
      throw new NotFoundError('User not found'); // Lỗi nếu không tìm thấy người dùng
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
