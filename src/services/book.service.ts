import { BookModel} from '../models/book.model';
import { ReviewModel } from '../models/review.model';

/**
 * Creates a new book document in the database.
 */

export const createBook = async (data: any) => {
  return await BookModel.create(data);
};

/**
 * Retrieves all books based on filters with pagination.
 */

export const getAllBooks = async (filters: any, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return await BookModel.find(filters).skip(skip).limit(limit);
};

/**
 * Retrieves a single book by ID and populates its reviews.
 */

export const getBookById = async (id: string) => {
  const book = await BookModel.findById(id).populate('reviews');
  return book;
};

/**
 * Performs a case-insensitive search for books by title or author.
 */

export const searchBooks = async (query: string) => {
    const regex = new RegExp(query, 'i'); // case-insensitive
    return await BookModel.find({
      $or: [{ title: regex }, { author: regex }]
    });
  };

/**
 * Creates a review for a given book by a specific user.
 */  

  
  export const createReview = async (bookId: string, userId: string, data: any) => {
    return await ReviewModel.create({ book: bookId, user: userId, ...data });
  };

  /**
 * Updates a review if it belongs to the requesting user.
 */
  
  export const updateReview = async (reviewId: string, userId: string, data: any) => {
    return await ReviewModel.findOneAndUpdate({ _id: reviewId, user: userId }, data, { new: true });
  };

  /**
 * Deletes a review if it belongs to the requesting user.
 */
  
  export const deleteReview = async (reviewId: string, userId: string) => {
    return await ReviewModel.findOneAndDelete({ _id: reviewId, user: userId });
  };
  

  /**
 * Retrieves all reviews for a specific book with pagination.
 */

  export const getReviewsByBook = async (bookId: string, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ book: bookId })
      .populate('user', 'fullName')
      .skip(skip)
      .limit(limit);
  };
  

