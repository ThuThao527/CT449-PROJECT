const express = require('express');
const router = express.Router();
const adminController = require('../controllers/borrowRequestController');
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');
const publisherController = require('../controllers/publisherController');
const upload = require('../middleware/multerConfig')


router.get('/approve-loans', requireLogin, isAdmin, adminController.approveBorrowRequest);
router.post('/add-book',  upload.array('images', 5), bookController.addBook);
// router.post('/addPublisher', requireLogin, isAdmin, publisherController.addPublisher);

module.exports = router;
