# نماذج بيانات APIs - ProfitConnect

## 1. User Model (نموذج المستخدم)

### User Object (كامل)
```json
{
  "id": "user_123abc",
  "email": "amen@example.com",
  "username": "amen_dev",
  "profile": {
    "fullname": "Amen Development",
    "firstName": "Amen",
    "lastName": "Development",
    "headline": "Full Stack Developer",
    "bio": "Passionate developer with 5+ years of experience",
    "avatar": "https://example.com/avatar.jpg",
    "coverImage": "https://example.com/cover.jpg",
    "location": "San Francisco, CA",
    "websiteUrl": "https://example.com",
    "phoneNumber": "+1-555-000-0000",
    "dateOfBirth": "1990-01-15",
    "joinDate": "2020-05-10T10:00:00Z"
  },
  "professional": {
    "industry": "Technology",
    "yearsOfExperience": 5,
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
    "certifications": ["AWS Certified", "Google Cloud Professional"],
    "workHistory": [
      {
        "id": "work_001",
        "company": "Tech Corp",
        "position": "Senior Developer",
        "startDate": "2022-01-01",
        "endDate": null,
        "description": "Leading frontend development team",
        "isCurrentlyWorking": true
      }
    ]
  },
  "socialStats": {
    "followersCount": 154,
    "followingCount": 150,
    "connectionsCount": 200,
    "postsCount": 45,
    "savedJobsCount": 12
  },
  "settings": {
    "language": "en",
    "theme": "light",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "profileVisibility": "public",
      "allowMessages": "all"
    }
  },
  "rscore": 1500,
  "isPremium": false,
  "isVerified": true,
  "isSuspended": false,
  "loginAttempts": 0,
  "lastLogin": "2024-03-15T10:30:00Z",
  "createdAt": "2020-05-10T10:00:00Z",
  "updatedAt": "2024-03-19T08:45:00Z"
}
```

---

## 2. Job Model (نموذج الوظيفة)

### Job Object (كامل)
```json
{
  "id": "job_abc123",
  "title": "Senior Frontend Developer",
  "slug": "senior-frontend-developer",
  "description": "We are looking for an experienced frontend developer...",
  "requirements": [
    "5+ years of React experience",
    "Strong JavaScript knowledge",
    "Experience with Redux or Zustand"
  ],
  "responsibilities": [
    "Develop responsive web applications",
    "Lead code reviews",
    "Mentor junior developers"
  ],
  "qualifications": [
    "Bachelor's degree in Computer Science",
    "Portfolio with production experience"
  ],
  "company": {
    "id": "company_xyz789",
    "name": "Starlight",
    "logo": "https://example.com/logo.png",
    "website": "https://starlight.com"
  },
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "isRemote": false,
    "relocation": {
      "offered": true,
      "cost": "covered"
    }
  },
  "salary": {
    "min": 130000,
    "max": 160000,
    "currency": "USD",
    "salaryType": "annual",
    "isNegotiable": true
  },
  "benefits": [
    "Health Insurance",
    "401k",
    "Remote Days",
    "Professional Development"
  ],
  "jobType": "Full-time",
  "experienceLevel": "Senior",
  "industry": "Technology",
  "skills": ["React", "JavaScript", "TypeScript", "CSS"],
  "postedDate": "2024-03-15T10:00:00Z",
  "deadline": "2024-04-15T23:59:59Z",
  "applications": {
    "count": 45,
    "status": "open"
  },
  "views": 1250,
  "applicants": [
    {
      "id": "user_123",
      "email": "candidate@example.com",
      "appliedAt": "2024-03-16T10:00:00Z",
      "status": "pending"
    }
  ],
  "isActive": true,
  "isFeatured": true,
  "tags": ["remote-friendly", "startup", "high-salary"],
  "createdAt": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-19T08:45:00Z"
}
```

---

## 3. Company Model (نموذج الشركة)

