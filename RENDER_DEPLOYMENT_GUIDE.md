# 🚀 Render.com এ Deployment Guide

এই guide অনুসরণ করে আপনি আপনার backend project টি **সম্পূর্ণ বিনামূল্যে** Render.com এ deploy করতে পারবেন।

---

## 📋 Pre-requisites (যা যা লাগবে)

### ✅ আপনার project এ ইতিমধ্যে আছে:
- ✅ `.gitignore` file
- ✅ `package.json` with build & start scripts
- ✅ `render.yaml` configuration
- ✅ TypeScript build setup

### 🔲 আপনার যা দরকার:
1. **GitHub Account** - [github.com](https://github.com) এ signup করুন
2. **MongoDB Atlas Account** - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register) এ signup করুন
3. **Render.com Account** - [render.com](https://render.com) এ signup করুন (GitHub দিয়ে signup করলে সহজ হবে)

---

## 🗄️ Step 1: MongoDB Atlas Setup (Database)

### ১.১ Cluster তৈরি করুন

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) এ login করুন
2. **"Create"** button click করুন
3. **Deployment Type:** Shared (FREE - M0)
4. **Provider:** AWS বা Google Cloud
5. **Region:** Singapore/Mumbai (কাছের region select করুন)
6. **Cluster Name:** যেকোনো নাম দিন (যেমন: `backend2-cluster`)
7. **Create Cluster** button click করুন

### ১.২ Database User তৈরি করুন

1. Left sidebar থেকে **Database Access** এ যান
2. **"Add New Database User"** click করুন
3. **Authentication Method:** Password
4. **Username:** `backend2user` (যেকোনো username)
5. **Password:** একটি strong password তৈরি করুন (**কপি করে রাখুন!**)
6. **Database User Privileges:** Read and write to any database
7. **Add User** click করুন

### ১.৩ Network Access Allow করুন

1. Left sidebar থেকে **Network Access** এ যান
2. **"Add IP Address"** click করুন
3. **"Allow Access from Anywhere"** click করুন (0.0.0.0/0)
4. **Confirm** click করুন

### ১.৪ Connection String নিন

1. Left sidebar থেকে **Database** এ ফিরে যান
2. আপনার cluster এ **"Connect"** button click করুন
3. **"Connect your application"** select করুন
4. **Driver:** Node.js, Version: 5.5 or later
5. **Connection String** copy করুন:
   ```
   mongodb+srv://backend2user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>` এর জায়গায় আপনার আগের password বসান
7. Database name যোগ করুন (ঐচ্ছিক):
   ```
   mongodb+srv://backend2user:yourpassword@cluster0.xxxxx.mongodb.net/backend2?retryWrites=true&w=majority
   ```
8. এই **পুরো connection string টি কপি করে নিরাপদে সংরক্ষণ করুন!** ✅

---

## 📦 Step 2: GitHub এ Code Push করুন

### ২.১ GitHub Repository তৈরি করুন

