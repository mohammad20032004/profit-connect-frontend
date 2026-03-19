# دليل التكامل الشامل - ProfitConnect APIs Integration

## 🎯 نظرة عامة

هذا الدليل يحتوي على شرح كامل لكيفية تكامل جميع الـ APIs مع المشروع الحالي.

---

## 📁 بنية المشروع الحالية للـ APIs

```
src/
├── services/
│   ├── apiService.js          ← خدمة HTTP الأساسية
│   └── index.js
├── constants/
│   ├── api.js                 ← ثوابت الـ APIs
│   └── routes.js
├── lib/
│   ├── features/
│   │   ├── store.js           ← Redux store
│   │   └── userSlice.js       ← أحوال المستخدم
│   └── theme.js
├── hooks/
│   ├── useLocalStorage.js
│   └── (يمكن إضافة hooks للـ APIs هنا)
└── components/
    ├── forms/                 ← نماذج المصادقة
    ├── jobs/                  ← مكونات الوظائف
    ├── network/               ← مكونات الشبكة
    ├── messaging/             ← مكونات المراسلة
    ├── posts/                 ← مكونات المنشورات
    └── layout/
```

---

## 🔄 تدفق البيانات

```
Frontend Component
       ↓
Custom Hook (useJobs, useUserProfile, etc.)
       ↓
apiService.js (GET, POST, PUT, DELETE)
       ↓
Backend API
       ↓
apiService.js (Returns response)
       ↓
Redux Store (Optional - save to state)
       ↓
Component (Display data)
```

---

## 🛠️ خطوات التكامل الموصى بها

### الخطوة 1: تحديث `apiService.js`

تأكد من أن الخدمة تحتوي على HEAD و PATCH:

```javascript
// في apiService.js، أضف الدوال التالية إذا لم تكن موجودة:

export const head = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'HEAD',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    return response.ok;
  } catch (error) {
    console.error('HEAD request failed:', error);
    throw error;
  }
};

export const patch = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('PATCH request failed:', error);
    throw error;
  }
};
```

### الخطوة 2: تحديث `constants/api.js`

```javascript
// في constants/api.js

export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
  },
  
  // User Profile
  USER: {
    PROFILE: '/user/profile',
    GET_PROFILE: (userId) => `/user/${userId}`,
  },
  
  // Jobs
  JOBS: {
    LIST: '/jobs',
    DETAIL: (jobId) => `/jobs/${jobId}`,
    CREATE: '/jobs',
    UPDATE: (jobId) => `/jobs/${jobId}`,
    DELETE: (jobId) => `/jobs/${jobId}`,
    APPLY: (jobId) => `/jobs/${jobId}/apply`,
    SAVE: (jobId) => `/jobs/${jobId}/save`,
    SEARCH: '/jobs/search',
  },
  
  // Companies
  COMPANIES: {
    LIST: '/companies',
    DETAIL: (companyId) => `/companies/${companyId}`,
    FOLLOW: (companyId) => `/companies/${companyId}/follow`,
  },
  
  // Salaries
  SALARIES: {
    ANALYTICS: '/salaries/analytics',
    EXPERIENCE_INSIGHTS: '/salaries/experience-insights',
  },
  
  // Posts
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts',
    DETAIL: (postId) => `/posts/${postId}`,
    DELETE: (postId) => `/posts/${postId}`,
    LIKE: (postId) => `/posts/${postId}/like`,
    COMMENTS: (postId) => `/posts/${postId}/comments`,
    DELETE_COMMENT: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
  },
  
  // Network
  NETWORK: {
    FOLLOWERS: '/network/followers',
    FOLLOWING: '/network/following',
    FOLLOW: (userId) => `/network/follow/${userId}`,
    CONNECT: (userId) => `/network/connect/${userId}`,
    SEARCH: '/network/search',
    PENDING_REQUESTS: '/network/pending-requests',
    ACCEPT_REQUEST: (requestId) => `/network/requests/${requestId}/accept`,
    REJECT_REQUEST: (requestId) => `/network/requests/${requestId}/reject`,
  },
  
  // Messaging
  MESSAGES: {
    CONVERSATIONS: '/messages/conversations',
    CONVERSATION: (convId) => `/messages/conversations/${convId}`,
    SEND: '/messages/send',
    READ: (convId) => `/messages/conversations/${convId}/read`,
    DELETE_CONV: (convId) => `/messages/conversations/${convId}`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    READ: (notifId) => `/notifications/${notifId}/read`,
    DELETE: (notifId) => `/notifications/${notifId}`,
  },
  
  // Search
  SEARCH: '/search',
  
  // Settings
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
  },
};
```

### الخطوة 3: إنشاء Hooks مخصصة

أنشئ ملف جديد: `/src/hooks/useAuth.js`

```javascript
import { useState, useCallback } from 'react';
import { apiService } from '@/services';
import { API_ENDPOINTS } from '@/constants/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password
      });
      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setError(null);
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (formData) => {
    try {
      setLoading(true);
      const response = await apiService.post(API_ENDPOINTS.AUTH.SIGNUP, formData);
      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setError(null);
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthToken = () => localStorage.getItem('authToken');

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    getAuthToken,
    isAuthenticated: !!user
  };
}
```

