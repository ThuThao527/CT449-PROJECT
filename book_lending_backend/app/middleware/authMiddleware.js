const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../api-error');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next(new ForbiddenError('No token provided'));
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError('Unauthorized'));
    }
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Không có token' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    if (decoded.role !== 'Admin') {
      return res.status(403).json({ message: 'Chỉ có admin mới có quyền truy cập' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};
