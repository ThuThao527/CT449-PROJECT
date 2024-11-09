const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/:id',verifyToken, userController.getUserById);
router.post('/:id/favorite/:bookId', userController.addFavoriteBook);
router.delete('/:userId/favorite/:bookId', userController.removeFavoriteBook);
router.get('/:id/favorie', userController.getFavoriteBooks);
router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.get('/profile', verifyToken, userController.getUserProfile);





module.exports = router;
