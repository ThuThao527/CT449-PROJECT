const jwt = require('jsonwebtoken');
const {Admin} = require('../models/user')
const { UnauthorizedError, ForbiddenError } = require('../api-error');

exports.requireLogin = async (req, res, next) => {
   if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized, please log in' });
  }
  next();
};

exports.checkAuth = async (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    // Lấy userId từ session
    const userId = req.session.userId; 

    // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    // Tìm người dùng trong Admin collection để xác nhận vai trò admin
    const user = await Admin.findById(userId);

    // Kiểm tra xem người dùng có tồn tại và có role là 'Admin' hay không
    if (!user || user.role !== 'Admin') {
      return res.status(403).send({ message: 'You are not authorized to perform this action' });
    }

    next(); // Nếu là admin, tiếp tục xử lý
  } catch (error) {
    console.error('Error while checking admin:', error);
    res.status(500).send({ message: 'Server error' });
  }
};
