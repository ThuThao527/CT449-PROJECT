const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

router.get('/getall', bookController.getAllBooks);
router.get('/borrowRequests/pending', bookController.getPendingBorrowRequests);
router.get('/borrowRequests/approved', bookController.getApprovedBorrowRequests);
router.get('/borrowRequests', bookController.getAllBorrowRequests);
router.get('/:id', bookController.getBookById);
router.post('/createBorrowRequest', bookController.createBorrowRequest);
router.post('/updateBorrowRequestStatus/:id',isAdmin, bookController.updateBorrowRequestStatus);
router.post('/borrowRequests/approve/:id',  bookController.approveBorrowRequest);
router.post('/borrowRequests/reject/:id',  bookController.rejectBorrowRequest);
router.post('/borrowRequests/return/:id', bookController.returnBook);

module.exports = router;
