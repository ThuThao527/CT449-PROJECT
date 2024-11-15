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

exports.isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; // Giả sử userId được lưu trong JWT token hoặc trong session
    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).send({ message: 'You are not authorized to perform this action' });
    }

    next(); // Nếu là admin, tiếp tục xử lý
  } catch (error) {
    console.error('Error while checking admin:', error);
    res.status(500).send({ message: 'Server error' });
  }
};
