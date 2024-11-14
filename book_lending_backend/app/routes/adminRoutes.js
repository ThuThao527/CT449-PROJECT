const express = require('express');
const router = express.Router();
const adminController = require('../controllers/borrowRequestController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController')
const upload = require('../middleware/multerConfig')


router.get('/approve-loans', verifyToken, isAdmin, adminController.approveBorrowRequest);
router.post('/add-book',  upload.array('images', 5), bookController.addBook);
///router.post('/admin/add-book', verifyToken, isAdmin, bookController.addBook);
//router.get('/admin/user-accounts', verifyToken, isAdmin, adminController.getUserAccounts);
// router.get('/', verifyToken, isAdmin, (req, res) => {
//   res.json({ message: 'Trang này dành cho admin duyệt yêu cầu mượn sách' });
// });

module.exports = router;
