'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Divider,
  Chip,
  Stack,
  Button,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { createConversation } from '@/services/messagesService';

const StatItem = ({ value, label }) => (
  <Box textAlign="center">
    <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
      {label}
    </Typography>
  </Box>
);

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.userId;
  const token = useSelector((state) => state.user.token);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) {
        setLoading(false);
        setError('User ID not found.');
        return;
      }
      try {
        setLoading(true);
        setError('');
        const baseUrl = 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
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

  const handleMessageClick = async () => {
    if (!token || !id) return;
    try {
      const result = await createConversation({ token, recipientId: id });
      const conversationId = result?.data?._id;
      if (conversationId) {
        router.push(`/messaging?conversationId=${conversationId}`);
      } else {
        router.push('/messaging');
      }
    } catch (err) {
      console.error("Failed to create conversation:", err);
      // Optionally, show an error to the user
    }
  };

  const { profile, username, role, professional, email } = userData || {};

  const fullName = useMemo(() => profile?.fullname || `${profile?.firstName} ${profile?.lastName}`.trim() || username, [profile, username]);
  const headline = useMemo(() => profile?.headline || role || 'Member', [profile, role]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#240046' }} />
      </Box>
    );
  }

  if (error || !userData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, p: 2, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          {error ? `Failed to load profile: ${error}` : 'This user does not exist.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4 }}>
      <Card
        data-aos="fade-up"
        sx={{
          borderRadius: 5,
          boxShadow: '0 18px 36px rgba(15,23,42,0.08)',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.55)',
        }}
      >
        {/* --- Header Section --- */}
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} alignItems="center">
            <Avatar
              src={profile?.avatar && profile.avatar !== 'default-avatar.png' ? profile.avatar : undefined}
              sx={{ width: { xs: 100, sm: 140 }, height: { xs: 100, sm: 140 }, fontSize: '3rem', border: '4px solid #fff' }}
            >
              {fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
                {fullName}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
                {headline}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Button variant="contained" size="large" sx={{ borderRadius: 99, px: 4 }}>Follow</Button>
                <Button variant="outlined" size="large" sx={{ borderRadius: 99, px: 4 }} onClick={handleMessageClick}>Message</Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>

        <Divider sx={{ mx: 4 }} />

        {/* --- Stats Section --- */}
        <CardContent sx={{ py: 3 }}>
          <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item><StatItem value={profile?.rScore || 0} label="R-Score" /></Grid>
            <Grid item><StatItem value={profile?.followersCount || 0} label="Followers" /></Grid>
            <Grid item><StatItem value={profile?.followingCount || 0} label="Following" /></Grid>
            <Grid item><StatItem value={profile?.postsCount || 0} label="Posts" /></Grid>
          </Grid>
        </CardContent>
        
        <Divider sx={{ mx: 4, display: (professional?.skills?.length > 0 || profile?.bio) ? 'block' : 'none' }} />

        {/* --- Bio and Skills --- */}
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            {profile?.bio && (
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#334155' }}>About Me</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {profile.bio}
                    </Typography>
                </Grid>
            )}
            
            {professional?.skills?.length > 0 && (
              <Grid item xs={12} md={profile?.bio ? 6 : 12}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#334155' }}>Skills</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1.2}>
                  {professional.skills.map((skill) => (
                    <Chip key={skill} label={skill} variant="outlined" sx={{ fontWeight: 500 }} />
                  ))}
                </Stack>
              </Grid>
            )}
          </Grid>
        </CardContent>
        
        {/* --- Contact & Socials --- */}
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.03)', p: { xs: 2, md: 3 } }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, sm: 4 }} 
            alignItems="center" 
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'text.secondary' }}>
                <EmailIcon fontSize="small" />
                <Link href={`mailto:${email}`} color="inherit" sx={{ fontWeight: 500 }}>{email}</Link>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              {profile?.socialLinks?.linkedin && (
                <IconButton component={Link} href={profile.socialLinks.linkedin} target="_blank">
                  <LinkedInIcon />
                </IconButton>
              )}
              {profile?.socialLinks?.github && (
                <IconButton component={Link} href={profile.socialLinks.github} target="_blank">
                  <GitHubIcon />
                </IconButton>
              )}
              {profile?.socialLinks?.website && (
                <IconButton component={Link} href={profile.socialLinks.website} target="_blank">
                  <LanguageIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Box>

      </Card>
    </Container>
  );
}
