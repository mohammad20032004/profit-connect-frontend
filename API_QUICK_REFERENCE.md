# قاموس سريع لـ APIs - ProfitConnect

## Authentication (المصادقة)
```
POST   /api/auth/login           ← تسجيل الدخول
POST   /api/auth/signup          ← التسجيل
POST   /api/auth/logout          ← تسجيل الخروج
POST   /api/auth/refresh-token   ← تحديث التوكن
```

## User Profile (الملف الشخصي)
```
GET    /api/user/profile         ← الحصول على البيانات
PUT    /api/user/profile         ← تحديث البيانات
GET    /api/user/:userId         ← الحصول على ملف مستخدم آخر
```

## Jobs (الوظائف)
```
GET    /api/jobs                 ← قائمة الوظائف
GET    /api/jobs/:jobId          ← تفاصيل الوظيفة
POST   /api/jobs                 ← نشر وظيفة جديدة
PUT    /api/jobs/:jobId          ← تعديل الوظيفة
DELETE /api/jobs/:jobId          ← حذف الوظيفة
POST   /api/jobs/:jobId/apply    ← التقديم على الوظيفة
POST   /api/jobs/:jobId/save     ← حفظ الوظيفة
DELETE /api/jobs/:jobId/save     ← إزالة من المفضلة
GET    /api/jobs/search          ← البحث عن الوظائف
```

## Companies (الشركات)
```
GET    /api/companies            ← قائمة الشركات
GET    /api/companies/:companyId ← تفاصيل الشركة
POST   /api/companies            ← إنشاء شركة
PUT    /api/companies/:companyId ← تعديل الشركة
POST   /api/companies/:companyId/follow    ← متابعة الشركة
DELETE /api/companies/:companyId/follow    ← إلغاء المتابعة
```

## Salaries (الرواتب والإحصائيات)
```
GET    /api/salaries/analytics          ← إحصائيات الرواتب
GET    /api/salaries/experience-insights ← رؤى التجربة
```

## Posts (المنشورات)
```
GET    /api/posts                ← قائمة المنشورات
POST   /api/posts                ← إنشاء منشور
GET    /api/posts/:postId        ← تفاصيل المنشور
DELETE /api/posts/:postId        ← حذف المنشور
POST   /api/posts/:postId/like   ← إعجاب بالمنشور
DELETE /api/posts/:postId/like   ← إزالة الإعجاب
POST   /api/posts/:postId/comments       ← إضافة تعليق
GET    /api/posts/:postId/comments       ← الحصول على التعليقات
DELETE /api/posts/:postId/comments/:commentId ← حذف التعليق
```

## Network (الشبكة)
```
GET    /api/network/followers           ← قائمة المتابعين
GET    /api/network/following           ← قائمة المتابع لهم
GET    /api/network/search              ← البحث عن المستخدمين
POST   /api/network/follow/:userId      ← متابعة مستخدم
DELETE /api/network/follow/:userId      ← إلغاء المتابعة
POST   /api/network/connect/:userId     ← طلب اتصال
POST   /api/network/requests/:requestId/accept ← قبول الطلب
POST   /api/network/requests/:requestId/reject ← رفض الطلب
GET    /api/network/pending-requests    ← الطلبات المعلقة
```

## Messaging (المراسلة)
```
GET    /api/messages/conversations      ← قائمة المحادثات
GET    /api/messages/conversations/:id  ← رسائل المحادثة
POST   /api/messages/send               ← إرسال رسالة
PUT    /api/messages/conversations/:id/read ← تحديد كمقروء
DELETE /api/messages/conversations/:id  ← حذف المحادثة
```

## Notifications (الإخطارات)
```
GET    /api/notifications               ← قائمة الإخطارات
PUT    /api/notifications/:id/read      ← تحديد كمقروء
DELETE /api/notifications/:id           ← حذف الإخطار
```

## Search (البحث)
```
GET    /api/search                      ← البحث الشامل
```

## Settings (الإعدادات)
```
GET    /api/settings                    ← الحصول على الإعدادات
PUT    /api/settings                    ← تحديث الإعدادات
```

---

## معاملات شائعة (Common Query Parameters)

| المعامل | النوع | الوصف | مثال |
|--------|------|-------|------|
| `page` | number | رقم الصفحة | `?page=1` |
| `limit` | number | عدد النتائج | `?limit=10` |
| `search` أو `q` | string | كلمة البحث | `?search=developer` |
| `sort` | string | ترتيب النتائج | `?sort=-createdAt` |
| `filter` | object | الفلاتر | `?filter[industry]=tech` |

---

## معاملات خاصة بـ Jobs

| المعامل | النوع | أمثلة |
|--------|------|------|
| `location` | string | Remote, Cairo, Alex |
| `salary_min` | number | 5000 |
| `salary_max` | number | 50000 |
| `jobType` | string | Full-time, Part-time, Contract, Remote |
| `industry` | string | Technology, Finance, Healthcare |

---

## معاملات خاصة بـ Users Search

| المعامل | النوع | الوصف |
|--------|------|-------|
| `skill` | string | المهارات |
| `industry` | string | الصناعة |
| `location` | string | الموقع |

---

## أمثلة على الطلبات

### تسجيل الدخول
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### الحصول على قائمة الوظائف
```bash
curl -X GET "http://localhost:3000/api/jobs?page=1&limit=10&location=Remote" \
  -H "Authorization: Bearer <token>"
```

### إنشاء منشور
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello, world!",
    "visibility": "public"
  }'
```

### البحث الشامل
```bash
curl -X GET "http://localhost:3000/api/search?q=developer&type=users,jobs" \
  -H "Authorization: Bearer <token>"
```

---

## رموز الأخطاء الشائعة

| الكود | المعنى |
|------|--------|
| 200 | نجح |
| 201 | تم الإنشاء |
| 400 | خطأ في الطلب |
| 401 | غير مصرح (لا يوجد توكن أو التوكن منتهي) |
| 403 | ممنوع (لا توجد صلاحيات) |
| 404 | لم يتم العثور عليه |
| 422 | بيانات غير صحيحة |
| 500 | خطأ في الخادم |

---

## نموذج استجابة ناجحة
```json
{
  "success": true,
  "data": {...},
  "message": "العملية نجحت بنجاح"
}
```

## نموذج استجابة خطأ
```json
{
  "success": false,
  "message": "حدث خطأ",
  "errors": [
    {
      "field": "email",
      "message": "البريد الإلكتروني مطلوب"
    }
  ]
}
```