### Company Object (كامل)
```json
{
  "id": "company_xyz789",
  "name": "Starlight",
  "slug": "starlight",
  "logo": "https://example.com/logo.png",
  "coverImage": "https://example.com/cover.jpg",
  "description": "We are a leading technology company...",
  "industry": "Technology",
  "size": "1000-5000",
  "founded": 2015,
  "headquarters": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  },
  "website": "https://starlight.com",
  "socialLinks": {
    "linkedin": "https://linkedin.com/company/starlight",
    "twitter": "https://twitter.com/starlight",
    "facebook": "https://facebook.com/starlight"
  },
  "contact": {
    "email": "careers@starlight.com",
    "phone": "+1-555-000-0000"
  },
  "stats": {
    "followersCount": 12000,
    "postsCount": 150,
    "jobsCount": 25,
    "reviewsCount": 450,
    "avgRating": 4.5
  },
  "openPositions": 12,
  "reviews": [
    {
      "id": "review_001",
      "authorId": "user_123",
      "rating": 5,
      "title": "Great place to work",
      "comment": "Amazing company culture and benefits",
      "createdAt": "2024-03-10T10:00:00Z"
    }
  ],
  "followersList": [],
  "isVerified": true,
  "isPremium": true,
  "createdAt": "2015-06-01T10:00:00Z",
  "updatedAt": "2024-03-19T08:45:00Z"
}
```

---

## 4. Post Model (نموذج المنشور)

### Post Object (كامل)
```json
{
  "id": "post_123def",
  "content": "Excited to announce that I just completed my React certification! 🎉",
  "author": {
    "id": "user_123abc",
    "username": "amen_dev",
    "name": "Amen Dev",
    "headline": "Full Stack Developer",
    "avatar": "https://example.com/avatar.jpg"
  },
  "image": "https://example.com/post-image.jpg",
  "video": null,
  "attachments": [],
  "visibility": "public",
  "mentions": ["user_456", "user_789"],
  "hashtags": ["react", "webdev", "certification"],
  "reactions": {
    "likes": 234,
    "comments": 45,
    "reposts": 12,
    "reactionsBreakdown": {
      "like": 200,
      "love": 34,
      "celebrate": 0
    }
  },
  "comments": [
    {
      "id": "comment_001",
      "author": {
        "id": "user_456",
        "name": "John Doe",
        "avatar": "https://example.com/avatar2.jpg"
      },
      "content": "Congrats! That's awesome!",
      "createdAt": "2024-03-16T10:00:00Z",
      "likes": 5,
      "replies": []
    }
  ],
  "isLiked": false,
  "isCommented": false,
  "isReposted": false,
  "isSaved": false,
  "postedDate": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-19T08:45:00Z"
}
```

---

## 5. Message Model (نموذج الرسالة)

### Conversation Object
```json
{
  "id": "conv_123",
  "participants": [
    {
      "id": "user_123",
      "name": "Amen Dev",
      "avatar": "https://example.com/avatar.jpg"
    },
    {
      "id": "user_456",
      "name": "Sarah Jenkins",
      "avatar": "https://example.com/avatar2.jpg"
    }
  ],
  "messages": [
    {
      "id": "msg_001",
      "senderId": "user_123",
      "receiverId": "user_456",
      "content": "Hi Sarah, how are you?",
      "attachments": [],
      "isRead": true,
      "createdAt": "2024-03-15T10:00:00Z"
    }
  ],
  "lastMessage": {
    "content": "Hi Sarah, how are you?",
    "senderId": "user_123",
    "timestamp": "2024-03-15T10:00:00Z"
  },
  "unreadCount": 0,
  "createdAt": "2024-03-10T10:00:00Z",
  "updatedAt": "2024-03-19T08:45:00Z"
}
```

---

## 6. Connection Request Model

### Connection Request Object
```json
{
  "id": "conn_req_001",
  "senderId": "user_123",
  "sender": {
    "id": "user_123",
    "name": "Amen Dev",
    "headline": "Full Stack Developer",
    "avatar": "https://example.com/avatar.jpg"
  },
  "recipientId": "user_456",
  "recipient": {
    "id": "user_456",
    "name": "Sarah Jenkins",
    "headline": "Product Designer",
    "avatar": "https://example.com/avatar2.jpg"
  },
  "message": "I'd love to connect with you",
  "status": "pending",
  "mutualConnections": 5,
  "createdAt": "2024-03-15T10:00:00Z"
}
```

---

## 7. Notification Model

