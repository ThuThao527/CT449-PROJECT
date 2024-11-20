const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');
const borrowRequestController = require('../controllers/borrowRequestController')

router.get('/getall', bookController.getAllBooks);
router.get('/borrowRequests/pending',requireLogin, bookController.getPendingBorrowRequests);
router.get('/borrowRequests/approved',requireLogin, bookController.getApprovedBorrowRequests);
router.get('/borrowRequests',requireLogin, bookController.getAllBorrowRequests);
router.get('/:id', bookController.getBookById);
router.post('/createBorrowRequest',requireLogin, bookController.createBorrowRequest);
router.post('/updateBorrowRequestStatus/:id',requireLogin,isAdmin, bookController.updateBorrowRequestStatus);
router.post('/borrowRequests/approve/:id',requireLogin,  bookController.approveBorrowRequest);
router.post('/borrowRequests/reject/:id',requireLogin,  bookController.rejectBorrowRequest);
router.post('/borrowRequests/return/:id',requireLogin, bookController.returnBook);
router.get('/borrowRequests/listBooks',requireLogin, borrowRequestController.getBooksByStudent);
router.post('/renew/:id',requireLogin, borrowRequestController.renewBook );
router.get('/getBooksBySearch', bookController.getBooksBySearch);

module.exports = router;
