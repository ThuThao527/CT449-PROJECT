const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.post('/borrow/:id', bookController.borrowBook);
router.post('/return/:id', bookController.returnBook);
router.post('/add', bookController.addBook);
router.get('/all', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/:id/images', bookController.upload.array('images', 5), bookController.uploadBookImages); // Allows up to 5 images


module.exports = router;
