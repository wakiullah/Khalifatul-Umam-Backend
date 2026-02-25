# Backend API Routes Documentation

নিচে ড্যাশবোর্ড এবং পাবলিক পেজগুলোর জন্য তৈরি করা সমস্ত API রাউট দেওয়া হলো।

---

### 1. Posts Manager (পোস্ট ম্যানেজমেন্ট)

**Base URL:** `/api/posts`

| Action         | Method   | Endpoint         | Description / Payload                                                                                       |
| :------------- | :------- | :--------------- | :---------------------------------------------------------------------------------------------------------- |
| **Get All**    | `GET`    | `/api/posts`     | সব পোস্ট আনবে। <br> **Query:** `?status=published&category=জীবনী&search=keyword&is_featured=true`           |
| **Get Single** | `GET`    | `/api/posts/:id` | একটি নির্দিষ্ট পোস্টের বিস্তারিত আনবে।                                                                      |
| **Create**     | `POST`   | `/api/posts`     | নতুন পোস্ট তৈরি। <br> **Body:** `{ title, content, category, author_name, status, is_featured, image_url }` |
| **Edit**       | `PATCH`  | `/api/posts/:id` | পোস্ট আপডেট। <br> **Body:** `{ title, content, status, ... }`                                               |
| **Delete**     | `DELETE` | `/api/posts/:id` | পোস্ট ডিলিট করবে।                                                                                           |

---

### 2. News Manager (সংবাদ ম্যানেজমেন্ট)

**Base URL:** `/api/news`

| Action         | Method   | Endpoint        | Description / Payload                                                                            |
| :------------- | :------- | :-------------- | :----------------------------------------------------------------------------------------------- |
| **Get All**    | `GET`    | `/api/news`     | পেজিনেশন সহ নিউজ আনবে। <br> **Query:** `?page=1&limit=10&category=Events&search=keyword`         |
| **Get Single** | `GET`    | `/api/news/:id` | নির্দিষ্ট নিউজের বিস্তারিত।                                                                      |
| **Create**     | `POST`   | `/api/news`     | নতুন নিউজ তৈরি। <br> **Body:** `{ title, excerpt, category, author, is_published, is_featured }` |
| **Edit**       | `PATCH`  | `/api/news/:id` | নিউজ আপডেট।                                                                                      |
| **Delete**     | `DELETE` | `/api/news/:id` | নিউজ ডিলিট।                                                                                      |

---

### 3. Books Manager (বই ম্যানেজমেন্ট)

**Base URL:** `/api/books`

| Action      | Method   | Endpoint         | Description / Payload                                                                              |
| :---------- | :------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| **Get All** | `GET`    | `/api/books`     | সব বইয়ের লিস্ট।                                                                                    |
| **Create**  | `POST`   | `/api/books`     | নতুন বই যোগ। <br> **Body:** `{ title, arabic_title, description, volumes, language, is_featured }` |
| **Edit**    | `PATCH`  | `/api/books/:id` | বইয়ের তথ্য বা স্ট্যাটাস আপডেট।                                                                     |
| **Delete**  | `DELETE` | `/api/books/:id` | বই ডিলিট।                                                                                          |

---

### 4. Downloads Manager (ডাউনলোড ম্যানেজমেন্ট)

**Base URL:** `/api/downloads`

| Action      | Method   | Endpoint                   | Description / Payload                                                                   |
| :---------- | :------- | :------------------------- | :-------------------------------------------------------------------------------------- |
| **Get All** | `GET`    | `/api/downloads`           | সব ফাইলের লিস্ট।                                                                        |
| **Create**  | `POST`   | `/api/downloads`           | নতুন ফাইল এন্ট্রি। <br> **Body:** `{ title, file_url, category, file_type, file_size }` |
| **Edit**    | `PATCH`  | `/api/downloads/:id`       | ফাইল আপডেট।                                                                             |
| **Delete**  | `DELETE` | `/api/downloads/:id`       | ফাইল ডিলিট।                                                                             |
| **Count**   | `PATCH`  | `/api/downloads/:id/count` | ডাউনলোড কাউন্ট ১ বাড়াবে।                                                                |

