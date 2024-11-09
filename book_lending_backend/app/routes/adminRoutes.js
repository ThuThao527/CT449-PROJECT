const express = require('express');
const router = express.Router();
const borrowRequestController = require('../controllers/borrowRequestController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/admin/approve-loans', verifyToken, isAdmin, adminController.approveLoans);
router.post('/admin/add-book', verifyToken, isAdmin, adminController.addBook);
router.get('/admin/user-accounts', verifyToken, isAdmin, adminController.getUserAccounts);

// Route chỉ dành cho admin để duyệt yêu cầu mượn sách
router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Trang này dành cho admin duyệt yêu cầu mượn sách' });
});

module.exports = router;
