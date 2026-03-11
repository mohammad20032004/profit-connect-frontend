import React from 'react';
import { Post } from '../posts';
import { Box } from '@mui/material';
const postsData = [
  {
    authorName: 'Sarah Johnson',
    authorHeadline: 'Senior Full Stack Developer at Google',
    authorImage: 'https://i.pravatar.cc/150?img=5',
    timeAgo: '2h',
    content: 'Just deployed my first microservices architecture using Docker and Kubernetes! 🚀\n\nKey learnings:\n✅ Container orchestration is a game changer\n✅ Service mesh with Istio simplified communication\n✅ Monitoring with Prometheus saved debugging time\n\nWhat\'s your favorite DevOps tool?',
    postImage: null,
    reactionsCount: 342,
    commentsCount: 28,
    repostsCount: 15,
    comments: []
  },
  {
    authorName: 'Ahmed Hassan',
    authorHeadline: 'React Developer | JavaScript Enthusiast',
    authorImage: 'https://i.pravatar.cc/150?img=12',
    timeAgo: '4h',
    content: 'React 19 is officially here! 🎉\n\nMy favorite new features:\n1. Server Components by default\n2. Improved use() hook\n3. Better error handling\n4. Automatic batching improvements\n\nTime to upgrade your projects!',
    postImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    reactionsCount: 521,
    commentsCount: 67,
    repostsCount: 89,
    comments: []
  },
  {
    authorName: 'Emily Chen',
    authorHeadline: 'AI/ML Engineer | Python Developer',
    authorImage: 'https://i.pravatar.cc/150?img=9',
    timeAgo: '6h',
    content: 'Built a real-time sentiment analysis tool using Python and TensorFlow! 🤖\n\nStack:\n- FastAPI for backend\n- TensorFlow for ML model\n- React for frontend\n- Redis for caching\n\nProcessing 10k requests/sec with 95% accuracy. Open source soon!',
    postImage: null,
    reactionsCount: 789,
    commentsCount: 94,
    repostsCount: 156,
    comments: []
  },
  {
    authorName: 'Marcus Williams',
    authorHeadline: 'Backend Engineer at Microsoft | Node.js Expert',
    authorImage: 'https://i.pravatar.cc/150?img=14',
    timeAgo: '8h',
    content: 'Performance optimization tips for Node.js applications:\n\n1️⃣ Use clustering for multi-core systems\n2️⃣ Implement caching strategies (Redis/Memcached)\n3️⃣ Optimize database queries with indexing\n4️⃣ Use async/await properly\n5️⃣ Monitor with APM tools\n\nReduced API response time from 800ms to 120ms! 📊',
    postImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    reactionsCount: 1243,
    commentsCount: 156,
    repostsCount: 234,
    comments: []
  },
  {
    authorName: 'Fatima Al-Rashid',
    authorHeadline: 'Mobile Developer | Flutter & React Native',
    authorImage: 'https://i.pravatar.cc/150?img=20',
    timeAgo: '10h',
    content: 'Flutter vs React Native in 2024? 🤔\n\nAfter building apps with both:\n\nFlutter wins for:\n✅ Performance\n✅ UI consistency\n✅ Hot reload speed\n\nReact Native wins for:\n✅ JavaScript ecosystem\n✅ Easier for web devs\n✅ Larger community\n\nBoth are excellent choices! Choose based on your team\'s expertise.',
    postImage: null,
    reactionsCount: 456,
    commentsCount: 89,
    repostsCount: 67,
    comments: []
  },
  {
    authorName: 'David Park',
    authorHeadline: 'DevOps Engineer | Cloud Architecture Specialist',
    authorImage: 'https://i.pravatar.cc/150?img=33',
    timeAgo: '12h',
    content: 'Migrated our entire infrastructure to AWS! ☁️\n\nCost savings: 40%\nPerformance improvement: 3x faster\nDeployment time: From hours to minutes\n\nKey services used:\n- ECS for containers\n- RDS for databases\n- CloudFront for CDN\n- Lambda for serverless functions\n\nCloud migration is worth it!',
    postImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    reactionsCount: 892,
    commentsCount: 123,
    repostsCount: 178,
    comments: []
  },
  {
    authorName: 'Lisa Anderson',
    authorHeadline: 'Frontend Developer | CSS Wizard',
    authorImage: 'https://i.pravatar.cc/150?img=47',
    timeAgo: '1d',
    content: 'CSS Grid vs Flexbox - When to use what? 🎨\n\nUse Grid for:\n📐 2D layouts (rows AND columns)\n📐 Complex page structures\n📐 Overlapping elements\n\nUse Flexbox for:\n📏 1D layouts (row OR column)\n📏 Navigation bars\n📏 Centering items\n\nMaster both for ultimate layout control!',
    postImage: null,
    reactionsCount: 634,
    commentsCount: 78,
    repostsCount: 92,
    comments: []
  }
];

export default function MainSection() {
  return (
    <Box sx={{width: '100%', m: '0 auto', p: 2}}>
      {postsData.map((post, index) => (
        <Post key={index} {...post}/>
      ))}
    </Box>
  );
}