أنشئ ملف جديد: `/src/hooks/useJobs.js`

```javascript
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services';
import { API_ENDPOINTS } from '@/constants/api';

export function useJobs(filters = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const queryParams = new URLSearchParams({
        page: filters.page || 1,
        limit: filters.limit || 10,
        ...(filters.search && { search: filters.search }),
        ...(filters.location && { location: filters.location }),
      }).toString();

      const response = await apiService.get(
        `${API_ENDPOINTS.JOBS.LIST}?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setJobs(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const applyJob = useCallback(async (jobId, coverLetter) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await apiService.post(
        API_ENDPOINTS.JOBS.APPLY(jobId),
        { coverLetter },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const saveJob = useCallback(async (jobId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await apiService.post(
        API_ENDPOINTS.JOBS.SAVE(jobId),
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    jobs,
    loading,
    error,
    pagination,
    fetchJobs,
    applyJob,
    saveJob
  };
}
```

### الخطوة 4: تحديث Redux Store

تحديث `/src/lib/features/userSlice.js`:

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services';
import { API_ENDPOINTS } from '@/constants/api';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await apiService.get(API_ENDPOINTS.USER.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await apiService.put(
        API_ENDPOINTS.USER.PROFILE,
        profileData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

### الخطوة 5: تحديث مكونات الواجهة

تحديث `/src/components/forms/LoginPage.jsx`:

```javascript
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          margin="normal"
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          margin="normal"
          disabled={loading}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
    </Box>
  );
}
```

---

## 🔐 معالجة الأخطاء الموحدة

أنشئ utility للأخطاء `/src/utils/apiErrors.js`:

```javascript
export class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export function isUnauthorized(error) {
  return error?.status === 401;
}

export function isForbidden(error) {
  return error?.status === 403;
}

export function isNotFound(error) {
  return error?.status === 404;
}

export function isValidationError(error) {
  return error?.status === 422;
}

export function getErrorMessage(error) {
  if (error?.errors?.length > 0) {
    return error.errors.map(e => `${e.field}: ${e.message}`).join('\n');
  }
  return error?.message || 'حدث خطأ ما';
}
```

---

## 📊 Environment Variables

أضف إلى `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Options
NEXT_PUBLIC_LOG_API_CALLS=true
NEXT_PUBLIC_API_TIMEOUT=30000
```

---

## 🔄 Interceptor Pattern (اختياري)

إذا كنت تريد إضافة Interceptors:

```javascript
// في apiService.js

let interceptors = {
  request: [],
  response: [],
};

export function addRequestInterceptor(interceptor) {
  interceptors.request.push(interceptor);
}

export function addResponseInterceptor(interceptor) {
  interceptors.response.push(interceptor);
}

async function get(endpoint, options = {}) {
  // تطبيق interceptors للطلب
  for (let interceptor of interceptors.request) {
    await interceptor(endpoint, options);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      ...options
    });

    // تطبيق interceptors للاستجابة
    for (let interceptor of interceptors.response) {
      await interceptor(response);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
```

---

## 🧪 اختبار الـ APIs

مثال على اختبار Hook:

```javascript
// في __tests__/hooks/useJobs.test.js

import { renderHook, act, waitFor } from '@testing-library/react';
import { useJobs } from '@/hooks/useJobs';

jest.mock('@/services', () => ({
  apiService: {
    get: jest.fn()
  }
}));

describe('useJobs', () => {
  it('should fetch jobs successfully', async () => {
    const mockJobs = [
      { id: 1, title: 'Developer' },
      { id: 2, title: 'Designer' }
    ];

    apiService.get.mockResolvedValue({
      data: mockJobs,
      pagination: { page: 1, total: 2 }
    });

    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.jobs).toEqual(mockJobs);
  });
});
```

---

## ✅ قائمة التحقق من التكامل

- [ ] تحديث `apiService.js` بـ HEAD و PATCH
- [ ] تحديث `constants/api.js` بكل الـ endpoints
- [ ] إنشاء custom hooks (`useAuth`, `useJobs`, إلخ)
- [ ] تحديث Redux store
- [ ] تحديث مكونات الواجهة
- [ ] إضافة معالجة الأخطاء الموحدة
- [ ] إضافة environment variables
- [ ] اختبار الـ APIs
- [ ] إضافة التوثيق داخل الكود
- [ ] اختبار مع الـ Backend الفعلي

---

## 🚀 الخطوات التالية

1. تطبيق جميع الخطوات أعلاه
2. اختبار كل API مع الـ Backend
3. إضافة toast notifications للنجاح والأخطاء
4. تطبيق caching حسب الحاجة
5. تحسين الأداء مع pagination وvirtualization

---

## 📞 للمزيد من المساعدة

راجع الملفات التالية:
- `API_REQUIREMENTS.md` - للمتطلبات التفصيلية
- `API_IMPLEMENTATION_EXAMPLES.md` - للأمثلة البرمجية
- `API_DATA_MODELS.md` - للنماذج
