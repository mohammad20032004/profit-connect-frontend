# أمثلة اتصال APIs - ProfitConnect

## أمثلة باستخدام apiService الموجود

### 1. Authentication (المصادقة)

#### تسجيل الدخول
```javascript
import { apiService } from '@/services';

async function login(email, password) {
  try {
    const response = await apiService.post('/auth/login', {
      email,
      password
    });
    
    // حفظ التوكن
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
```

#### التسجيل
```javascript
async function signup(formData) {
  try {
    const response = await apiService.post('/auth/signup', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      industry: formData.industry,
      yearsOfExperience: formData.yearsOfExperience,
      skills: formData.skills
    });
    
    return response;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
}
```

---

### 2. User Profile APIs

#### الحصول على بيانات المستخدم
```javascript
async function getUserProfile() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get('/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
}
```

#### تحديث الملف الشخصي
```javascript
async function updateUserProfile(profileData) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.put('/user/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}
```

#### الحصول على ملف مستخدم آخر
```javascript
async function getUserProfile(userId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

---

### 3. Jobs APIs

#### الحصول على قائمة الوظائف
```javascript
async function getJobs(filters = {}) {
  try {
    const token = localStorage.getItem('authToken');
    
    // بناء query string
    const queryString = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 10,
      ...(filters.search && { search: filters.search }),
      ...(filters.location && { location: filters.location }),
      ...(filters.salaryMin && { salary_min: filters.salaryMin }),
      ...(filters.salaryMax && { salary_max: filters.salaryMax }),
      ...(filters.jobType && { jobType: filters.jobType })
    }).toString();
    
    const response = await apiService.get(`/jobs?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw error;
  }
}
```

#### الحصول على تفاصيل وظيفة
```javascript
async function getJobDetails(jobId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get(`/jobs/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch job details:', error);
    throw error;
  }
}
```

#### التقديم على وظيفة
```javascript
async function applyJob(jobId, coverLetter = '') {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/jobs/${jobId}/apply`, 
      {
        coverLetter,
        // يمكن إضافة resumeUrl هنا
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Failed to apply job:', error);
    throw error;
  }
}
```

#### حفظ وظيفة في المفضلة
```javascript
async function saveJob(jobId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/jobs/${jobId}/save`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to save job:', error);
    throw error;
  }
}

