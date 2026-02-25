# 🗂️ API Route Structure (Updated)

## New Organized Structure

```
/api/v1/
├── /public/*                    ← Public READ routes (GET only)
│   ├── /biography              (GET)
│   ├── /books                  (GET)
│   ├── /downloads              (GET)
│   ├── /forum                  (GET)
│   ├── /gallery                (GET)
│   ├── /news                   (GET)
│   ├── /posts                  (GET)
│   ├── /sayings                (GET)
│   ├── /settings               (GET)
│   └── /opinions               (GET)
│
├── /dashboard/*                 ← Protected WRITE routes (requires token)
│   ├── /biography              (POST, PATCH)
│   ├── /books                  (POST, PATCH, DELETE)
│   ├── /downloads              (POST, PATCH, DELETE)
│   ├── /forum                  (POST, PATCH, DELETE)
│   ├── /gallery                (POST, PATCH, DELETE)
│   ├── /news                   (POST, PATCH, DELETE)
│   ├── /posts                  (POST, PATCH, DELETE)
│   ├── /sayings                (POST, PATCH, DELETE)
│   ├── /settings               (PATCH)
│   └── /users                  (GET, POST, PATCH, DELETE)
│
├── /members/*                   ← Member applications
│   ├── POST /                  (public - create application)
│   └── GET /                   (protected - view applications)
│
└── /auth/*                      ← Authentication
    ├── POST /register          (public)
    ├── POST /login             (public)
    ├── GET /me                 (protected)
    └── GET /logout             (protected)
```

---

## 📚 Detailed Endpoint List

### 🔓 Public Routes (No Authentication Required)

#### Biography
```
GET /api/v1/public/biography        → Get biography
```

#### Books
```
GET /api/v1/public/books            → Get all books
GET /api/v1/public/books/:id        → Get specific book
```

#### Downloads
```
GET /api/v1/public/downloads        → Get all downloads
PATCH /api/v1/public/downloads/:id/count  → Increment download count (public)
```

#### Forum
```
GET /api/v1/public/forum/stats      → Get forum statistics
GET /api/v1/public/forum/posts      → Get all posts
GET /api/v1/public/forum/comments   → Get all comments
GET /api/v1/public/forum/categories → Get all categories
```

#### Gallery
```
GET /api/v1/public/gallery          → Get all gallery items
GET /api/v1/public/gallery/:id      → Get specific gallery item
```

#### News
```
GET /api/v1/public/news             → Get all news
GET /api/v1/public/news/:id         → Get specific news
```

#### Posts
```
GET /api/v1/public/posts            → Get all posts
GET /api/v1/public/posts/:id        → Get specific post
```

#### Sayings
```
GET /api/v1/public/sayings          → Get all sayings
GET /api/v1/public/sayings/:id      → Get specific saying
```

#### Settings
```
GET /api/v1/public/settings         → Get site settings
```

#### Opinions
```
GET /api/v1/public/opinions         → Get all opinions
```

---

### 🔒 Protected Routes (Requires Authentication)

#### Biography (Protected)
```
POST /api/v1/dashboard/biography      → Create biography ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/biography     → Update biography ⚠️ REQUIRES TOKEN
```

#### Books (Protected)
```
POST /api/v1/dashboard/books          → Create book ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/books/:id     → Update book ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/books/:id    → Delete book ⚠️ REQUIRES TOKEN
```

#### Downloads (Protected)
```
POST /api/v1/dashboard/downloads      → Create download ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/downloads/:id → Update download ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/downloads/:id → Delete download ⚠️ REQUIRES TOKEN
```

#### Forum (Protected)
```
POST /api/v1/dashboard/forum/posts    → Create post ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/forum/posts/:id → Update post ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/forum/posts/:id → Delete post ⚠️ REQUIRES TOKEN

POST /api/v1/dashboard/forum/categories → Create category ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/forum/comments/:id → Update comment ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/forum/comments/:id → Delete comment ⚠️ REQUIRES TOKEN
```

#### Gallery (Protected)
```
POST /api/v1/dashboard/gallery        → Create gallery item ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/gallery/:id   → Update gallery item ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/gallery/:id  → Delete gallery item ⚠️ REQUIRES TOKEN
```

#### News (Protected)
```
POST /api/v1/dashboard/news           → Create news ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/news/:id      → Update news ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/news/:id     → Delete news ⚠️ REQUIRES TOKEN
```

#### Posts (Protected)
```
POST /api/v1/dashboard/posts          → Create post ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/posts/:id     → Update post ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/posts/:id    → Delete post ⚠️ REQUIRES TOKEN
```

#### Sayings (Protected)
```
POST /api/v1/dashboard/sayings        → Create saying ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/sayings/:id   → Update saying ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/sayings/:id  → Delete saying ⚠️ REQUIRES TOKEN
```

