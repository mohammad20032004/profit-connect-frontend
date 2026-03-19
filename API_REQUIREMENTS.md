# قائمة APIs المطلوبة من الـ Backend - ProfitConnect

## 1️⃣ APIs المصادقة والمستخدم (Authentication & User)

### تسجيل الدخول
- **Endpoint:** `POST /api/auth/login`
- **الوصف:** تسجيل دخول المستخدم
- **البيانات المرسلة:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "token": "JWT token",
    "user": {
      "id": "string",
      "email": "string",
      "username": "string",
      "profile": {
        "fullname": "string",
        "headline": "string",
        "avatar": "string",
        "location": "string",
        "bio": "string"
      }
    }
  }
  ```

### التسجيل (Signup)
- **Endpoint:** `POST /api/auth/signup`
- **الوصف:** إنشاء حساب مستخدم جديد
- **البيانات المرسلة:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string (اختياري)",
    "industry": "string",
    "yearsOfExperience": "number",
    "skills": ["array of strings"]
  }
  ```
- **البيانات المرجعة:** نفس استجابة login

### تحديث الملف الشخصي
- **Endpoint:** `PUT /api/user/profile`
- **الوصف:** تحديث بيانات الملف الشخصي
- **البيانات المرسلة:**
  ```json
  {
    "fullname": "string",
    "headline": "string",
    "bio": "string",
    "location": "string",
    "skills": ["array of strings"],
    "avatar": "string (URL or file)"
  }
  ```

### الحصول على بيانات المستخدم
- **Endpoint:** `GET /api/user/profile`
- **الوصف:** الحصول على بيانات الملف الشخصي الحالي

---

## 2️⃣ APIs الوظائف (Jobs)

### الحصول على قائمة الوظائف
- **Endpoint:** `GET /api/jobs`
- **المعاملات (Query Parameters):**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `search`: string (اختياري)
  - `location`: string (اختياري)
  - `salary_min`: number (اختياري)
  - `salary_max`: number (اختياري)
  - `jobType`: string (Full-time, Part-time, Contract, Remote)
  - `industry`: string (اختياري)
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "title": "string",
        "company": {
          "id": "string",
          "name": "string",
          "logo": "string"
        },
        "location": "string",
        "salary": {
          "min": "number",
          "max": "number",
          "currency": "string"
        },
        "jobType": "string",
        "description": "string",
        "requirements": ["array of strings"],
        "postedDate": "ISO 8601",
        "savedCount": "number"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "pages": "number"
    }
  }
  ```

### الحصول على تفاصيل وظيفة واحدة
- **Endpoint:** `GET /api/jobs/:jobId`
- **البيانات المرجعة:** نفس بيانات الوظيفة من القائمة مع تفاصيل إضافية

### نشر وظيفة جديدة (للشركات)
- **Endpoint:** `POST /api/jobs`
- **البيانات المرسلة:**
  ```json
  {
    "title": "string",
    "description": "string",
    "location": "string",
    "jobType": "string",
    "salary": {
      "min": "number",
      "max": "number",
      "currency": "string"
    },
    "requirements": ["array of strings"],
    "qualifications": ["array of strings"],
    "industry": "string",
    "benefits": ["array of strings"]
  }
  ```

### البحث عن الوظائف
- **Endpoint:** `GET /api/jobs/search`
- **المعاملات:**
  - `q`: string (كلمة البحث)
  - `filters`: object (نفس معاملات القائمة)

### حفظ/إزالة وظيفة من المفضلة
- **Endpoint:** `POST /api/jobs/:jobId/save` أو `DELETE /api/jobs/:jobId/save`
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "isSaved": "boolean"
  }
  ```

### التقديم على وظيفة
- **Endpoint:** `POST /api/jobs/:jobId/apply`
- **البيانات المرسلة:**
  ```json
  {
    "coverLetter": "string (اختياري)",
    "resumeUrl": "string (اختياري)"
  }
  ```

---

## 3️⃣ APIs الشركات (Companies)

