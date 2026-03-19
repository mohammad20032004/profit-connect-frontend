# 📋 قائمة جميع Endpoints - نسخة مختصرة

## ⚠️ ملاحظة هامة
جميع الـ endpoints (ما عدا `/auth/login` و `/auth/signup`) تتطلب:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 🔑 المصادقة (Authentication)

```
1. POST   /auth/login
   Body: { email, password }
   → Returns: { token, refreshToken, user }

2. POST   /auth/signup
   Body: { firstName, lastName, email, password, phone, industry, yearsOfExperience, skills[] }
   → Returns: { token, refreshToken, user }

3. POST   /auth/logout
   → Returns: { success: true }

4. POST   /auth/refresh-token
   → Returns: { token, refreshToken }
```

---

## 👤 الملف الشخصي (User Profile)

```
5. GET    /user/profile
   → Returns: { user data }

6. PUT    /user/profile
   Body: { fullname, headline, bio, location, skills[], avatar }
   → Returns: { updated user }

7. GET    /user/:userId
   → Returns: { user data }
```

---

## 💼 الوظائف (Jobs)

```
8. GET    /jobs
   Query: ?page=1&limit=10&search=&location=&salary_min=&salary_max=&jobType=

9. GET    /jobs/:jobId

10. POST   /jobs
    Body: { title, description, location, jobType, salary, requirements, qualifications }
    → Returns: { job }

11. PUT    /jobs/:jobId
    Body: { ...updated fields }
    → Returns: { updated job }

12. DELETE /jobs/:jobId
    → Returns: { success: true }

13. POST   /jobs/:jobId/apply
    Body: { coverLetter }
    → Returns: { application }

14. DELETE /jobs/:jobId/apply
    → Returns: { success: true }

15. POST   /jobs/:jobId/save
    → Returns: { isSaved: true }

16. DELETE /jobs/:jobId/save
    → Returns: { isSaved: false }

17. GET    /jobs/search
    Query: ?q=developer&filters[location]=Remote
```

---

## 🏢 الشركات (Companies)

```
18. GET    /companies
    Query: ?page=1&limit=10&search=&industry=&location=

19. GET    /companies/:companyId

20. POST   /companies
    Body: { name, industry, location, website, description }

21. PUT    /companies/:companyId
    Body: { ...updated fields }

22. DELETE /companies/:companyId

23. POST   /companies/:companyId/follow
    → Returns: { isFollowing: true }

24. DELETE /companies/:companyId/follow
    → Returns: { isFollowing: false }
```

---

## 💰 الرواتب والإحصائيات (Salaries)

```
25. GET    /salaries/analytics
    Query: ?jobTitle=&industry=&location=&yearsOfExperience=
    → Returns: { statistics, distribution, byExperience[] }

26. GET    /salaries/experience-insights
    Query: ?jobTitle=&industry=&location=
```

---

## 📱 المنشورات (Posts)

```
27. GET    /posts
    Query: ?page=1&limit=10&userId=

28. POST   /posts
    Body: { content, image, visibility }
    → Returns: { post }

29. GET    /posts/:postId

30. PUT    /posts/:postId
    Body: { content }

31. DELETE /posts/:postId

32. POST   /posts/:postId/like
    → Returns: { isLiked: true, likesCount }

33. DELETE /posts/:postId/like
    → Returns: { isLiked: false }

34. POST   /posts/:postId/comments
    Body: { content }
    → Returns: { comment }

35. GET    /posts/:postId/comments
    Query: ?page=1&limit=10

36. PUT    /posts/:postId/comments/:commentId
    Body: { content }

37. DELETE /posts/:postId/comments/:commentId
```

---

## 🌐 الشبكة (Network)

```
38. GET    /network/followers
    Query: ?page=1&limit=10&userId=

39. GET    /network/following
    Query: ?page=1&limit=10

40. GET    /network/search
    Query: ?q=developer&skill=&industry=&location=

41. POST   /network/follow/:userId
    → Returns: { isFollowing: true }

42. DELETE /network/follow/:userId
    → Returns: { isFollowing: false }

43. POST   /network/connect/:userId
    Body: { message }
    → Returns: { request }

44. GET    /network/pending-requests
    Query: ?page=1&limit=10

45. POST   /network/requests/:requestId/accept
    → Returns: { status: 'accepted' }

46. POST   /network/requests/:requestId/reject
    → Returns: { status: 'rejected' }

47. DELETE /network/requests/:requestId
```

