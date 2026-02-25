# 🌐 Complete API Routes Documentation

## Base URL
```
http://localhost:5000/api/v1
```

---

## 🔐 Key
- 🔒 **REQUIRES AUTH** - Must include Bearer token in Authorization header
- 🔓 **PUBLIC** - Anyone can access without login

---

## 📚 API Endpoints

### 1. Authentication Routes (`/auth`)

#### Register New User
```
POST /auth/register
🔓 PUBLIC

Request Body:
{
  "phone": "01234567890",
  "password": "password123",
  "role": "user" // optional, default: "user"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGc...",
  "data": {
    "_id": "MongoDB_ID",
    "phone": "01234567890",
    "role": "user"
  }
}
```

#### Login
```
POST /auth/login
🔓 PUBLIC

Request Body:
{
  "phone": "01234567890",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGc..."
}
```

#### Get Current User
```
GET /auth/me
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {
    "_id": "MongoDB_ID",
    "phone": "01234567890",
    "role": "admin",
    "createdAt": "2024-02-23T10:00:00Z",
    "updatedAt": "2024-02-23T10:00:00Z"
  }
}
```

#### Logout
```
GET /auth/logout
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 2. Users Routes (`/dashboard/users`)

#### Get All Users
```
GET /dashboard/users
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "phone": "01234567890",
      "role": "user",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create User
```
POST /dashboard/users
🔒 REQUIRES AUTH

Request Body:
{
  "phone": "01987654321",
  "password": "password123",
  "role": "moderator"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update User Role
```
PATCH /dashboard/users/:id
🔒 REQUIRES AUTH

Request Body:
{
  "role": "admin"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete User
```
DELETE /dashboard/users/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 3. Biography Routes (`/dashboard/biography`)

#### Get Biography
```
GET /dashboard/biography
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": {
    "_id": "MongoDB_ID",
    "title": "Biography Title",
    "content": "Biography content here",
    "createdAt": "2024-02-23T10:00:00Z"
  }
}
```

#### Create Biography
```
POST /dashboard/biography
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Biography Title",
  "content": "Biography content here"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Biography
```
PATCH /dashboard/biography
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

---

### 4. Books Routes (`/dashboard/books`)

#### Get All Books
```
GET /dashboard/books
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book description",
      "publishDate": "2024-02-23",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create Book
```
POST /dashboard/books
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description",
  "publishDate": "2024-02-23"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Book
```
PATCH /dashboard/books/:id
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "author": "Updated Author"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Book
```
DELETE /dashboard/books/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 5. Forum Routes (`/dashboard/forum`)

#### Get Forum Statistics
```
GET /dashboard/forum/stats
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": {
    "totalPosts": 42,
    "totalComments": 156,
    "totalCategories": 5
  }
}
```

#### Get Posts
```
GET /dashboard/forum/posts
🔓 PUBLIC

Query Parameters (optional):
- category: string
- limit: number
- skip: number

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "title": "Post Title",
      "content": "Post content",
      "category": "Category ID",
      "createdBy": "User ID",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create Post
```
POST /dashboard/forum/posts
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Post Title",
  "content": "Post content",
  "category": "Category ID"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Post
```
PATCH /dashboard/forum/posts/:id
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Post
```
DELETE /dashboard/forum/posts/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

#### Get Comments
```
GET /dashboard/forum/comments
🔓 PUBLIC

Query Parameters (optional):
- postId: string
- limit: number
- skip: number

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "content": "Comment text",
      "postId": "Post ID",
      "author": "User ID",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Update Comment
```
PATCH /dashboard/forum/comments/:id
🔒 REQUIRES AUTH

Request Body:
{
  "content": "Updated comment"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Comment
```
DELETE /dashboard/forum/comments/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

#### Get Categories
```
GET /dashboard/forum/categories
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "name": "Category Name",
      "description": "Category description",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create Category
```
POST /dashboard/forum/categories
🔒 REQUIRES AUTH