#### Settings (Protected)
```
PATCH /api/v1/dashboard/settings      → Update settings ⚠️ REQUIRES TOKEN
```

#### Users (Protected)
```
GET /api/v1/dashboard/users           → Get all users ⚠️ REQUIRES TOKEN
POST /api/v1/dashboard/users          → Create user ⚠️ REQUIRES TOKEN
PATCH /api/v1/dashboard/users/:id     → Update user role ⚠️ REQUIRES TOKEN
DELETE /api/v1/dashboard/users/:id    → Delete user ⚠️ REQUIRES TOKEN
```

---

### 👥 Member Routes

#### Create Application (Public)
```
POST /api/v1/members                  → Apply for membership
```

#### View Applications (Protected)
```
GET /api/v1/members                   → View all applications ⚠️ REQUIRES TOKEN (admin)
```

---

### 🔐 Authentication Routes

#### Register (Public)
```
POST /api/v1/auth/register            → Register new user
```

#### Login (Public)
```
POST /api/v1/auth/login               → Login user
```

#### Get Current User (Protected)
```
GET /api/v1/auth/me                   → Get current user info ⚠️ REQUIRES TOKEN
```

#### Logout (Protected)
```
GET /api/v1/auth/logout               → Logout user ⚠️ REQUIRES TOKEN
```

---

## 🔄 How the Routing Works Now

### For GET Requests:
```
GET /api/v1/public/posts
  │
  ├─→ Hit public.routes.ts
  │
  ├─→ onlyAllowGet middleware (✓ GET allowed)
  │
  ├─→ Route to posts.router.ts
  │
  └─→ Return data (no auth required)
```

### For Write Requests (Protected):
```
POST /api/v1/dashboard/posts
  │
  ├─→ Hit dashboard-protected.routes.ts
  │
  ├─→ protect middleware (check token)
  │
  ├─→ Token valid? (✓ if yes)
  │
  ├─→ Route to posts.router.ts
  │
  └─→ Create post
```

### For Write Requests to Public Routes (Blocked):
```
POST /api/v1/public/posts  ❌
  │
  ├─→ Hit public.routes.ts
  │
  ├─→ onlyAllowGet middleware (✗ POST NOT allowed)
  │
  └─→ Return 405 Method Not Allowed
        "Use /api/v1/dashboard instead with authentication"
```

---

## 📋 Important Notes

### 🟢 Green Rules:
- ✅ GET `/api/v1/public/*` works without login
- ✅ Any method to `/api/v1/dashboard/*` requires Bearer token
- ✅ Authentication endpoints work for registration/login

### 🔴 Red Rules:
- ❌ POST/PATCH/DELETE to `/api/v1/public/*` will return 405
- ❌ Missing token to `/api/v1/dashboard/*` returns 401
- ❌ Invalid token gets rejected with 401

---

## 💻 Frontend Examples Now

### Read Public Content (No Auth)
```javascript
// No token needed
const data = await fetch('http://localhost:5000/api/v1/public/posts').then(r => r.json());
```

### Create Content (Requires Auth)
```javascript
const token = localStorage.getItem('token');

// ✅ Correct
await fetch('http://localhost:5000/api/v1/dashboard/posts', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify(postData)
});

// ❌ Wrong - will get 405 Method Not Allowed
await fetch('http://localhost:5000/api/v1/public/posts', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify(postData)
});
```

---

## 🧪 Testing Each Route Type

### Test Public GET (should work):
```bash
curl http://localhost:5000/api/v1/public/posts
# ✅ Returns list of posts
```

### Test Protected POST (should require token):
```bash
curl -X POST http://localhost:5000/api/v1/dashboard/posts
# ❌ Returns 401 Unauthorized

curl -X POST http://localhost:5000/api/v1/dashboard/posts \
  -H "Authorization: Bearer TOKEN"
# ✅ Creates post
```

### Test Public POST (should be blocked):
```bash
curl -X POST http://localhost:5000/api/v1/public/posts
# ❌ Returns 405 Method Not Allowed
```

---

## 📊 Route Summary

| Endpoint Type | Location | Auth Required | HTTP Methods |
|---|---|---|---|
| **Read Content** | `/api/v1/public/*` | No | GET |
| **Create/Update/Delete** | `/api/v1/dashboard/*` | Yes | POST, PATCH, DELETE |
| **Authentication** | `/api/v1/auth/*` | Mixed | POST (public), GET (protected) |
| **Member Applications** | `/api/v1/members` | Mixed | POST (public), GET (protected) |

---

## 🎯 Benefits of This Structure

✅ **Clear separation** - Public vs Protected routes are in different locations  
✅ **Security first** - Public routes can't be used for writes  
✅ **Explicit intent** - Developers know where to go for each operation  
✅ **Easier middleware** - Apply auth to `/dashboard/*` once, not per-route  
✅ **Better scalability** - Easy to add role-based access control later  
✅ **API standards** - Follows REST and industry best practices  

