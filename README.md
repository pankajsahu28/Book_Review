# 📚 Book Review API

A RESTful API built with Node.js, TypeScript, Express, and MongoDB for managing books and reviews. Features JWT authentication, CRUD operations, and secure access control.

## 🚀 Features

- User authentication (signup/login) with JWT
- CRUD operations for books and reviews
- Role-based ownership (users can only modify their own reviews)
- Public book browsing with search and pagination
- Secure password storage with BCrypt hashing
- TypeScript support for type safety
- Clean architecture with separation of concerns

## 🛠 Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- Dotenv for environment variables

## ⚙ Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm/yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

2. Install Dependencies
npm install

3. Configure Environment
Create a .env file:
cp .env.example .env

Edit .env with your configuration:
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-db
JWT_SECRET=your_strong_jwt_secret_here

4. Start the Application
npm run dev

API will be available at: http://localhost:5000

📡 API Endpoints
🔐 Authentication
Method	Endpoint	Description	Auth Required
POST	/api/signup	Register new user	No
POST	/api/login	Authenticate user	No
📘 Books
Method	Endpoint	Description	Auth Required
GET	/api/books	Get all books (paginated)	No
GET	/api/books/search	Search books by title/author	No
GET	/api/books/:id	Get single book with reviews	No
POST	/api/books	Create new book	Yes
PUT	/api/books/:id	Update book	Yes
DELETE	/api/books/:id	Delete book	Yes
✍ Reviews
Method	Endpoint	Description	Auth Required
POST	/api/books/:id/reviews	Add review to book	Yes
PUT	/api/books/reviews/:reviewId	Update review	Yes
DELETE	/api/books/reviews/:reviewId	Delete review	Yes

📋 Example Requests
User Signup
POST /api/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

User Login
POST /api/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Create Book (Authenticated)
POST /api/books
Authorization: Bearer <your_token>
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt, David Thomas",
  "genre": "Programming"
}

🗃 Database Schema
User
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hashed
}

Book
{
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}

Review
{
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  timestamps: true
}

🏗 Project Structure
src/
├── controllers/       # Route controllers
├── services/          # Business logic
├── routes/            # Express route definitions
├── models/            # Mongoose models
├── interfaces/        # TypeScript interfaces
├── middleware/        # Auth middleware
├── config/            # Database config
├── utils/             # Helper functions
└── index.ts           # Application entry point

🧠 Design Decisions
Authentication: JWT-based stateless authentication

Security:

BCrypt for password hashing

Protected routes with middleware

Role-based ownership checks

Performance:

Pagination for book listings

Indexed database queries

Type Safety: TypeScript interfaces for all models and requests

Modularity:

Clear separation of concerns

Reusable middleware

Service layer for business logic

✅ Testing the API
Signup: Create a new user account

Login: Obtain JWT token

Books:

Create new books (authenticated)

Search and browse books (public)

Reviews:

Add reviews to books

Update/delete your own reviews
