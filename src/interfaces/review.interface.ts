import { Document, Types } from 'mongoose';

export interface IReview extends Document {
  book: Types.ObjectId;      // Reference to Book
  user: Types.ObjectId;      // Reference to User who wrote the review
  rating: number;            // Numeric rating (e.g., 1 to 5)
  comment: string;           // Review text/comment
  createdAt: Date;
  updatedAt: Date;
}
