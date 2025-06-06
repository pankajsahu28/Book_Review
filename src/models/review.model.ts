import mongoose, { Schema } from 'mongoose';
import { IReview } from '../interfaces/review.interface';

const reviewSchema = new Schema<IReview>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

export const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);
