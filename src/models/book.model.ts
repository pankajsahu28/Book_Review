import mongoose from 'mongoose';
import { IBook } from '../interfaces/book.interface';


const bookSchema = new mongoose.Schema<IBook>({
  title:   { type: String, required: true },
  author:  { type: String, required: true },
  genre:   { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

export const BookModel = mongoose.model<IBook>('Book', bookSchema);