### Notification Object
```json
{
  "id": "notif_001",
  "recipient_id": "user_123",
  "type": "CONNECTION_REQUEST",
  "title": "New Connection Request",
  "message": "Sarah Jenkins wants to connect with you",
  "actor": {
    "id": "user_456",
    "name": "Sarah Jenkins",
    "avatar": "https://example.com/avatar.jpg"
  },
  "actionUrl": "/network/requests/conn_req_001",
  "isRead": false,
  "createdAt": "2024-03-19T08:45:00Z"
}
```

### Notification Types:
- `CONNECTION_REQUEST` - طلب اتصال
- `CONNECTION_ACCEPTED` - تم قبول الاتصال
- `POST_LIKED` - إعجاب بالمنشور
- `POST_COMMENTED` - تعليق على المنشور
- `NEW_JOB` - وظيفة جديدة
- `NEW_MESSAGE` - رسالة جديدة
- `JOB_SAVED` - تم حفظ الوظيفة
- `COMPANY_UPDATE` - تحديث الشركة

---

## 8. Salary Analytics Model

### Salary Analytics Object
```json
{
  "jobTitle": "Frontend Developer",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "yearsOfExperience": 5,
  "statistics": {
    "average": 125000,
    "median": 120000,
    "min": 80000,
    "max": 200000,
    "stdDeviation": 25000,
    "salaryCount": 450
  },
  "distribution": {
    "0-50k": 2,
    "50k-75k": 5,
    "75k-100k": 15,
    "100k-125k": 25,
    "125k-150k": 30,
    "150k-175k": 15,
    "175k-200k": 6,
    "200k+": 3
  },
  "byExperience": [
    {
      "yearsOfExperience": 1,
      "average": 65000,
      "median": 62000,
      "count": 50
    },
    {
      "yearsOfExperience": 3,
      "average": 95000,
      "median": 92000,
      "count": 120
    },
    {
      "yearsOfExperience": 5,
      "average": 125000,
      "median": 120000,
      "count": 180
    }
  ],
  "trends": {
    "yearOverYear": 8.5,
    "historicalData": []
  }
}
```

---

## 9. Search Result Model

### Search Results Object
```json
{
  "query": "developer",
  "results": {
    "users": [
      {
        "id": "user_123",
        "name": "Amen Dev",
        "headline": "Full Stack Developer",
        "avatar": "https://example.com/avatar.jpg",
        "skills": ["JavaScript", "React", "Node.js"],
        "matchScore": 95
      }
    ],
    "jobs": [
      {
        "id": "job_abc",
        "title": "Senior Frontend Developer",
        "company": "Starlight",
        "location": "Remote",
        "salary": "130k-160k",
        "matchScore": 88
      }
    ],
    "companies": [
      {
        "id": "company_xyz",
        "name": "Starlight",
        "industry": "Technology",
        "followers": 12000,
        "matchScore": 75
      }
    ],
    "posts": [
      {
        "id": "post_123",
        "author": "Amen Dev",
        "content": "Excited about web development...",
        "matchScore": 65
      }
    ]
  },
  "totalResults": 1245,
  "timing": "45ms"
}
```

---

## 10. Authentication Response Model

### Login/Signup Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "refreshExpiresIn": 604800,
  "user": {
    "id": "user_123",
    "email": "amen@example.com",
    "username": "amen_dev",
    "profile": {
      "fullname": "Amen Dev",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

---

## أنواع البيانات الأساسية

### Address Object
```json
{
  "street": "123 Main St",
  "city": "San Francisco",
  "state": "CA",
  "postalCode": "94105",
  "country": "USA"
}
```

### TimestampPair Object
```json
{
  "createdAt": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-19T08:45:00Z",
  "deletedAt": null
}
```

### PaginationMeta Object
```json
{
  "page": 1,
  "limit": 10,
  "total": 150,
  "pages": 15,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

---

## قائمة Enums

### Job Types
```
- Full-time
- Part-time
- Contract
- Temporary
- Freelance
- Internship
```

### Experience Levels
```
- Internship
- Entry-level
- Mid-level
- Senior
- Lead
- Executive
```

### Employment Status
```
- Employed
- Unemployed
- Freelancer
- Student
- Self-employed
```

### Notification Status
```
- UNREAD
- READ
- ARCHIVED
```

### Connection Status
```
- PENDING
- ACCEPTED
- REJECTED
- BLOCKED
```

### Visibility
```
- PUBLIC
- PRIVATE
- CONNECTIONS_ONLY
```
