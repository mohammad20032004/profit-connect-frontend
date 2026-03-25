"use client";

import {
  Avatar, Box, Button, Container, Grid, Paper, Stack, Typography, Divider
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector } from 'react-redux';

// ألوان هادئة واحترافية (SaaS & LinkedIn Style)
const theme = {
  bg: '#f4f5f7', // خلفية رمادية فاتحة جداً تريح العين
  cardBorder: '#e5e7eb',
  textMain: '#111827',
  textMuted: '#6b7280',
  primary: '#240046', // لون مشروعك الأساسي
  link: '#0a66c2', // لون الروابط (أزرق لينكد إن)
};

// مكون موحد للبطاقات لضمان تناسق التصميم (ظلال ناعمة وزوايا متطابقة)
const ProfileCard = ({ children, sx = {} }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 3,
      border: `1px solid ${theme.cardBorder}`,
      bgcolor: '#ffffff',
      mb: 3,
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)', // ظل خفيف جداً للفخامة
      ...sx
    }}
  >
    {children}
  </Paper>
);

export default function ProfileOverview() {
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.user.profile);

  // استخراج الاسم وعرضه
  const fullName = profile?.fullname || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || user?.username || 'Amen AL Abed Development';
  const avatarSrc = profile?.avatar || undefined;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.bg, py: { xs: 3, md: 5 }, width: '100%' }}>
      <Container maxWidth="lg">
        {/* استخدام alignItems: flex-start يمنع الشريط الجانبي من التمدد بشكل غريب */}
        <Grid container spacing={3} alignItems="flex-start">
          
          {/* ================= العمود الرئيسي (اليسار) ================= */}
          <Grid item xs={12} md={8}>
            
            {/* 1. بطاقة الهوية (Header Card) */}
            <ProfileCard>
              {/* صورة الغلاف مع تدرج لوني عصري */}
              <Box 
                sx={{ 
                  height: 200, 
                  background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', 
                  position: 'relative' 
                }} 
              />
              
              <Box sx={{ px: { xs: 3, md: 4 }, pb: 4, position: 'relative' }}>
                {/* حاوية الصورة والأزرار */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: '-75px', mb: 2 }}>
                  
                  {/* الصورة الشخصية */}
                  <Avatar
                    src={avatarSrc}
                    sx={{
                      width: 150,
                      height: 150,
                      border: '4px solid white',
                      bgcolor: theme.primary,
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}
                  >
                    {fullName?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  
                  {/* الأزرار بجانب بعضها */}
                  <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<ShareOutlinedIcon />}
                      sx={{ 
                        borderRadius: 20, 
                        textTransform: 'none', 
                        fontWeight: 700, 
                        borderColor: '#d1d5db', 
                        color: theme.textMain,
                        '&:hover': { bgcolor: '#f9fafb', borderColor: '#9ca3af' }
                      }}
                    >
                      Share
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<EditOutlinedIcon />}
                      sx={{ 
                        borderRadius: 20, 
                        textTransform: 'none', 
                        fontWeight: 700, 
                        bgcolor: theme.primary,
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#3c096c', boxShadow: 'none' }
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Stack>
                </Box>

                {/* معلومات المستخدم (الاسم، الوظيفة، الموقع) */}
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: theme.textMain, letterSpacing: '-0.02em' }}>
                    {fullName}
                  </Typography>
                  <Typography sx={{ fontSize: '1.15rem', color: theme.textMain, mt: 0.5 }}>
                    {user?.role || 'Admin'} • @{user?.username || 'amen_abed'}
                  </Typography>
                  <Typography sx={{ fontSize: '0.95rem', color: theme.textMuted, mt: 1 }}>
                    {profile?.location || 'Location not specified'} • 
                    <Typography component="span" sx={{ color: theme.link, fontWeight: 700, ml: 1, cursor: 'pointer', '&:hover':{textDecoration:'underline'} }}>
                      {profile?.followersCount ?? 0} followers
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </ProfileCard>

            {/* 2. بطاقة النبذة (About) */}
            <ProfileCard sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: theme.textMain, mb: 1.5 }}>
                About
              </Typography>
              <Typography sx={{ color: theme.textMain, lineHeight: 1.7, fontSize: '1rem' }}>
                {profile?.bio || 'No summary provided yet. Add a summary to tell your professional story, highlight your skills, and showcase your expertise.'}
              </Typography>
            </ProfileCard>

            {/* 3. الروابط الاجتماعية (Social Links) */}
            <ProfileCard sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: theme.textMain, mb: 3 }}>
                Social & Links
              </Typography>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <LinkedInIcon sx={{ color: '#0a66c2', fontSize: 32 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: theme.textMain }}>LinkedIn</Typography>
                    <Typography sx={{ color: theme.textMuted, fontSize: '0.9rem' }}>{profile?.socialLinks?.linkedin || 'Not added yet'}</Typography>
                  </Box>
                </Stack>
                <Divider sx={{ borderColor: '#f3f4f6' }} />
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <GitHubIcon sx={{ color: '#24292f', fontSize: 32 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: theme.textMain }}>GitHub</Typography>
                    <Typography sx={{ color: theme.textMuted, fontSize: '0.9rem' }}>{profile?.socialLinks?.github || 'Not added yet'}</Typography>
                  </Box>
                </Stack>
                <Divider sx={{ borderColor: '#f3f4f6' }} />
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <LanguageIcon sx={{ color: '#4b5563', fontSize: 32 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: theme.textMain }}>Website</Typography>
                    <Typography sx={{ color: theme.textMuted, fontSize: '0.9rem' }}>{profile?.socialLinks?.website || 'Not added yet'}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </ProfileCard>

          </Grid>

          {/* ================= الشريط الجانبي (اليمين) ================= */}
          <Grid item xs={12} md={4}>
            
            {/* بطاقة الإحصائيات (Analytics) */}
            <ProfileCard sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 800, color: theme.textMain, mb: 1, fontSize: '1.1rem' }}>
                Analytics
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: theme.textMuted, mb: 2, display: 'flex', alignItems: 'center' }}>
                <i className="material-symbols-outlined" style={{ fontSize: 16, marginRight: 4 }}>visibility</i> 
                Private to you
              </Typography>
              
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f9fafb' }, p: 1.5, borderRadius: 2, transition: 'background 0.2s' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: theme.primary, fontSize: '1.1rem' }}>{profile?.followersCount ?? 0}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: theme.textMain, fontWeight: 500 }}>Profile views</Typography>
                  </Box>
                  <ArrowForwardIcon sx={{ color: theme.textMuted, fontSize: 20 }} />
                </Box>
                <Divider sx={{ borderColor: '#f3f4f6' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f9fafb' }, p: 1.5, borderRadius: 2, transition: 'background 0.2s' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: theme.primary, fontSize: '1.1rem' }}>{profile?.postsCount ?? 0}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: theme.textMain, fontWeight: 500 }}>Post impressions</Typography>
                  </Box>
                  <ArrowForwardIcon sx={{ color: theme.textMuted, fontSize: 20 }} />
                </Box>
              </Stack>
            </ProfileCard>

            {/* بطاقة معلومات التواصل (Contact Info) */}
            <ProfileCard sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 800, color: theme.textMain, mb: 3, fontSize: '1.1rem' }}>
                Contact Info
              </Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <EmailOutlinedIcon sx={{ color: theme.textMuted }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: theme.textMain }}>Email</Typography>
                    <Typography sx={{ color: theme.link, fontSize: '0.9rem', wordBreak: 'break-all' }}>
                      {user?.email || 'Mohammad.amen@example.com'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <PhoneOutlinedIcon sx={{ color: theme.textMuted }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: theme.textMain }}>Phone</Typography>
                    <Typography sx={{ color: theme.textMuted, fontSize: '0.9rem' }}>
                      {profile?.phoneNumber || '+1-555-0000'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <AlternateEmailOutlinedIcon sx={{ color: theme.textMuted }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: theme.textMain }}>Username</Typography>
                    <Typography sx={{ color: theme.textMuted, fontSize: '0.9rem' }}>
                      @{user?.username || 'amen_abed'}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </ProfileCard>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
