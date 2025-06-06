import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';

// import other routes here

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
// app.use('/api/books', bookRoutes); etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
