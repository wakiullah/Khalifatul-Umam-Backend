# 🔐 Role-Based Access Control (RBAC) - সম্পূর্ণ গাইড

## সমস্যা যা সমাধান করা হয়েছে

আগে `/api/v1/dashboard/users` এ কোন Authorization header ছাড়াই সব ইউজার ডেটা দৃশ্যমান ছিল। এটি একটি **Critical Security Vulnerability** ছিল।

## ✅ সমাধান: Role-Based Access Control

এখন `/api/v1/dashboard/*` রুটগুলি তিনটি লেভেলে সুরক্ষিত:

```
Level 1: Authentication Check
├─ Bearer Token আছে কি?
├─ Token Valid কি?
└─ User exist করে কি?

Level 2: Role Authorization Check
├─ User role: 'admin' বা 'moderator'?
└─ অন্য কোন role এলে 403 Forbidden

Level 3: Route Handler
└─ সফল হলে request প্রসেস করা হয়
```

---

## 🗂️ ফাইল স্ট্রাকচার

### 1. নতুন Middleware: `roleAuth.middleware.ts`
```typescript
// শুধুমাত্র allowed roles দের অ্যাক্সেস দেয়
export const adminOrModerator = roleAuth(['admin', 'moderator']);
export const adminOnly = roleAuth(['admin']);
```

### 2. আপডেট করা: `dashboard-protected.routes.ts`
```typescript
router.use(protect);                // Level 1: Auth check
router.use(adminOrModerator);       // Level 2: Role check
```

### 3. পরিষ্কার করা: `users.router.ts`
- Redundant protect middleware সরানো হয়েছে

---

## 👥 User Roles এবং তাদের অ্যাক্সেস

### Role: 'admin'
✅ সব `/api/v1/dashboard/*` routes access করতে পারে  
✅ Users manage করতে পারে  
✅ সব module এ write করতে পারে  
✅ সর্বোচ্চ permissions

### Role: 'moderator'
✅ সব `/api/v1/dashboard/*` routes access করতে পারে  
✅ Content manage করতে পারে (news, posts, gallery, etc.)  
✅ Forums moderate করতে পারে  
⚠️ Users manage করতে পারে না (create/delete)

### Role: 'user'
❌ Dashboard access পায় না  
❌ কোন content create/update/delete করতে পারে না  
✅ শুধুমাত্র `/api/v1/public/*` থেকে পড়তে পারে

---

## 🧪 টেস্টিং Scenarios

### Scenario 1: Admin User - সবকিছু Access করে

**Setup:**
```bash
# Admin user দিয়ে login করুন
POST /api/v1/auth/login
{
  "phone": "01111111111",  # admin user
  "password": "password"
}

# Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Test 1: Users দেখা**
```bash
GET /api/v1/dashboard/users
Authorization: Bearer eyJhbGc...

✅ Response 200 - Users list দেখাবে
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

**Test 2: নতুন পোস্ট তৈরি**
```bash
POST /api/v1/dashboard/posts
Authorization: Bearer eyJhbGc...
{
  "title": "নতুন পোস্ট",
  "content": "কন্টেন্ট"
}

✅ Response 201 - পোস্ট তৈরি হবে
```

---

### Scenario 2: Moderator User - কন্টেন্ট ম্যানেজ করে

**Setup:**
```bash
# Moderator user login করুন (role: 'moderator')
POST /api/v1/auth/login
{
  "phone": "01234567890",  # moderator user
  "password": "password"
}
```

**Test 1: নিউজ দেখা**
```bash
GET /api/v1/dashboard/news
Authorization: Bearer eyJhbGc...

✅ Response 200 - News list দেখাবে
```

**Test 2: নিউজ তৈরি করা**
```bash
POST /api/v1/dashboard/news
Authorization: Bearer eyJhbGc...
{
  "title": "নতুন খবর",
  "content": "খবরের বিষয়বস্তু"
}

✅ Response 201 - News তৈরি হবে
```

---

### Scenario 3: Regular User - Access Denied

**Setup:**
```bash
# Regular user login করুন (role: 'user')
POST /api/v1/auth/login
{
  "phone": "01712345678",  # regular user
  "password": "password"
}
```

**Test 1: Dashboard Access করতে চায**
```bash
GET /api/v1/dashboard/users
Authorization: Bearer eyJhbGc...

❌ Response 403 - Forbidden
{
  "success": false,
  "message": "Access denied. Required role: admin or moderator. Your role: user"
}
```

**Test 2: কোন তথ্য পরিবর্তন করতে চায**
```bash
POST /api/v1/dashboard/posts
Authorization: Bearer eyJhbGc...
{
  "title": "পোস্ট",
  "content": "কন্টেন্ট"
}

❌ Response 403 - Forbidden
{
  "success": false,
  "message": "Access denied. Required role: admin or moderator. Your role: user"
}
```

