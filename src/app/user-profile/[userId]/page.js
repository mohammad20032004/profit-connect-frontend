'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation'; // لجلب الـ ID في الـ Client Component

export default function UserProfilePage() {
  const params = useParams();
  const id = params?.userId; // استخراج الـ ID من الرابط
  
  // جلب التوكن من الـ Redux Store الخاص بتطبيقك
  const token = useSelector((state) => state.user.token);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        
        const baseUrl = 'http://localhost:5000'; // تأكد من مطابقة بورت الباك-إند
        
        const res = await fetch(`${baseUrl}/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // تمرير التوكن في الهيدر كما يفعل تطبيقك في جلب المنشورات
            ...(token && { 'Authorization': `Bearer ${token}` }) 
          }
        });

        if (!res.ok) {
          throw new Error(`خطأ من السيرفر: كود الاستجابة ${res.status}`);
        }

        const result = await res.json();
        setUserData(result?.data || null);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress sx={{ color: '#240046' }} />
      </Box>
    );
  }

  if (error || !userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, p: 2 }}>
        <Typography color="error" variant="h6" align="center">
          {error ? `فشل جلب البيانات: ${error}` : 'المستخدم غير موجود.'}
        </Typography>
      </Box>
    );
  }

  const { profile, username, role } = userData;
  const fullName = profile?.fullname || `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || username;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 2 }}>
      <Card 
        sx={{ 
          borderRadius: 4, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.5)'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <Avatar 
            src={profile?.avatar && profile.avatar !== 'default-avatar.png' ? profile.avatar : undefined} 
            sx={{ width: 100, height: 100, mb: 2, fontSize: '2.5rem' }}
          >
            {fullName?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 1 }}>
            {fullName}
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center" sx={{ px: 3, mb: 2, fontWeight: 500 }}>
            {profile?.headline || role || 'Professional Member'}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ID: {id}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}