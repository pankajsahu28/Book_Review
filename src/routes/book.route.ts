
import express from 'express';
import * as BookController from '../controllers/book.controller'; 
import { authenticate } from '../middlewares/auth.middleware'; 

const router = express.Router(); 


// Public route: Search for books by title or author
router.get('/search', BookController.searchBooks);

// Protected route: Create a new book (requires authentication)
router.post('/', authenticate, BookController.createBook);

// Public route: Fetch list of books (supports filtering and pagination)
router.get('/', BookController.getBooks);

// Public route: Get a book by ID along with reviews and average rating
router.get('/:id', BookController.getBookById);


// review routes merged here:


// Protected route: Create a review for a book
router.post('/:id/reviews', authenticate, BookController.createReview);

// Protected route: Update a review (must be owned by the user)
router.put('/reviews/:id', authenticate, BookController.updateReview);

// Protected route: Delete a review (must be owned by the user)
router.delete('/reviews/:id', authenticate, BookController.deleteReview);

export default router;