---

### 5. Gallery Manager (গ্যালারি ম্যানেজমেন্ট)

**Base URL:** `/api/gallery`

| Action      | Method   | Endpoint           | Description / Payload                                                      |
| :---------- | :------- | :----------------- | :------------------------------------------------------------------------- |
| **Get All** | `GET`    | `/api/gallery`     | সব ছবি। <br> **Query:** `?category=মাজার শরীফ`                             |
| **Create**  | `POST`   | `/api/gallery`     | নতুন ছবি যোগ। <br> **Body:** `{ title, image_url, category, description }` |
| **Edit**    | `PATCH`  | `/api/gallery/:id` | ছবির তথ্য আপডেট।                                                           |
| **Delete**  | `DELETE` | `/api/gallery/:id` | ছবি ডিলিট।                                                                 |

---

### 6. Forum Manager (ফোরাম ম্যানেজমেন্ট)

**Base URL:** `/api/forum`

| Action           | Method   | Endpoint                  | Description / Payload                                                  |
| :--------------- | :------- | :------------------------ | :--------------------------------------------------------------------- |
| **Stats**        | `GET`    | `/api/forum/stats`        | ফোরামের ড্যাশবোর্ড স্ট্যাটাস (Total posts, comments etc.)              |
| **Get Posts**    | `GET`    | `/api/forum/posts`        | ফোরাম পোস্ট লিস্ট। <br> **Query:** `?category=question&search=keyword` |
| **Create Post**  | `POST`   | `/api/forum/posts`        | নতুন পোস্ট। <br> **Body:** `{ title, content, category, author }`      |
| **Edit Post**    | `PATCH`  | `/api/forum/posts/:id`    | পোস্ট আপডেট বা স্ট্যাটাস চেঞ্জ।                                        |
| **Delete Post**  | `DELETE` | `/api/forum/posts/:id`    | পোস্ট ডিলিট।                                                           |
| **Get Comments** | `GET`    | `/api/forum/comments`     | সব কমেন্ট (মডারেশনের জন্য)।                                            |
| **Edit Comment** | `PATCH`  | `/api/forum/comments/:id` | কমেন্ট অ্যাপ্রুভ/রিজেক্ট। <br> **Body:** `{ status: 'approved' }`      |
| **Del Comment**  | `DELETE` | `/api/forum/comments/:id` | কমেন্ট ডিলিট।                                                          |
| **Categories**   | `GET`    | `/api/forum/categories`   | সব ক্যাটাগরি।                                                          |
| **Add Cat**      | `POST`   | `/api/forum/categories`   | নতুন ক্যাটাগরি তৈরি।                                                   |

---

### 7. Biography Manager (জীবনী ম্যানেজমেন্ট)

**Base URL:** `/api/biography`

| Action      | Method  | Endpoint         | Description / Payload                                                         |
| :---------- | :------ | :--------------- | :---------------------------------------------------------------------------- |
| **Get Bio** | `GET`   | `/api/biography` | জীবনী ডাটা আনবে।                                                              |
| **Create**  | `POST`  | `/api/biography` | প্রথমবার ডাটা তৈরি (যদি না থাকে)।                                             |
| **Update**  | `PATCH` | `/api/biography` | জীবনী আপডেট। <br> **Body:** `{ full_name, description: [], timeline: [...] }` |

---

### 8. Opinions (মতামত - পাবলিক)

**Base URL:** `/api/opinions`

| Action      | Method | Endpoint        | Description / Payload                                                          |
| :---------- | :----- | :-------------- | :----------------------------------------------------------------------------- |
| **Get All** | `GET`  | `/api/opinions` | শুধুমাত্র `isApproved: true` মতামতগুলো আনবে।                                   |
| **Create**  | `POST` | `/api/opinions` | নতুন মতামত জমা দেওয়া। <br> **Body:** `{ name, email, text, rating, location }` |