Request Body:
{
  "name": "New Category",
  "description": "Category description"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

---

### 6. Gallery Routes (`/dashboard/gallery`)

#### Get Gallery Items
```
GET /dashboard/gallery
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "title": "Image Title",
      "imageUrl": "https://...",
      "description": "Image description",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create Gallery Item
```
POST /dashboard/gallery
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Image Title",
  "imageUrl": "https://...",
  "description": "Image description"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Gallery Item
```
PATCH /dashboard/gallery/:id
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "description": "Updated description"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Gallery Item
```
DELETE /dashboard/gallery/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 7. News Routes (`/dashboard/news`)

#### Get All News
```
GET /dashboard/news
🔓 PUBLIC

Query Parameters (optional):
- limit: number
- skip: number

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "title": "News Title",
      "content": "News content",
      "publishDate": "2024-02-23",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Get News by ID
```
GET /dashboard/news/:id
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Create News
```
POST /dashboard/news
🔒 REQUIRES AUTH

Request Body:
{
  "title": "News Title",
  "content": "News content",
  "publishDate": "2024-02-23"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update News
```
PATCH /dashboard/news/:id
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete News
```
DELETE /dashboard/news/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 8. Posts Routes (`/dashboard/posts`)

#### Get All Posts
```
GET /dashboard/posts
🔓 PUBLIC

Query Parameters (optional):
- limit: number
- skip: number

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "title": "Post Title",
      "content": "Post content",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Get Post by ID
```
GET /dashboard/posts/:id
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Create Post
```
POST /dashboard/posts
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Post Title",
  "content": "Post content"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Post
```
PATCH /dashboard/posts/:id
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Post
```
DELETE /dashboard/posts/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 9. Sayings Routes (`/dashboard/sayings`)

#### Get All Sayings
```
GET /dashboard/sayings
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "text": "Saying text",
      "author": "Author name",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create Saying
```
POST /dashboard/sayings
🔒 REQUIRES AUTH

Request Body:
{
  "text": "Saying text",
  "author": "Author name"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Saying
```
PATCH /dashboard/sayings/:id
🔒 REQUIRES AUTH

Request Body:
{
  "text": "Updated text",
  "author": "Updated author"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Saying
```
DELETE /dashboard/sayings/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 10. Settings Routes (`/dashboard/settings`)

#### Get Settings
```
GET /dashboard/settings
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": {
    "_id": "MongoDB_ID",
    "siteName": "Site Name",
    "siteDescription": "Description",
    "contactEmail": "email@example.com",
    "updatedAt": "2024-02-23T10:00:00Z"
  }
}
```

#### Update Settings
```
PATCH /dashboard/settings
🔒 REQUIRES AUTH

Request Body:
{
  "siteName": "Updated Site Name",
  "siteDescription": "Updated description",
  "contactEmail": "newemail@example.com"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

---

### 11. Downloads Routes (`/dashboard/downloads`)

#### Get All Downloads
```
GET /dashboard/downloads
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "title": "Download Title",
      "url": "https://...",
      "downloadCount": 42,
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Increment Download Count
```
PATCH /dashboard/downloads/:id/count
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": {
    "downloadCount": 43
  }
}
```

#### Create Download
```
POST /dashboard/downloads
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Download Title",
  "url": "https://...",
  "description": "Download description"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Update Download
```
PATCH /dashboard/downloads/:id
🔒 REQUIRES AUTH

Request Body:
{
  "title": "Updated Title",
  "url": "https://..."
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

#### Delete Download
```
DELETE /dashboard/downloads/:id
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": {}
}
```

---

### 12. Opinions Routes (`/opinions`)

#### Get All Opinions
```
GET /opinions
🔓 PUBLIC

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "opinion": "Opinion text",
      "author": "Author name",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

#### Create Opinion
```
POST /opinions
🔒 REQUIRES AUTH

Request Body:
{
  "opinion": "Opinion text",
  "author": "Author name"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

---

### 13. Members Routes (`/members`)

#### Create Member Application
```
POST /members
🔓 PUBLIC

Request Body:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "01234567890",
  "message": "Why I want to join"
}

Response (201):
{
  "success": true,
  "data": { ... }
}
```

#### Get All Applications
```
GET /members
🔒 REQUIRES AUTH

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "MongoDB_ID",
      "name": "Full Name",
      "email": "email@example.com",
      "phone": "01234567890",
      "status": "pending",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  ]
}
```

---

## 🔄 HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PATCH, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## 📋 Request/Response Format

### Standard Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

---

