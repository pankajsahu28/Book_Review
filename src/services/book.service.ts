import { BookModel} from '../models/book.model';
import { ReviewModel } from '../models/review.model';

export const createBook = async (data: any) => {
  return await BookModel.create(data);
};

export const getAllBooks = async (filters: any, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return await BookModel.find(filters).skip(skip).limit(limit);
};

export const getBookById = async (id: string) => {
  const book = await BookModel.findById(id).populate('reviews');
  return book;
};

export const searchBooks = async (query: string) => {
    const regex = new RegExp(query, 'i'); // case-insensitive
    return await BookModel.find({
      $or: [{ title: regex }, { author: regex }]
    });
  };

  
  export const createReview = async (bookId: string, userId: string, data: any) => {
    return await ReviewModel.create({ book: bookId, user: userId, ...data });
  };
  
  export const updateReview = async (reviewId: string, userId: string, data: any) => {
    return await ReviewModel.findOneAndUpdate({ _id: reviewId, user: userId }, data, { new: true });
  };
  
  export const deleteReview = async (reviewId: string, userId: string) => {
    return await ReviewModel.findOneAndDelete({ _id: reviewId, user: userId });
  };
  
  export const getReviewsByBook = async (bookId: string, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ book: bookId })
      .populate('user', 'fullName')
      .skip(skip)
      .limit(limit);
  };
  

