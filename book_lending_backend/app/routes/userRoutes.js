const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { requireLogin, checkAut } = require('../middleware/authMiddleware');

router.post('/:id/favorite/:bookId', requireLogin, userController.addFavoriteBook);
router.delete('/:userId/favorite/:bookId', requireLogin, userController.removeFavoriteBook);
router.get('/:id/favorie',requireLogin,  userController.getFavoriteBooks);
router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.get('/UserProfile',requireLogin, userController.getUserProfile);
router.get('/check-session', authController.checkSession);
router.put('/updateUserProfile', requireLogin, userController.updateUserProfile)
router.post('/logout', authController.logout);
module.exports = router;
