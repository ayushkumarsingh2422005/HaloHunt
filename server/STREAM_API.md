# Stream API Documentation

This document describes the stream management API endpoints for the HaloHunt application.

## Base URL
```
http://localhost:5000/api/v1/streams
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Get Public Streams
```http
GET /api/v1/streams
```

**Query Parameters:**
- `status` (optional): Filter by status (`live`, `scheduled`)
- `hashtag` (optional): Filter by hashtag
- `limit` (optional): Number of streams per page (default: 10)
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 3
  },
  "data": [
    {
      "_id": "stream_id",
      "title": "Stream Title",
      "description": "Stream description",
      "hashtags": ["tag1", "tag2"],
      "status": "live",
      "viewerCount": 150,
      "likesCount": 25,
      "userId": {
        "_id": "user_id",
        "fullName": "User Name",
        "avatar": "avatar_url"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Get Single Stream
```http
GET /api/v1/streams/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "stream_id",
    "title": "Stream Title",
    "description": "Stream description",
    "hashtags": ["tag1", "tag2"],
    "aboutThisStream": "Detailed description",
    "status": "live",
    "viewerCount": 150,
    "likesCount": 25,
    "thumbnail": "thumbnail_url",
    "scheduledAt": "2024-01-01T00:00:00.000Z",
    "startedAt": "2024-01-01T01:00:00.000Z",
    "endedAt": null,
    "userId": {
      "_id": "user_id",
      "fullName": "User Name",
      "avatar": "avatar_url",
      "bio": "User bio"
    },
    "taggedProductId": {
      "_id": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "images": ["image1.jpg", "image2.jpg"]
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 3. Search Streams
```http
GET /api/v1/streams/search?q=search_term
```

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Number of results per page (default: 10)
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "success": true,
  "count": 3,
  "total": 15,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 2
  },
  "data": [
    {
      "_id": "stream_id",
      "title": "Stream Title",
      "description": "Stream description",
      "hashtags": ["tag1", "tag2"],
      "status": "live",
      "userId": {
        "_id": "user_id",
        "fullName": "User Name",
        "avatar": "avatar_url"
      }
    }
  ]
}
```

### Protected Endpoints (Authentication Required)

#### 4. Create Stream
```http
POST /api/v1/streams
```

**Request Body:**
```json
{
  "title": "Stream Title",
  "description": "Stream description",
  "hashtags": ["tag1", "tag2"],
  "aboutThisStream": "Detailed description",
  "thumbnail": "thumbnail_url",
  "scheduledAt": "2024-01-01T00:00:00.000Z",
  "status": "draft",
  "taggedProductId": "product_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "stream_id",
    "title": "Stream Title",
    "description": "Stream description",
    "hashtags": ["tag1", "tag2"],
    "status": "draft",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Stream created successfully"
}
```

#### 5. Get My Streams
```http
GET /api/v1/streams/my-streams
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "stream_id",
      "title": "My Stream",
      "description": "My stream description",
      "status": "draft",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 6. Update Stream
```http
PUT /api/v1/streams/:id
```

**Request Body:** (same as create, all fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "stream_id",
    "title": "Updated Title",
    "description": "Updated description"
  },
  "message": "Stream updated successfully"
}
```

#### 7. Delete Stream
```http
DELETE /api/v1/streams/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Stream deleted successfully"
}
```

#### 8. Start Stream
```http
PUT /api/v1/streams/:id/start
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "stream_id",
    "status": "live",
    "startedAt": "2024-01-01T01:00:00.000Z"
  },
  "message": "Stream started successfully"
}
```

#### 9. End Stream
```http
PUT /api/v1/streams/:id/end
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "stream_id",
    "status": "ended",
    "endedAt": "2024-01-01T02:00:00.000Z"
  },
  "message": "Stream ended successfully"
}
```

#### 10. Like/Unlike Stream
```http
PUT /api/v1/streams/:id/like
```

**Request Body:**
```json
{
  "action": "like"  // or "unlike"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "stream_id",
    "likesCount": 26
  },
  "message": "Stream liked successfully"
}
```

#### 11. Get Stream Statistics
```http
GET /api/v1/streams/:id/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "likesCount": 25,
    "viewerCount": 150,
    "duration": 60,
    "status": "live",
    "startedAt": "2024-01-01T01:00:00.000Z",
    "endedAt": null
  }
}
```

## Stream Status Values

- `draft`: Stream is saved but not published
- `scheduled`: Stream is scheduled for a future time
- `live`: Stream is currently live
- `ended`: Stream has ended
- `cancelled`: Stream was cancelled

## Error Responses

All endpoints return error responses in this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

Common HTTP status codes:
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (stream not found)
- `500`: Internal Server Error

## Testing

Run the test script to verify endpoints:
```bash
cd server
node test-streams.js
```

## Thumbnail Upload

Stream thumbnails are uploaded to AWS S3 using presigned URLs. The process involves:

1. **Get Upload URL**: Request a presigned URL for uploading
2. **Upload to S3**: Upload the file directly to S3 using the presigned URL
3. **Save to Database**: Store the file URL and S3 key in the stream document

### Thumbnail Upload Endpoint

```http
GET /api/v1/media/thumbnail-upload-url?fileType=image/jpeg
```

**Query Parameters:**
- `fileType` (required): MIME type of the file (must be image/*)

**Response:**
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://presigned-s3-url...",
    "key": "thumbnails/uuid.jpg",
    "fileUrl": "https://bucket.s3.amazonaws.com/thumbnails/uuid.jpg"
  }
}
```

### Upload Process

1. **Frontend**: Call the thumbnail upload URL endpoint
2. **Backend**: Generate presigned URL and return it
3. **Frontend**: Upload file directly to S3 using the presigned URL
4. **Frontend**: Include the fileUrl and key when creating/updating streams

### File Validation

- **File Type**: Only image files (image/*) are allowed
- **File Size**: Maximum 10MB
- **Supported Formats**: JPEG, PNG, GIF, WebP

### Thumbnail Cleanup

To prevent orphaned thumbnails in S3, the system provides a cleanup mechanism for cases where a user uploads a thumbnail but doesn't save the stream.

#### Delete Orphaned Thumbnail

```http
DELETE /api/v1/media/thumbnail
```

**Request Body:**
```json
{
  "key": "thumbnails/uuid.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thumbnail deleted successfully"
}
```

**Use Case**: When a user uploads a thumbnail in the LiveModel but then closes the modal without saving the stream, the frontend automatically calls this endpoint to clean up the orphaned file.

## Frontend Integration

The frontend uses the `streamService` and `mediaService` modules to interact with these endpoints. See:
- `halohunt_web/src/app/services/streamService.js` for stream operations
- `halohunt_web/src/app/services/mediaService.js` for file uploads