### الحصول على قائمة الشركات
- **Endpoint:** `GET /api/companies`
- **المعاملات:**
  - `page`: number
  - `limit`: number
  - `search`: string (اختياري)
  - `industry`: string (اختياري)
  - `location`: string (اختياري)
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "name": "string",
        "logo": "string",
        "industry": "string",
        "location": "string",
        "website": "string",
        "description": "string",
        "followers": "number",
        "openPositions": "number"
      }
    ],
    "pagination": {...}
  }
  ```

### الحصول على تفاصيل الشركة
- **Endpoint:** `GET /api/companies/:companyId`
- **البيانات المرجعة:** بيانات الشركة بالتفصيل مع الوظائف المتاحة

### متابعة/إلغاء متابعة الشركة
- **Endpoint:** `POST /api/companies/:companyId/follow` أو `DELETE /api/companies/:companyId/follow`

---

## 4️⃣ APIs الرواتب والإحصائيات (Salaries & Analytics)

### الحصول على إحصائيات الرواتب
- **Endpoint:** `GET /api/salaries/analytics`
- **المعاملات:**
  - `jobTitle`: string (اختياري)
  - `industry`: string (اختياري)
  - `location`: string (اختياري)
  - `yearsOfExperience`: number (اختياري)
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "data": {
      "average": "number",
      "median": "number",
      "min": "number",
      "max": "number",
      "distribution": {
        "0-50k": "number",
        "50k-100k": "number",
        "100k-150k": "number",
        "150k+": "number"
      },
      "byExperience": [
        {
          "yearsOfExperience": "number",
          "average": "number"
        }
      ]
    }
  }
  ```

### الحصول على رؤى التجربة
- **Endpoint:** `GET /api/salaries/experience-insights`
- **البيانات المرجعة:** بيانات تفصيلية عن الرواتب حسب سنوات الخبرة

---

## 5️⃣ APIs المنشورات (Posts)

### الحصول على المنشورات
- **Endpoint:** `GET /api/posts`
- **المعاملات:**
  - `page`: number
  - `limit`: number
  - `userId`: string (اختياري)
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "author": {
          "id": "string",
          "name": "string",
          "headline": "string",
          "avatar": "string"
        },
        "content": "string",
        "image": "string (اختياري)",
        "createdAt": "ISO 8601",
        "reactions": {
          "likes": "number",
          "comments": "number",
          "reposts": "number"
        },
        "isLiked": "boolean",
        "isCommented": "boolean",
        "comments": ["array of comment objects"]
      }
    ]
  }
  ```

### إنشاء منشور جديد
- **Endpoint:** `POST /api/posts`
- **البيانات المرسلة:**
  ```json
  {
    "content": "string",
    "image": "string (اختياري)",
    "visibility": "public|private|connections"
  }
  ```

### تفاعل مع المنشور (إعجاب)
- **Endpoint:** `POST /api/posts/:postId/like` أو `DELETE /api/posts/:postId/like`

### التعليق على المنشور
- **Endpoint:** `POST /api/posts/:postId/comments`
- **البيانات المرسلة:**
  ```json
  {
    "content": "string"
  }
  ```

### الحصول على التعليقات
- **Endpoint:** `GET /api/posts/:postId/comments`

---

## 6️⃣ APIs الشبكة والاتصالات (Network & Connections)

### الحصول على قائمة المتابعين
- **Endpoint:** `GET /api/network/followers`
- **المعاملات:**
  - `page`: number
  - `limit`: number
  - `userId`: string (اختياري)

### الحصول على قائمة المتابع لهم
- **Endpoint:** `GET /api/network/following`
- **المعاملات:** نفس السابق

### متابعة/إلغاء متابعة مستخدم
- **Endpoint:** `POST /api/network/follow/:userId` أو `DELETE /api/network/follow/:userId`

### الاتصال بمستخدم (طلب اتصال)
- **Endpoint:** `POST /api/network/connect/:userId`
- **الاستجابة:**
  ```json
  {
    "success": true,
    "status": "pending|accepted|rejected"
  }
  ```

### الحصول على الطلبات المعلقة
- **Endpoint:** `GET /api/network/pending-requests`

### قبول/رفض طلب اتصال
- **Endpoint:** `POST /api/network/requests/:requestId/accept` أو `/reject`

### البحث عن المستخدمين
- **Endpoint:** `GET /api/network/search`
- **المعاملات:**
  - `q`: string
  - `skill`: string (اختياري)
  - `industry`: string (اختياري)

---

## 7️⃣ APIs المراسلة (Messaging)

### الحصول على قائمة المحادثات
- **Endpoint:** `GET /api/messages/conversations`
- **المعاملات:**
  - `page`: number
  - `limit`: number
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "participantId": "string",
        "participantName": "string",
        "participantAvatar": "string",
        "lastMessage": "string",
        "lastMessageTime": "ISO 8601",
        "unreadCount": "number"
      }
    ]
  }
  ```

