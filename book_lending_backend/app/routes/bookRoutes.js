const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

router.get('/getall', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/createBorrowRequest', bookController.createBorrowRequest);
router.post('/updateBorrowRequestStatus/:id',isAdmin, bookController.updateBorrowRequestStatus);
router.get('/getBorrowRequest/:id', bookController.getBorrowRequest);
router.post('/returnBook', bookController.returnBook);

//router.post('/add', upload.array('images', 5), bookController.addBook);

module.exports = router;
