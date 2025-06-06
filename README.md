📚 **Book Review API**
A RESTful API built using Node.js, TypeScript, Express, and MongoDB to manage books and their reviews. Users can sign up, log in, and perform CRUD operations on books and reviews. JWT-based authentication ensures secure access to protected routes.

📝 This is a personal assignment project. Kindly follow the steps below to set it up and run locally on http://localhost:5000.

 **Project Setup Instructions**

1. Clone the Repository
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the root directory:

cp .env.example .env

Fill in your MongoDB connection string and secret key:

PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-db
JWT_SECRET=your_jwt_secret

4. Start the Application

npm run dev

App will run on: http://localhost:5000

🚀 **How to Run Locally (Quick Guide)**

# Clone the project
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

# Install dependencies
npm install

# Create .env
cp .env.example .env

# Fill in MongoDB URI and JWT_SECRET
# Then start the server
npm run dev

Ensure MongoDB is running locally or use a cloud DB (like MongoDB Atlas).

App will be accessible at: http://localhost:5000 

📡 Example API Requests
All authenticated requests require a Bearer token in the header:
Authorization: Bearer <your_token_here>

🔐 **User Signup**
POST /api/signup

{
  "username": "pankaj",
  "email": "pankaj@example.com",
  "password": "test1234"
}

**User Login**
POST /api/login

{
  "email": "pankaj@example.com",
  "password": "test1234"
}

Response:


{
  "token": "<JWT_TOKEN>"
}
📘 **Create a Book**
POST /api/books
(Requires Token)


{
  "title": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "genre": "Finance"
}
🔍 **Search Books**
GET /api/books/search?q=rich

📖 Get All Books
GET /api/books?page=1&limit=10

📝 Add Review to Book
POST /api/books/:id/reviews
(Requires Token)

{
  "rating": 5,
  "comment": "A great financial perspective."
}
✏️ **Update Review**
PUT /api/books/reviews/:reviewId
(Requires Token)

{
  "rating": 4,
  "comment": "Updated after second read."
}
❌ **Delete Review**
DELETE /api/books/reviews/:reviewId
(Requires Token)

🧠 **Design Decisions & Assumptions**
JWT-based authentication for secure access to user-specific routes.

BCrypt is used for password hashing to ensure security.

Role-based ownership: Only the user who created a review can edit/delete it.

Books are public: No authentication required to view or search books.

Pagination: Implemented in getBooks and getReviewsByBook routes.

Separation of concerns: Controllers, services, models, and middleware are modularized.

🗃️ **Database Schema Overview
👤 User**

{
  username: String,
  email: String,
  password: String (hashed)
}
📕 **Book**

Edit
{
  title: String,
  author: String,
  genre: String,
  reviews: [ObjectId] // references Review
}
✍️ **Review**

{
  book: ObjectId,  // Book reference
  user: ObjectId,  // User reference
  rating: Number,  // 1 to 5
  comment: String,
  timestamps: true
}
📂 **Project Structure**

src/
├── controllers/       # Request handlers
├── services/          # Business logic
├── routes/            # Express route definitions
├── models/            # Mongoose models
├── interfaces/        # TypeScript interfaces
├── middleware/        # Auth middleware
├── config/            # Database config
└── index.ts           # Entry point
✅ Checklist for Recruiter/Reviewer
 Pull the repo

 Run npm install

 Create .env using .env.example

 Start with npm run dev

 Visit http://localhost:5000

 Test APIs using Postman or curl (see examples above)