// إزالة من المفضلة
async function unsaveJob(jobId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.del(`/jobs/${jobId}/save`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to unsave job:', error);
    throw error;
  }
}
```

---

### 4. Companies APIs

#### الحصول على قائمة الشركات
```javascript
async function getCompanies(filters = {}) {
  try {
    const token = localStorage.getItem('authToken');
    
    const queryString = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 10,
      ...(filters.search && { search: filters.search }),
      ...(filters.industry && { industry: filters.industry })
    }).toString();
    
    const response = await apiService.get(`/companies?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    throw error;
  }
}
```

#### متابعة الشركة
```javascript
async function followCompany(companyId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/companies/${companyId}/follow`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to follow company:', error);
    throw error;
  }
}
```

---

### 5. Salaries APIs

#### الحصول على إحصائيات الرواتب
```javascript
async function getSalaryAnalytics(filters = {}) {
  try {
    const token = localStorage.getItem('authToken');
    
    const queryString = new URLSearchParams({
      ...(filters.jobTitle && { jobTitle: filters.jobTitle }),
      ...(filters.industry && { industry: filters.industry }),
      ...(filters.location && { location: filters.location }),
      ...(filters.yearsOfExperience && { yearsOfExperience: filters.yearsOfExperience })
    }).toString();
    
    const response = await apiService.get(`/salaries/analytics?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch salary analytics:', error);
    throw error;
  }
}
```

---

### 6. Posts APIs

#### الحصول على المنشورات
```javascript
async function getPosts(page = 1) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get(`/posts?page=${page}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}
```

#### إنشاء منشور
```javascript
async function createPost(content, image = null) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post('/posts', 
      {
        content,
        image,
        visibility: 'public'
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
}
```

#### إعجاب بالمنشور
```javascript
async function likePost(postId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/posts/${postId}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to like post:', error);
    throw error;
  }
}
```

#### إضافة تعليق
```javascript
async function addComment(postId, content) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/posts/${postId}/comments`, 
      { content },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Failed to add comment:', error);
    throw error;
  }
}
```

---

### 7. Network APIs

#### البحث عن المستخدمين
```javascript
async function searchUsers(query, filters = {}) {
  try {
    const token = localStorage.getItem('authToken');
    
    const queryString = new URLSearchParams({
      q: query,
      ...(filters.skill && { skill: filters.skill }),
      ...(filters.industry && { industry: filters.industry })
    }).toString();
    
    const response = await apiService.get(`/network/search?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to search users:', error);
    throw error;
  }
}
```

#### إرسال طلب اتصال
```javascript
async function connectWithUser(userId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/network/connect/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to send connection request:', error);
    throw error;
  }
}
```

#### الحصول على الطلبات المعلقة
```javascript
async function getPendingRequests() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get('/network/pending-requests', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch pending requests:', error);
    throw error;
  }
}
```

#### قبول طلب اتصال
```javascript
async function acceptConnectionRequest(requestId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post(`/network/requests/${requestId}/accept`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to accept request:', error);
    throw error;
  }
}
```

---

### 8. Messaging APIs

#### الحصول على المحادثات
```javascript
async function getConversations(page = 1) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get(`/messages/conversations?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    throw error;
  }
}
```

#### إرسال رسالة
```javascript
async function sendMessage(recipientId, content) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.post('/messages/send', 
      {
        recipientId,
        content
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
}
```

#### الحصول على رسائل المحادثة
```javascript
async function getConversationMessages(conversationId, page = 1) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get(
      `/messages/conversations/${conversationId}?page=${page}`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Failed to fetch conversation messages:', error);
    throw error;
  }
}
```

---

### 9. Notifications APIs

#### الحصول على الإخطارات
```javascript
async function getNotifications(page = 1) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.get(`/notifications?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
}
```

#### تحديد إخطار كمقروء
```javascript
async function markNotificationAsRead(notificationId) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await apiService.put(`/notifications/${notificationId}/read`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    throw error;
  }
}
```

---

### 10. Search APIs

#### البحث الشامل
```javascript
async function globalSearch(query, types = ['users', 'jobs', 'companies', 'posts']) {
  try {
    const token = localStorage.getItem('authToken');
    
    const queryString = new URLSearchParams({
      q: query,
      type: types.join(',')
    }).toString();
    
    const response = await apiService.get(`/search?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Failed to perform search:', error);
    throw error;
  }
}
```

---

## استخدام Hooks في Components

### مثال: Custom Hook لجلب الوظائف

```javascript
import { useState, useEffect } from 'react';
import { apiService } from '@/services';

export function useJobs(filters = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        const queryString = new URLSearchParams({
          page: filters.page || 1,
          limit: filters.limit || 10,
          ...(filters.search && { search: filters.search })
        }).toString();

        const response = await apiService.get(`/jobs?${queryString}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setJobs(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  return { jobs, loading, error };
}
```

### استخدام Hook في Component

```javascript
'use client';

import { useJobs } from '@/hooks/useJobs';
import { Box, CircularProgress } from '@mui/material';
import JobCard from './JobCard';

export default function JobsList() {
  const [filters, setFilters] = useState({ page: 1 });
  const { jobs, loading, error } = useJobs(filters);

  if (loading) return <CircularProgress />;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </Box>
  );
}
```

---

## معالجة الأخطاء الشاملة

```javascript
export async function handleApiError(error) {
  if (!error.response) {
    // خطأ الشبكة
    console.error('Network error:', error.message);
    throw new Error('فشل الاتصال بالخادم');
  }

  const { status, data } = error.response;

  switch (status) {
    case 401:
      // غير مصرح
      localStorage.removeItem('authToken');
      window.location.href = '/log-in';
      throw new Error('جلسة العمل منتهية، يرجى تسجيل الدخول مجددا');
    
    case 403:
      throw new Error('ليس لديك صلاحيات للوصول إلى هذا المحتوى');
    
    case 404:
      throw new Error('لم يتم العثور على ما تبحث عنه');
    
    case 422:
      // خطأ التحقق من البيانات
      const errors = data.errors.map(e => `${e.field}: ${e.message}`);
      throw new Error(errors.join('\n'));
    
    case 500:
      throw new Error('حدث خطأ في الخادم');
    
    default:
      throw new Error(data.message || 'حدث خطأ ما');
  }
}
```
