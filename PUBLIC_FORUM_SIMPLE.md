# 🌟 Public Forum - Simple বাংলা গাইড

## কী পরিবর্তন হয়েছে?

আগে: Forum operations `/api/v1/dashboard/*` এ ছিল (শুধু admin/moderator)  
এখন: Forum operations `/api/v1/public/*` এ আছে (যে কেউ logged-in হলে করতে পারে)

---

## সহজ উদাহরণ

### Scenario: একজন User ফোরামে পোস্ট করতে চায

```
Step 1: পড়া (কোন login লাগে না)
  GET /api/v1/public/forum/posts
  ↓
  সব পোস্ট দেখা যায়

Step 2: Login করা
  POST /api/v1/auth/login (phone, password)
  ↓
  Token পায়

Step 3: পোস্ট তৈরি করা (token দিয়ে)
  POST /api/v1/public/forum/posts + Token
  ↓
  নতুন পোস্ট যুক্ত হয়

Step 4: Comment করা (token দিয়ে)
  POST /api/v1/public/forum/comments + Token
  ↓
  Comment যুক্ত হয়
```

---

## নতুন Endpoints

| কাজ | URL | Token দরকার? |
|-----|-----|---|
| পোস্ট পড়া | `/public/forum/posts` | না |
| পোস্ট লেখা | `/public/forum/posts` | **হ্যাঁ** |
| পোস্ট এডিট | `/public/forum/posts/:id` | **হ্যাঁ** |
| পোস্ট ডিলিট | `/public/forum/posts/:id` | **হ্যাঁ** |
| Comments পড়া | `/public/forum/comments` | না |
| Comments লেখা | `/public/forum/comments` | **হ্যাঁ** |
| Comments এডিট | `/public/forum/comments/:id` | **হ্যাঁ** |
| Comments ডিলিট | `/public/forum/comments/:id` | **হ্যাঁ** |
| Opinion শেয়ার করা | `/public/opinions` | **হ্যাঁ** |

---

## দ্রুত Test

### সবার জন্য পড়া (কোন login)
```bash
curl http://localhost:5000/api/v1/public/forum/posts
✅ কাজ করবে
```

### User পোস্ট তৈরি (login দেখান)
```bash
# 1. Login করুন
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"01712345678","password":"password"}'

# Token পাবেন - copy করুন

# 2. Token দিয়ে পোস্ট তৈরি করুন
curl -X POST http://localhost:5000/api/v1/public/forum/posts \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"আমার পোস্ট","content":"বিষয়বস্তু"}'

✅ পোস্ট তৈরি হবে
```

### Token ছাড়া পোস্ট তৈরি (ব্যর্থ)
```bash
curl -X POST http://localhost:5000/api/v1/public/forum/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"আমার পোস্ট","content":"বিষয়বস্তু"}'

❌ 401 Error
```

---

## ফ্রন্টএন্ডে কোড

```javascript
// Forum posts দেখা (সবার জন্য)
const posts = await fetch('/api/v1/public/forum/posts');

// Login করা
const token = await login('01712345678', 'password');

// নতুন পোস্ট তৈরি (logged-in user)
const newPost = await fetch('/api/v1/public/forum/posts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'আমার পোস্ট',
    content: 'বিষয়বস্তু'
  })
});

// Comment যোগ করা
const comment = await fetch('/api/v1/public/forum/comments', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'ভালো পোস্ট!',
    postId: 'POST_ID'
  })
});
```

---

## এখন সুবিধা

✅ User login করে সরাসরি forum use করতে পারে  
✅ `/public/*` থেকে সব forum operations সম্ভব  
✅ Protected (token দিয়ে সুরক্ষিত)  
✅ সহজ ও সুবিধাজনক  
✅ Admin-only না লাগে  

---

## মনে রাখবেন

- `GET` → কোন token লাগে না
- `POST/PATCH/DELETE` → token দরকার
- Token = Bearer <আপনার_token>
- Invalid token → 401 error
- No token → 401 error

**সব সেটআপ সম্পন্ন! 🚀**

