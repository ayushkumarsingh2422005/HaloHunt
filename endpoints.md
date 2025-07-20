# HaloHunt API Endpoints

## Authentication Endpoints

### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Code**: 201 CREATED
  - **Content**:
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "User Name",
        "email": "user@example.com",
        "role": "user",
        "profileImage": "default-avatar.jpg"
      }
    }
    ```
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**:
    ```json
    {
      "success": false,
      "message": "User already exists"
    }
    ```

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Login a user
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "User Name",
        "email": "user@example.com",
        "role": "user",
        "profileImage": "default-avatar.jpg"
      }
    }
    ```
- **Error Response**:
  - **Code**: 401 UNAUTHORIZED
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Invalid credentials"
    }
    ```

### Google Authentication
- **URL**: `/api/auth/google`
- **Method**: `POST`
- **Description**: Authenticate user with Google
- **Request Body**:
  ```json
  {
    "tokenId": "google-token-id"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "User Name",
        "email": "user@example.com",
        "role": "user",
        "profileImage": "https://lh3.googleusercontent.com/a/..."
      }
    }
    ```
- **Error Response**:
  - **Code**: 500 INTERNAL SERVER ERROR
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

### Get Current User (Session)
- **URL**: `/api/auth/session`
- **Method**: `GET`
- **Description**: Get currently logged in user
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "User Name",
        "email": "user@example.com",
        "role": "user",
        "profileImage": "default-avatar.jpg",
        "isEmailVerified": false,
        "createdAt": "2023-12-15T12:00:00.000Z",
        "updatedAt": "2023-12-15T12:00:00.000Z"
      }
    }
    ```
- **Error Response**:
  - **Code**: 401 UNAUTHORIZED
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Not authorized to access this route"
    }
    ```

### Logout User
- **URL**: `/api/auth/logout`
- **Method**: `GET`
- **Description**: Logout user and clear cookie
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "success": true,
      "message": "User logged out successfully"
    }
    ```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. When a user logs in or registers, a token is returned. This token must be included in the Authorization header for protected routes.

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```