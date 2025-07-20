# HaloHunt API Server

Backend API server for HaloHunt application with authentication and user management.

## Features

- User authentication (Email & Google)
- JWT-based authentication
- MongoDB integration with Mongoose
- RESTful API design

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/halohunt
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id
```

3. Run the server:
```
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
  - Request Body: `{ "name": "User Name", "email": "user@example.com", "password": "password123" }`

- **Login User**: `POST /api/auth/login`
  - Request Body: `{ "email": "user@example.com", "password": "password123" }`

- **Google Authentication**: `POST /api/auth/google`
  - Request Body: `{ "tokenId": "google-token-id" }`

- **Get Current User**: `GET /api/auth/session`
  - Headers: `Authorization: Bearer <token>`

- **Logout User**: `GET /api/auth/logout`
  - Headers: `Authorization: Bearer <token>`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. When a user logs in or registers, a token is returned. This token must be included in the Authorization header for protected routes.

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

The API returns consistent error objects with the following format:

```json
{
  "success": false,
  "message": "Error message"
}
``` 