---

### Scenario 4: কোন Token দেওয়া হয়নি

```bash
GET /api/v1/dashboard/users
(No Authorization header)

❌ Response 401 - Unauthorized
{
  "success": false,
  "message": "Not authorized to access this route. Please provide a valid token."
}
```

---

### Scenario 5: Invalid Token

```bash
GET /api/v1/dashboard/users
Authorization: Bearer invalid_token_here

❌ Response 401 - Unauthorized
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

---

## 💻 Postman এ টেস্ট করা

### Step 1: Environment Variable সেট করুন

```
variable name: token
value: (আপনি login এর পরে paste করবেন)
```

### Step 2: Login Test

**Request:**
```
POST {{base_url}}/api/v1/auth/login
Headers:
  Content-Type: application/json

Body (raw):
{
  "phone": "01111111111",
  "password": "password"
}
```

**Tests Tab এ যোগ করুন:**
```javascript
pm.environment.set("token", pm.response.json().token);
```

এখন token automatically save হবে।

### Step 3: Dashboard Test

**Request:**
```
GET {{base_url}}/api/v1/dashboard/users

Authorization Tab:
  Type: Bearer Token
  Token: {{token}}
```

---

## 🔄 সম্পূর্ণ Request Flow

```
1. User সাইন আপ করে
   └─ Phone: 01234567890, Password: pwd123, Role: user

2. User লগইন করে
   POST /api/v1/auth/login
   └─ Token পায়: eyJhbGc...

3. User dashboard access করতে চায
   GET /api/v1/dashboard/users
   Header: Authorization: Bearer eyJhbGc...
   │
   ├─ protect middleware চেক করে
   │  └─ Token valid? ✓ Yes
   │  └─ User exist? ✓ Yes
   │
   ├─ adminOrModerator middleware চেক করে
   │  └─ Role: user?
   │  └─ Allowed roles: [admin, moderator]?
   │  └─ ✗ No match!
   │
   └─ Response 403 Forbidden
      "Access denied. Required role: admin or moderator. Your role: user"
```

---

## 📊 Response Status Codes

| Status | অর্থ | কারণ |
|--------|------|------|
| 200/201 | ✅ Success | টোকেন ভ্যালিড এবং রোল সঠিক |
| 400 | ❌ Bad Request | Invalid input data |
| 401 | ❌ Not Authenticated | কোন টোকেন নেই বা invalid |
| 403 | ❌ Not Authorized | টোকেন valid কিন্তু রোল যথাযথ নয় |
| 404 | ❌ Not Found | Resource পাওয়া যায়নি |
| 500 | ❌ Server Error | Internal server error |

---

## 🛡️ এখন কী সুরক্ষিত आছে?

✅ **Authentication Layer**: Bearer token প্রয়োজনীয়  
✅ **Authorization Layer**: Role চেক করা হয়  
✅ **No Data Leaks**: Regular users ডেটা দেখতে পারে না  
✅ **Admin Panel Protected**: শুধুমাত্র admins/mods dashboard access করতে পারে  
✅ **Clear Error Messages**: সমস্যার কারণ জানানো হয়  

---

## 📋 কোন Endpoints কোন Role দরকার?

### Admin Only
- Managing users (create/update/delete)
- System settings
- All admin operations

### Admin + Moderator
- Creating/editing content
- Managing forums
- Publishing news
- Gallery management
- All dashboard operations

### Public (No Role Required)
- Reading content
- Browsing forum
- Viewing news
- Registered apply কখনো করে

---

## 🚀 Production Checklist

- ✅ Role-based access control সেটআপ করা
- ✅ Bearer token authentication কাজ করছে
- ✅ Dashboard restricted to admin/moderator
- ✅ জেনারেল ইউজার সিস্টেম protected
- ⚠️ Frontend টিমকে নতুন structure সম্পর্কে জানান
- ⚠️ আপনার test user দের সঠিক role assign করুন

---

## 🔧 ভবিষ্যতের উন্নতি (Optional)

1. **Role-based route restrictions**: নির্দিষ্ট রুটের জন্য specific roles  
2. **Permission system**: সূক্ষ্ম-সুতো অনুমতি নিয়ন্ত্রণ  
3. **Activity logging**: সব admin actions log করা  
4. **Request throttling**: অত্যধিক অনুরোধ প্রতিরোধ  
5. **Email verification**: ইউজার account activation

---

## ✨ সংক্ষিপ্ত সারসংক্ষেপ

| পূর্বে | এখন |
|------|-----|
| সব ডেটা public | শুধু admin/moderator দেখতে পারে |
| কোন role check | Strict role verification |
| Vulnerable | ✅ Secure |
| বিভ্রান্তিকর | Clear access rules |

---

আপনার API এখন **Production-Ready** security সহ!