---

## 💬 المراسلة (Messaging)

```
48. GET    /messages/conversations
    Query: ?page=1&limit=10

49. GET    /messages/conversations/:conversationId
    Query: ?page=1&limit=10

50. POST   /messages/send
    Body: { recipientId, content, attachments[] }
    → Returns: { message }

51. PUT    /messages/conversations/:conversationId/read

52. DELETE /messages/conversations/:conversationId

53. DELETE /messages/:messageId
```

---

## 🔔 الإخطارات (Notifications)

```
54. GET    /notifications
    Query: ?page=1&limit=10&isRead=

55. PUT    /notifications/:notificationId/read

56. DELETE /notifications/:notificationId

57. PUT    /notifications/read-all
```

---

## 🔍 البحث (Search)

```
58. GET    /search
    Query: ?q=&type=users,jobs,companies,posts&limit=10
    → Returns: { results: { users[], jobs[], companies[], posts[] } }
```

---

## ⚙️ الإعدادات (Settings)

```
59. GET    /settings

60. PUT    /settings
    Body: { language, theme, notifications{}, privacy{} }
```

---

## 📊 ملخص الإحصائيات

| النوع | العدد |
|------|-------|
| Authentication | 4 |
| User Profile | 3 |
| Jobs | 10 |
| Companies | 7 |
| Salaries | 2 |
| Posts | 10 |
| Network | 10 |
| Messaging | 6 |
| Notifications | 4 |
| Search | 1 |
| Settings | 2 |
| **المجموع** | **59** |

---

## 🎨 فلاتر شائعة

### Query Parameters المدعومة:
- `page` - رقم الصفحة (default: 1)
- `limit` - عدد النتائج (default: 10)
- `search` أو `q` - كلمة البحث
- `sort` - الترتيب (مثال: `-createdAt`)
- `filter[key]` - فلاتر ديناميكية

### معاملات Jobs:
- `location` - الموقع
- `salary_min` - أقل راتب
- `salary_max` - أعلى راتب
- `jobType` - نوع الوظيفة
- `industry` - الصناعة

---

## 💾 أمثلة على Request Bodies

### Login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Post
```json
{
  "content": "Hello, world!",
  "image": "https://example.com/image.jpg",
  "visibility": "public"
}
```

### Apply Job
```json
{
  "coverLetter": "I am interested in this position..."
}
```

### Update Profile
```json
{
  "fullname": "Amen Dev",
  "headline": "Full Stack Developer",
  "bio": "Passionate developer",
  "skills": ["React", "Node.js"]
}
```

### Send Message
```json
{
  "recipientId": "user_456",
  "content": "Hello!"
}
```

---

## ✅ HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - نجح |
| 201 | Created - تم الإنشاء |
| 204 | No Content - بدون محتوى |
| 400 | Bad Request - خطأ في الطلب |
| 401 | Unauthorized - غير مصرح |
| 403 | Forbidden - ممنوع |
| 404 | Not Found - لم يجد |
| 422 | Validation Error - خطأ التحقق |
| 500 | Server Error - خطأ الخادم |

---

## 🔐 Response Format

### Success
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Paginated
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## 🔗 Base URL

```
http://localhost:3000/api
```

أو من عند البيئة:
```
process.env.NEXT_PUBLIC_API_URL
```

---

## 🛟 الملفات الإضافية

📌 `API_REQUIREMENTS.md` - التفاصيل الكاملة
📌 `API_DATA_MODELS.md` - نماذج البيانات
📌 `API_IMPLEMENTATION_EXAMPLES.md` - أمثلة الكود
📌 `INTEGRATION_GUIDE.md` - دليل التكامل
📌 `API_SUMMARY.md` - ملخص شامل
