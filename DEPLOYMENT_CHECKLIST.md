# 📋 Render.com Deployment Checklist

এই checklist অনুসরণ করে নিশ্চিত করুন যে সব কিছু ঠিক আছে।

---

## ✅ Phase 1: MongoDB Atlas (Database Setup)

- [ ] MongoDB Atlas account তৈরি করেছেন
- [ ] FREE M0 Cluster create করেছেন
- [ ] Database User তৈরি করেছেন (username + password)
- [ ] Network Access: 0.0.0.0/0 allow করেছেন
- [ ] Connection String copy করেছেন এবং save করেছেন
  ```
  mongodb+srv://username:password@cluster.xxxxx.mongodb.net/dbname
  ```

---

## ✅ Phase 2: GitHub (Code Repository)

- [ ] GitHub account আছে
- [ ] নতুন repository তৈরি করেছেন (public/private)
- [ ] Local project এ git init করেছেন
- [ ] All files add করেছেন: `git add .`
- [ ] Commit করেছেন: `git commit -m "Initial commit"`
- [ ] Remote add করেছেন: `git remote add origin <url>`
- [ ] Push করেছেন: `git push -u origin main`

---

## ✅ Phase 3: Project Files (Ready for Deployment)

এই files automatically তৈরি হয়েছে:

- [x] `.gitignore` - Git থেকে sensitive files hide করে
- [x] `render.yaml` - Render configuration
- [x] `package.json` - Build scripts updated
- [x] `RENDER_DEPLOYMENT_GUIDE.md` - বিস্তারিত guide

---

## ✅ Phase 4: Render.com (Deployment)

- [ ] Render.com account তৈরি করেছেন (GitHub দিয়ে)
- [ ] New Web Service তৈরি করেছেন
- [ ] GitHub repository connect করেছেন
- [ ] Build Command set করেছেন: `npm install && npm run build`
- [ ] Start Command set করেছেন: `npm run prod`
- [ ] Free instance type select করেছেন

---

## ✅ Phase 5: Environment Variables

Render.com এ নিচের environment variables add করেছেন:

- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `DATABASE_URL=mongodb+srv://...` (MongoDB connection string)
- [ ] `JWT_SECRET=<strong-random-string>`
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `FRONTEND_URL=https://your-frontend-url.com` (optional, পরে add করবেন)

---

## ✅ Phase 6: Deploy & Test

- [ ] "Create Web Service" button click করেছেন
- [ ] Build successful হয়েছে (2-5 মিনিট)
- [ ] Status "Live" (green) দেখাচ্ছে
- [ ] Browser থেকে test করেছেন: `https://your-app.onrender.com`
- [ ] API endpoint test করেছেন: `/api/v1/public/posts`

---

## ✅ Phase 7: Post-Deployment

- [ ] Render logs check করেছেন (কোনো error নেই)
- [ ] Database connection successful
- [ ] API endpoints working
- [ ] Frontend URL CORS এ add করেছেন (যদি frontend ready থাকে)

---

## 🚨 Common Mistakes

### ❌ পরিহার করুন:

1. `.env` file GitHub এ push করা (`.gitignore` এ আছে ✅)
2. MongoDB connection string এ password encode করতে ভুলে যাওয়া
3. Environment variables Render এ add করতে ভুলে যাওয়া
4. Network Access MongoDB তে restrict করে রাখা
5. Build command ভুল দেওয়া

---

## 📝 Important URLs to Save

```
MongoDB Atlas Dashboard: https://cloud.mongodb.com
GitHub Repository: https://github.com/YOUR_USERNAME/backend2
Render Dashboard: https://dashboard.render.com
Your Live Backend URL: https://backend2-xxxx.onrender.com (after deployment)
```

---

## 🎯 Next Steps After Successful Deployment

1. **Frontend Deploy করুন:**
   - Vercel.com (Next.js/React এর জন্য best)
   - Netlify.com (alternative)

2. **Frontend এ Backend URL Add করুন:**

   ```javascript
   const API_URL = "https://backend2-xxxx.onrender.com/api/v1";
   ```

3. **CORS Update করুন:**
   - Render → Environment variables
   - `FRONTEND_URL` add করুন
   - Redeploy করুন

4. **Testing:**
   - সব API endpoints test করুন
   - Authentication test করুন
   - Database CRUD operations test করুন

---

## 💡 Pro Tips

### Keep Render Service Awake:

Free plan এ 15 min inactive হলে sleep mode এ যায়। [UptimeRobot](https://uptimerobot.com) দিয়ে 5 মিনিট interval এ ping করতে পারেন।

### Monitor Your App:

- Render Dashboard → Logs (real-time)
- Render Dashboard → Metrics (CPU, Memory)
- MongoDB Atlas → Monitoring

### Auto Deploy:

GitHub এ push করলেই automatically deploy হবে! 🎉

```bash
git add .
git commit -m "Feature: added something"
git push
```

---

**🎊 Best of luck with your deployment!**
