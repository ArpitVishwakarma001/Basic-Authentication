# Basic Authentication & Authorization

This project is a full-stack application demonstrating basic authentication and authorization using Node.js (Express) for the backend and React (Vite) for the frontend.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Features](#backend-features)
  - [File Overview](#backend-file-overview)
  - [Environment Variables](#environment-variables)
- [Frontend](#frontend)
  - [Features](#frontend-features)
  - [File Overview](#frontend-file-overview)
- [Getting Started](#getting-started)
- [License](#license)

---

## Project Structure

```
Basic-Authentication-Authorization/
│
├── backend/
│   ├── assets/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Backend

Node.js + Express REST API for authentication and user profile management.

### Backend Features

- User registration and login
- JWT-based authentication
- Email verification
- Protected profile routes
- MongoDB integration

### Backend File Overview

- **server.js**: Entry point for the Express server.
- **.env**: Environment variables (e.g., DB connection, JWT secret).
- **package.json**: Backend dependencies and scripts.
- **assets/email.template.js**: Email template for verification.
- **config/db.js**: MongoDB connection setup.
- **controllers/profile.controller.js**: Profile-related logic.
- **controllers/user.controller.js**: User registration, login, verification.
- **middlewares/auth.middleware.js**: JWT authentication middleware.
- **middlewares/email.config.js**: Email configuration (e.g., nodemailer).
- **middlewares/email.js**: Email sending logic.
- **models/user.model.js**: Mongoose user schema/model.
- **routes/profile.routes.js**: Profile API routes.
- **routes/user.routes.js**: User API routes.
- **utils/**: Utility functions (if any).

### Environment Variables

Create a `.env` file in the backend directory with the following (example):

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## Frontend

React (Vite) single-page application for user interaction.

### Frontend Features

- Signup, login, and email verification forms
- Protected profile page
- API integration with backend
- Modern React (hooks, functional components)

### Frontend File Overview

- **index.html**: Main HTML file.
- **package.json**: Frontend dependencies and scripts.
- **vite.config.js**: Vite configuration.
- **src/App.jsx**: Main React app component.
- **src/index.css**: Global styles.
- **src/main.jsx**: Entry point for React app.
- **src/apis/FetchUserProfile.jsx**: API call for user profile.
- **src/components/Login.jsx**: Login form component.
- **src/components/Profile.jsx**: Profile page component.
- **src/components/ProfileProtectedRoute.jsx**: Route protection logic.
- **src/components/Signup.jsx**: Signup form component.
- **src/components/VerifyEmail.jsx**: Email verification component.


Here is a summary of the main backend routes, how data enters, and the responses given:

API Routes & Data Flow

1. User Signup
   Route: POST /api/signup
   Request Body: { name, email, password }
   Process:
   Checks for required fields.
   Checks if email is already registered.
   Creates a new user and generates a verification code.
   Sends a verification email.
   Responds with a token and message.
   Response:
   {
   "success": true,
   "message": "Verification email sent. Please check your inbox.",
   "token": "<jwt_token>"
   }
2. Email Verification
   Route: POST /api/verify-email
   Request Body: { code }
   Process:
   Checks for the verification code.
   Finds the user by code.
   Marks user as verified.
   Response:
   {
   "success": true,
   "message": "Email verified successfully",
   "user": { ...userData }
   }
3. User Login
   Route: POST /api/login
   Request Body: { email, password }
   Process:
   Checks for required fields.
   Finds user by email.
   Compares password.
   Checks if email is verified.
   Responds with a token and user data.
   Response:
   {
   "success": true,
   "message": "Login successful",
   "token": "<jwt_token>",
   "user": { ...userData }
   }
4. Get User Profile (Protected)
   Route: GET /api/profile
   Headers: Authorization: Bearer <jwt_token> (or cookie)
   Process:
   Auth middleware checks JWT.
   Fetches user by ID from token.
   Response:
   {
   "success": true,
   "message": "User fetched successfully",
   "user": { ...userData }
   }

## License

This project is licensed under the MIT License.
