import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

/**
 * Controller for user signup.
 * Delegates to AuthService and handles HTTP response.
 */

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.signup(req.body.username, req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Controller for user login.
 * Delegates to AuthService and returns JWT token on success.
 */

export const login = async (req: Request, res: Response) => {
  try {
    const token = await AuthService.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
