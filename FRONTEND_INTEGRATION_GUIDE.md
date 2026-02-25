# 🔐 Authentication Integration Guide for Frontend

## 📚 Overview

The backend now supports Bearer token authentication for all protected routes. Frontend sends the token in the `Authorization` header after login.

---

## 🔑 Authentication Flow

### Step 1: User Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "phone": "01234567890",
  "password": "myPassword123"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Step 2: Store Token
Save the token in:
- **localStorage** (for persistence across sessions)
- **sessionStorage** (for session-only storage)
- **Memory** (if using auth context provider)

### Step 3: Send Token in Protected Requests
For all protected routes, include the Authorization header:

```javascript
headers: {
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
}
```

---

## 📖 Protected Routes List

### ✅ Authentication Required Routes

#### Biography Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/biography` | Read biography (Public) |
| **POST** | `/api/v1/dashboard/biography` | Create biography ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/biography` | Update biography ⚠️ **REQUIRES TOKEN** |

#### Books Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/books` | List books (Public) |
| **POST** | `/api/v1/dashboard/books` | Add book ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/books/:id` | Update book ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/books/:id` | Delete book ⚠️ **REQUIRES TOKEN** |

#### Forum Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/forum/stats` | Forum statistics (Public) |
| GET | `/api/v1/dashboard/forum/posts` | List posts (Public) |
| **POST** | `/api/v1/dashboard/forum/posts` | Create post ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/forum/posts/:id` | Update post ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/forum/posts/:id` | Delete post ⚠️ **REQUIRES TOKEN** |
| GET | `/api/v1/dashboard/forum/comments` | Get comments (Public) |
| **PATCH** | `/api/v1/dashboard/forum/comments/:id` | Update comment ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/forum/comments/:id` | Delete comment ⚠️ **REQUIRES TOKEN** |
| GET | `/api/v1/dashboard/forum/categories` | List categories (Public) |
| **POST** | `/api/v1/dashboard/forum/categories` | Create category ⚠️ **REQUIRES TOKEN** |

#### Gallery Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/gallery` | List gallery items (Public) |
| **POST** | `/api/v1/dashboard/gallery` | Add gallery item ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/gallery/:id` | Update gallery item ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/gallery/:id` | Delete gallery item ⚠️ **REQUIRES TOKEN** |

#### News Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/news` | List news (Public) |
| GET | `/api/v1/dashboard/news/:id` | Read single news (Public) |
| **POST** | `/api/v1/dashboard/news` | Create news ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/news/:id` | Update news ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/news/:id` | Delete news ⚠️ **REQUIRES TOKEN** |

#### Posts Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/posts` | List posts (Public) |
| GET | `/api/v1/dashboard/posts/:id` | Read single post (Public) |
| **POST** | `/api/v1/dashboard/posts` | Create post ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/posts/:id` | Update post ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/posts/:id` | Delete post ⚠️ **REQUIRES TOKEN** |

#### Sayings Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/sayings` | List sayings (Public) |
| **POST** | `/api/v1/dashboard/sayings` | Add saying ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/sayings/:id` | Update saying ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/sayings/:id` | Delete saying ⚠️ **REQUIRES TOKEN** |

#### Settings Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/settings` | Get settings (Public) |
| **PATCH** | `/api/v1/dashboard/settings` | Update settings ⚠️ **REQUIRES TOKEN** |

#### Download Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/dashboard/downloads` | List downloads (Public) |
| PATCH | `/api/v1/dashboard/downloads/:id/count` | Increment download count (Public) |
| **POST** | `/api/v1/dashboard/downloads` | Create download ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/downloads/:id` | Update download ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/downloads/:id` | Delete download ⚠️ **REQUIRES TOKEN** |

