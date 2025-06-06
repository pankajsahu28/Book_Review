import mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
