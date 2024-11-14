const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

router.post('/borrow/:id', verifyToken, isAdmin, bookController.borrowBook);
router.post('/return/:id', verifyToken, isAdmin, bookController.returnBook);
router.get('/getall', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

//router.post('/add', upload.array('images', 5), bookController.addBook);

module.exports = router;
