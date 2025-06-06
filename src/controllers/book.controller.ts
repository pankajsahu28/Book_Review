
import { Request, Response, NextFunction } from 'express';
import * as BookService from '../services/book.service';

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await BookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err: any) {
    next(err);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filters: any = {};
    if (author) filters.author = author;
    if (genre) filters.genre = genre;

    const books = await BookService.getAllBooks(filters, Number(page), Number(limit));
    res.json(books);
  } catch (err: any) {
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await BookService.getBookById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const reviews = book.reviews ?? [];
    const avgRating = reviews.length
      ? (reviews as any[]).reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({ ...book.toObject(), averageRating: avgRating });
  } catch (err: any) {
    next(err);
  }
};

export const searchBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await BookService.searchBooks(req.query.q as string);
    res.json(result);
  } catch (err: any) {
    next(err);
  }
};


export const createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const bookId = req.params.id;
    const review = await BookService.createReview(bookId, userId, req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;  // <-- added this line
    const review = await BookService.updateReview(req.params.id, userId, req.body);
    if (!review) {
      res.status(403).json({ message: 'Unauthorized or not found' });
      return;
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const review = await BookService.deleteReview(req.params.id, userId);
    if (!review) {
      res.status(403).json({ message: 'Unauthorized or not found' });
      return;
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};