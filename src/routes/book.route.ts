
import express from 'express';
import * as BookController from '../controllers/book.controller'; // ✅ CORRECT
import { authenticate } from '../middlewares/auth.middleware'; // FIXED typo in file name

const router = express.Router(); 

router.get('/search', BookController.searchBooks);
router.post('/', authenticate, BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBookById);

// review routes merged here:
router.post('/:id/reviews', authenticate, BookController.createReview);
router.put('/reviews/:id', authenticate, BookController.updateReview);
router.delete('/reviews/:id', authenticate, BookController.deleteReview);

export default router;