#### Opinions Module
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/opinions` | List opinions (Public) |
| **POST** | `/api/v1/opinions` | Create opinion ⚠️ **REQUIRES TOKEN** |

#### Users Module
| Method | Route | Purpose |
|--------|-------|---------|
| **GET** | `/api/v1/dashboard/users` | List users ⚠️ **REQUIRES TOKEN** |
| **POST** | `/api/v1/dashboard/users` | Create user ⚠️ **REQUIRES TOKEN** |
| **PATCH** | `/api/v1/dashboard/users/:id` | Update user role ⚠️ **REQUIRES TOKEN** |
| **DELETE** | `/api/v1/dashboard/users/:id` | Delete user ⚠️ **REQUIRES TOKEN** |

#### Members Module
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v1/members` | Apply for membership (Public) |
| **GET** | `/api/v1/members` | View applications ⚠️ **REQUIRES TOKEN** |

#### Auth Module
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v1/auth/register` | Register new user (Public) |
| POST | `/api/v1/auth/login` | Login (Public) |
| **GET** | `/api/v1/auth/me` | Get current user info ⚠️ **REQUIRES TOKEN** |
| **GET** | `/api/v1/auth/logout` | Logout ⚠️ **REQUIRES TOKEN** |

---

## 💻 Frontend Implementation Examples

### React Example with Axios

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
export const loginUser = async (phone, password) => {
  try {
    const response = await api.post('/auth/login', { phone, password });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data);
    throw error;
  }
};

// Create a blog post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/dashboard/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Post creation failed:', error.response?.data);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error.response?.data);
    throw error;
  }
};
```

### Fetch API Example

```javascript
const API_BASE = 'http://localhost:5000/api/v1';

// Helper function to get headers
function getHeaders(includeAuth = true) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

// Login
async function login(phone, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify({ phone, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('authToken', data.token);
  }
  return data;
}

// Create a blog post
async function createPost(postData) {
  const response = await fetch(`${API_BASE}/dashboard/posts`, {
    method: 'POST',
    headers: getHeaders(true), // Include auth
    body: JSON.stringify(postData)
  });
  
  return response.json();
}

// Get current user
async function getCurrentUser() {
  const response = await fetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: getHeaders(true)
  });
  
  return response.json();
}
```

---

## ❌ Error Handling

### 401 Unauthorized
When token is missing or invalid:
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please provide a valid token."
}
```

**Action**: Redirect user to login page

### 400 Bad Request
When request data is invalid:
```json
{
  "success": false,
  "message": "Please provide phone number and password"
}
```

**Action**: Show validation error to user

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

**Action**: Show error message and retry later

---

## 🔒 Security Best Practices

1. ✅ Always use HTTPS in production
2. ✅ Store token securely (consider httpOnly cookies on backend)
3. ✅ Add token expiration check
4. ✅ Implement token refresh mechanism
5. ✅ Clear token on logout
6. ✅ Never log tokens in console in production
7. ✅ Use environment variables for API base URL

---

## 📋 Token Details

**Token Expiry**: 24 hours (1 day)

**Payload Structure** (decoded):
```json
{
  "id": "user_mongodb_id",
  "role": "admin|moderator|user",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

## 🧪 Testing Protected Routes

### Using cURL

```bash
# 1. Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"01234567890","password":"password123"}'

# 2. Copy the token from response

# 3. Create a post with token
curl -X POST http://localhost:5000/api/v1/dashboard/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Content here"}'
```

### Using Postman

1. Perform login request in "Login" tab
2. Copy token from response
3. In next request, go to "Authorization" tab
4. Select "Bearer Token" type
5. Paste token in the token field
6. Send request

---

## 🔄 Token Refresh Strategy

Since token expires in 24 hours, implement a refresh mechanism:

```javascript
// Check if token will expire soon
function shouldRefreshToken() {
  const token = localStorage.getItem('authToken');
  const decoded = jwt_decode(token); // Use jwt-decode package
  const expiryTime = decoded.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  
  // Refresh if less than 1 hour remaining
  return (expiryTime - currentTime) < (60 * 60 * 1000);
}

// Call this before making API requests
if (shouldRefreshToken()) {
  // Implement a refresh endpoint on backend
  // For now, redirect to login
  window.location.href = '/login';
}
```

