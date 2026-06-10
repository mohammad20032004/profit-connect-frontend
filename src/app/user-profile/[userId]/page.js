'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Work,
  Mail,
  PersonAdd,
  CheckCircle,
  AccessTime,
} from '@mui/icons-material';

import { Post } from '@/components/posts';
import { 
  sendConnectionRequest,
  cancelConnectionRequest,
  removeConnection,
} from '@/services';

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.userId;
  const { token, user: currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) {
        setError('User ID not found.');
        setLoading(false);
        return;
      }

      if (!token) {
        setError('Authentication required to view profiles.');
        setLoading(false);
        // Optional: redirect to login page
        // router.push('/login');
        return;
      }

      try {
        setLoading(true);
        setError('');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
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
  }, [id, token, router]);

  const handleSendMessage = () => {
    if (userData?._id) {
      router.push(`/messaging?new=${userData._id}`);
    }
  };

  const connectionStatus = useMemo(() => {
    if (!currentUser || !userData) return 'none';
    if (currentUser.connections?.includes(userData._id)) return 'connected';
    if (currentUser.sentRequests?.includes(userData._id)) return 'sent';
    if (currentUser.receivedRequests?.includes(userData._id)) return 'received';
    return 'none';
  }, [currentUser, userData]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Container sx={{ py: 4 }}><Alert severity="error">Failed to load profile: {error}</Alert></Container>;
  }

  if (!userData) {
    return <Container sx={{ py: 4 }}><Alert severity="warning">User not found.</Alert></Container>;
  }

  const { profile, posts, role, username, email, connections } = userData;
  const fullName = profile?.fullname || `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || username;
  const headline = profile?.headline || 'No headline available';

  const renderConnectionButton = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Button variant="outlined" startIcon={<CheckCircle />}>Connected</Button>;
      case 'sent':
        return <Button variant="outlined" startIcon={<AccessTime />}>Request Sent</Button>;
      case 'received':
        return <Button variant="contained">Accept Request</Button>;
      default:
        return <Button variant="contained" startIcon={<PersonAdd />}>Connect</Button>;
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 46%, #f8f5ff 100%)', minHeight: '100vh' }}>
      <Container sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{
            p: { xs: 2, md: 4 }, 
            borderRadius: 4, 
            border: '1px solid rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 40px rgba(15,23,42,0.07)'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={profile?.avatar} 
                sx={{ 
                  width: 150, 
                  height: 150, 
                  mb: 2, 
                  border: '4px solid #fff',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b', textAlign: 'center' }}>
                {fullName}
              </Typography>
              <Typography sx={{ color: '#475569', textAlign: 'center' }}>
                {headline}
              </Typography>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {renderConnectionButton()}
                <Button variant="outlined" onClick={handleSendMessage}>Message</Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography sx={{ fontWeight: 'bold', mb: 1.5, color: '#334155' }}>About</Typography>
                <Typography sx={{ color: '#475569', lineHeight: 1.7 }}>
                  {profile?.bio || 'No bio available.'}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2, color: '#475569' }}>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocationOn fontSize="small" />
                    <Typography>{profile?.location || 'Not specified'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Work fontSize="small" />
                    <Typography>{role || 'Not specified'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Mail fontSize="small" />
                    <Typography>{email}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Posts" />
            <Tab label={`Connections (${connections?.length || 0})`} />
          </Tabs>

          <Box sx={{ pt: 3 }}>
            {tabValue === 0 && (
              posts && posts.length > 0 ? (
                <Grid container spacing={2}>
                  {posts.map(post => (
                    <Grid item xs={12} key={post._id}>
                      <Post {...post} authorName={fullName} authorImage={profile?.avatar} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography sx={{ textAlign: 'center', color: '#64748b', mt: 4 }}>No posts to display.</Typography>
              )
            )}
            {tabValue === 1 && (
               <Typography sx={{ textAlign: 'center', color: '#64748b', mt: 4 }}>Connections list not implemented yet.</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
