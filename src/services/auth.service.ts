import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


/**
 * Handles user registration:
 * - Checks if user already exists
 * - Hashes the password
 * - Stores user data in database
 */


export const signup = async (username: string, email: string, password: string) => {
  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ username, email, password: hashed });

  return user;
};

/**
 * Handles user login:
 * - Verifies credentials
 * - Issues JWT token if valid
 */

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  return token;
};