1. [github.com/new](https://github.com/new) এ যান
2. **Repository name:** `backend2` (বা যেকোনো নাম)
3. **Visibility:** Public বা Private (যেকোনোটি হবে)
4. **Create repository** click করুন

### ২.২ Local Code GitHub এ Push করুন

আপনার project folder এ terminal open করুন এবং commands run করুন:

```bash
# Git initialize করুন
git init

# সব files add করুন
git add .

# First commit করুন
git commit -m "Initial commit - Ready for Render deployment"

# GitHub remote add করুন (নিচের URL টি আপনার repository URL দিয়ে replace করুন)
git remote add origin https://github.com/YOUR_USERNAME/backend2.git

# Main branch এ push করুন
git branch -M main
git push -u origin main
```

**📝 Note:** `YOUR_USERNAME` এর জায়গায় আপনার GitHub username বসান।

---

## 🌐 Step 3: Render.com এ Deploy করুন

### ৩.১ Render.com এ Login করুন

1. [render.com](https://dashboard.render.com/) এ যান
2. **GitHub** দিয়ে sign up/login করুন (recommended)
3. GitHub access authorize করুন

### ৩.২ New Web Service তৈরি করুন

1. Dashboard এ **"New +"** button click করুন
2. **"Web Service"** select করুন
3. **"Connect a repository"** এ আপনার GitHub account connect করুন
4. List থেকে **`backend2`** repository খুঁজে বের করুন
5. **"Connect"** button click করুন

### ৩.৩ Service Settings Configure করুন

নিচের তথ্য fill up করুন:

**Basic Information:**
- **Name:** `backend2` (বা যেকোনো unique নাম)
- **Region:** Singapore (বা কাছের region)
- **Branch:** `main`
- **Root Directory:** (খালি রাখুন)
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:** 
  ```
  npm install && npm run build
  ```
- **Start Command:** 
  ```
  npm run prod
  ```

**Instance Type:**
- **Free** select করুন ✅

### ৩.৪ Environment Variables Add করুন

**"Advanced"** section expand করুন এবং **"Add Environment Variable"** click করে নিচের variables add করুন:

```env
NODE_ENV=production
```

```env
PORT=10000
```

```env
DATABASE_URL=mongodb+srv://backend2user:yourpassword@cluster0.xxxxx.mongodb.net/backend2?retryWrites=true&w=majority
```
**(⚠️ এখানে MongoDB Atlas থেকে পাওয়া connection string বসান!)**

```env
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_long
```
**(⚠️ একটি strong random string বসান, যেমন: `kj34h5k2j34h5kj234h5kjh2345kjh234`)**

```env
JWT_EXPIRES_IN=7d
```

**📝 Note:** আপনার `.env` file এ যদি আরও variables থাকে, সেগুলোও add করুন।

### ৩.৫ Create Web Service

সব কিছু ভালোভাবে check করার পর **"Create Web Service"** button click করুন।

---

## ⏳ Step 4: Build & Deploy হওয়ার জন্য অপেক্ষা করুন

### Build Process:
1. Render আপনার GitHub repository clone করবে
2. `npm install` run করবে (সব dependencies install করবে)
3. `npm run build` run করবে (TypeScript compile হবে)
4. `npm run prod` দিয়ে server start করবে

**⏱️ সময় লাগবে:** প্রথমবার ~2-5 মিনিট

### Build Success হলে:

Dashboard এ আপনি দেখবেন:
- ✅ **Status:** Live (সবুজ dot)
- ✅ **URL:** `https://backend2-xxxx.onrender.com`

---

## ✅ Step 5: Testing (আপনার API Test করুন)

### ৫.১ Browser থেকে Test করুন

আপনার Render URL browser এ open করুন:
```
https://backend2-xxxx.onrender.com
```

আপনি দেখবেন:
```
Server is running with TypeScript & Mongoose! 🚀
```

### ৫.২ API Endpoint Test করুন

**Postman বা Thunder Client দিয়ে:**

```
GET https://backend2-xxxx.onrender.com/api/v1/public/posts
```

অথবা **Terminal থেকে:**
```bash
curl https://backend2-xxxx.onrender.com/api/v1/public/posts
```

---

## 🎯 Step 6: Auto Deployment Setup

**Good News:** Render.com automatic deployment করে! 🎉

এখন যখনই আপনি GitHub এ code push করবেন, automatically Render এ deploy হবে:

```bash
git add .
git commit -m "Update: added new feature"
git push
```

Render dashboard এ automatically নতুন build start হবে।

---

## 🔧 Common Issues & Solutions

### ❌ Build Failed

**Cause:** Dependencies install হয়নি
**Solution:** `package.json` এ `devDependencies` check করুন

### ❌ Application Error / Crash

**Cause:** Environment variables missing
**Solution:** 
1. Render dashboard → আপনার service
2. **Environment** tab → সব variables আছে কিনা check করুন
3. **Manual Deploy → Clear build cache & deploy**

### ❌ Database Connection Failed

**Cause:** MongoDB connection string ভুল বা network access block
**Solution:**
1. MongoDB Atlas → **Network Access** → 0.0.0.0/0 allow করুন
2. Connection string ভালোভাবে check করুন
3. Password এ special character থাকলে URL encode করুন

### ❌ 502 Bad Gateway

**Cause:** Server start হয়নি বা crash করছে
**Solution:**
1. Render → **Logs** tab open করুন
2. Error message দেখুন
3. `PORT` environment variable check করুন

---

## 📊 Monitoring & Logs

### Real-time Logs দেখুন:

1. Render Dashboard → আপনার service
2. **Logs** tab click করুন
3. Real-time logs দেখতে পাবেন

### Metrics দেখুন:

1. **Metrics** tab এ:
   - CPU usage
   - Memory usage
   - Request count
   - Response time

---

## 💡 Pro Tips

### 1️⃣ Custom Domain যোগ করুন (Optional)

Render free plan এ custom domain support করে:
1. **Settings** → **Custom Domain**
2. আপনার domain add করুন
3. DNS settings update করুন

### 2️⃣ CORS Update করুন

আপনার frontend URL `cors` এ add করুন:

```typescript
// src/app.ts
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.vercel.app",
    "https://backend2-xxxx.onrender.com"
  ],
  credentials: true
}));
```

### 3️⃣ Health Check Endpoint

Render automatically `/` route check করে। আপনার route already আছে ✅

### 4️⃣ Sleep Mode এড়ানোর জন্য

Free plan এ 15 মিনিট inactivity তে sleep mode এ চলে যায়।

**Solution:** [UptimeRobot](https://uptimerobot.com) দিয়ে 5 মিনিট পর পর ping করতে পারেন (free)।

---

## 🎉 Congratulations!

আপনার backend successfully Render.com এ deploy হয়েছে! 🚀

**Next Steps:**
1. ✅ Frontend deploy করুন (Vercel/Netlify তে)
2. ✅ Frontend থেকে এই backend URL connect করুন
3. ✅ Testing করুন
4. ✅ Production ready! 🎊

---

## 📞 Support

যদি কোনো সমস্যা হয়:
1. **Render Docs:** [render.com/docs](https://render.com/docs)
2. **MongoDB Docs:** [mongodb.com/docs/atlas](https://www.mongodb.com/docs/atlas/)
3. **Community:** [community.render.com](https://community.render.com)

---

## 📝 Important URLs

- **MongoDB Atlas:** https://cloud.mongodb.com
- **GitHub:** https://github.com
- **Render Dashboard:** https://dashboard.render.com
- **Your Live Backend:** `https://backend2-xxxx.onrender.com` (deployment এর পরে পাবেন)

---

**Made with ❤️ for deployment success!**
