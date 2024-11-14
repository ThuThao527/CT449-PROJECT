const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/:id/favorite/:bookId',verifyToken, userController.addFavoriteBook);
router.delete('/:userId/favorite/:bookId', verifyToken, userController.removeFavoriteBook);
router.get('/:id/favorie', verifyToken, userController.getFavoriteBooks);
router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.get('/profile', verifyToken, userController.getUserProfile);

module.exports = router;
