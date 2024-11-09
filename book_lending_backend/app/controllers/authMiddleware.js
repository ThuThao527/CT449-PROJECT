const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../api-error');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    throw new ForbiddenError('No token provided' );
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      throw new UnauthorizedError('Unauthorized' );
    }
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    throw new ForbiddenError( 'Access denied: Admins only');
  }
  next();
};
