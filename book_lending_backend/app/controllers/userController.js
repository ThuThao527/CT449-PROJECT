const {User, Admin, Reader} = require('../models/user');
const Book = require('../models/book');

const { NotFoundError, BadRequestError, InternalServerError, ConflictError } = require('../api-error');

// Route yêu cầu người dùng phải đăng nhập để truy cập vào thông tin cá nhân

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Thử tìm user từ Admin hoặc Reader
    let user = await Admin.findById(req.session.userId).select('userFullName email gender phoneNumber dayOfBirth ');
    if (!user) {
      user = await Reader.findById(req.session.userId).select('userFullName email gender phoneNumber dayOfBirth ');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // Lấy userId từ session
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error updating user information');
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