### الحصول على رسائل محادثة معينة
- **Endpoint:** `GET /api/messages/conversations/:conversationId`
- **المعاملات:**
  - `page`: number
  - `limit`: number

### إرسال رسالة
- **Endpoint:** `POST /api/messages/send`
- **البيانات المرسلة:**
  ```json
  {
    "recipientId": "string",
    "content": "string",
    "attachments": ["array of file URLs (اختياري)"]
  }
  ```

### تحديد الرسائل كمقروءة
- **Endpoint:** `PUT /api/messages/conversations/:conversationId/read`

### حذف محادثة
- **Endpoint:** `DELETE /api/messages/conversations/:conversationId`

---

## 8️⃣ APIs الإخطارات (Notifications)

### الحصول على الإخطارات
- **Endpoint:** `GET /api/notifications`
- **المعاملات:**
  - `page`: number
  - `limit`: number
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "type": "post_like|comment|connection_request|new_job|message",
        "title": "string",
        "content": "string",
        "actor": {
          "id": "string",
          "name": "string",
          "avatar": "string"
        },
        "createdAt": "ISO 8601",
        "isRead": "boolean"
      }
    ]
  }
  ```

### تحديد إخطار كمقروء
- **Endpoint:** `PUT /api/notifications/:notificationId/read`

### حذف إخطار
- **Endpoint:** `DELETE /api/notifications/:notificationId`

---

## 9️⃣ APIs البحث العام (Search)

### البحث الشامل
- **Endpoint:** `GET /api/search`
- **المعاملات:**
  - `q`: string (كلمة البحث)
  - `type`: string (users|jobs|companies|posts) - يمكن تحديد أكثر من واحد
  - `limit`: number
- **البيانات المرجعة:**
  ```json
  {
    "success": true,
    "results": {
      "users": [],
      "jobs": [],
      "companies": [],
      "posts": []
    }
  }
  ```

---

## 🔟 APIs الإعدادات والتفضيلات (Settings)

### الحصول على الإعدادات
- **Endpoint:** `GET /api/settings`

### تحديث الإعدادات
- **Endpoint:** `PUT /api/settings`
- **البيانات المرسلة:**
  ```json
  {
    "language": "ar|en",
    "theme": "light|dark",
    "notifications": {
      "email": "boolean",
      "push": "boolean",
      "sms": "boolean"
    },
    "privacy": {
      "profileVisibility": "public|private|connections",
      "allowMessages": "all|connections|none"
    }
  }
  ```

---

## متطلبات عامة لجميع الـ APIs

### رؤوس الطلب (Request Headers):
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### رموز الحالة (HTTP Status Codes):
- `200`: نجح الطلب
- `201`: تم الإنشاء بنجاح
- `400`: خطأ في الطلب
- `401`: غير مصرح (يحتاج تسجيل دخول)
- `403`: ممنوع
- `404`: لم يتم العثور عليه
- `500`: خطأ في الخادم

### صيغة الاستجابة للأخطاء:
```json
{
  "success": false,
  "message": "وصف الخطأ",
  "errors": [
    {
      "field": "اسم الحقل",
      "message": "رسالة الخطأ"
    }
  ]
}
```

---

## ملاحظات مهمة

1. **المصادقة**: جميع الـ APIs (ما عدا auth) تتطلب JWT token
2. **Pagination**: يتم استخدام `page` و `limit` في الـ APIs التي ترجع قوائم
3. **الترتيب**: يمكن إضافة معامل `sort` لترتيب النتائج
4. **الفلاتر**: معظم الـ APIs تدعم الفلاتر الديناميكية
5. **معدل التحديد**: ننصح بـ rate limiting لمنع الإساءة
6. **تخزين مؤقت (Caching)**: استخدم ETag و Cache-Control للأداء الأفضل

---

## الملفات ذات الصلة في المشروع

- `/src/services/apiService.js` - خدمة HTTP العامة
- `/src/constants/api.js` - ثوابت الـ API
- `/src/lib/features/userSlice.js` - إدارة حالة المستخدم
- `/src/components/forms/LoginPage.jsx` - صفحة تسجيل الدخول
- `/src/components/forms/singUp/` - صفحات التسجيل
