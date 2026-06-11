'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    Avatar, Box, Button, Card, CardContent, CircularProgress, 
    Divider, Grid, Typography, Chip, Link, Alert, Stack 
} from '@mui/material';
import { 
    Email, GitHub, Language, LinkedIn, LocationOn, Phone, 
    School, Work, ThumbUpOutlined, ChatBubbleOutlineOutlined, 
    PeopleAltOutlined, WorkspacePremiumOutlined, CalendarTodayOutlined
} from '@mui/icons-material';
import { getMe } from '@/services/authService';

// دالة مساعدة لتنسيق التاريخ
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
};

// 1. مكون المنشور المحسن
const PostCard = ({ post, authorName, authorAvatar }) => (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 3, transition: '0.3s', '&:hover': { borderColor: 'primary.light' } }}>
        <CardContent sx={{ p: '16px !important' }}>
            {/* ترويسة المنشور */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar src={authorAvatar} sx={{ width: 40, height: 40 }} />
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{authorName}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayOutlined sx={{ fontSize: 14 }} /> {formatDate(post.createdAt)}
                    </Typography>
                </Box>
            </Stack>
            
            {/* محتوى المنشور */}
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                {post.content}
            </Typography>
            
            <Divider sx={{ mb: 1.5 }} />
            
            {/* التفاعلات */}
            <Stack direction="row" spacing={3} color="text.secondary">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                    <ThumbUpOutlined fontSize="small" />
                    <Typography variant="body2" fontWeight="500">{post.likes.length} إعجاب</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                    <ChatBubbleOutlineOutlined fontSize="small" />
                    <Typography variant="body2" fontWeight="500">{post.comments.length} تعليق</Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

// 2. مكون لعنصر اتصال واحد (مظهر أنيق للروابط)
const ContactItem = ({ icon, text, href }) => {
    const content = (
        <Box sx={{ 
            display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, 
            borderRadius: 2, transition: 'background 0.2s',
            '&:hover': { bgcolor: 'background.default', color: 'primary.main' }
        }}>
            {icon}
            <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-all' }}>{text}</Typography>
        </Box>
    );

    return href ? (
        <Link href={href} target="_blank" underline="none" color="inherit">
            {content}
        </Link>
    ) : content;
};

export default function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const token = useSelector((state) => state.user.token);
const accessToken = token || localStorage.getItem('profit_connect_token');
    useEffect(() => {
        if (!accessToken) {
            setIsLoading(false);
            setError('Authentication token not found. Please log in.');
            return;
        }

        const fetchMyData = async () => {
            try {
                const { user } = await getMe(accessToken);
                setUserData(user);
            } catch (err) {
                setError(err.message || 'Failed to fetch your profile data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyData();
    }, [accessToken]);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress size={50} thickness={4} /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>;
    }

    if (!userData) {
        return <Alert severity="info" sx={{ borderRadius: 2 }}>No profile data found.</Alert>;
    }

    const { profile, professional, posts, email } = userData;

    return (
        <Box sx={{ maxWidth: 1800, mx: 'auto', py: 4 }}>
            <Grid container spacing={15}>
                
                {/* العمود الأيسر: البطاقة الرئيسية للملف الشخصي والمعلومات المهنية */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 4, overflow: 'visible', pt: 5, border: 'none', boxShadow: 'none' }}>
                        {/* غلاف الملف الشخصي (Banner) */}
                     
                        
                        <CardContent sx={{ px: 4, pb: 4, pt: 0, position: 'relative' }}>
                            <Grid container spacing={3} alignItems="center">
                                {/* الصورة الشخصية (متداخلة مع الغلاف) */}
                                <Grid item xs={12} sm="auto" sx={{ mt: -7, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                    <Avatar 
                                        src={profile.avatar} 
                                        sx={{ 
                                            width: 140, 
                                            height: 140, 
                                            border: '5px solid white', 
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            bgcolor: 'background.paper'
                                        }} 
                                    />
                                </Grid>
                                
                                {/* معلومات المستخدم الأساسية */}
                                <Grid item xs sx={{ pt: { xs: 2, sm: 3 }, textAlign: { xs: 'center', sm: 'left' } }}>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'center', sm: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                                {profile.fullname}
                                            </Typography>
                                            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>
                                                {profile.headline}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 0.5, mb: 2 }}>
                                                <LocationOn fontSize="small" /> {profile.location}
                                            </Typography>
                                        </Box>
                                        <Button variant="contained" color="primary" sx={{ px: 4, py: 1, borderRadius: 8, whiteSpace: 'nowrap' }}>
                                            تعديل الحساب
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* الإحصائيات (Stats) */}
                            <Stack direction="row" spacing={4} sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 3, justifyContent: 'center' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" fontWeight="bold">{profile.followersCount}</Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PeopleAltOutlined fontSize="small"/> المتابعون</Typography>
                                </Box>
                                <Divider orientation="vertical" flexItem />
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" fontWeight="bold">{profile.followingCount}</Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PeopleAltOutlined fontSize="small"/> يتابع</Typography>
                                </Box>
                                <Divider orientation="vertical" flexItem />
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" fontWeight="bold" color="secondary.main">{profile.rScore}</Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><WorkspacePremiumOutlined fontSize="small"/> التقييم (R-Score)</Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ my: 4 }} />

                            {/* قسم النبذة التعريفية (About) */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>نبذة عني</Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {profile.bio}
                                </Typography>
                            </Box>

                            {/* قسم المعلومات المهنية والمهارات */}
                            {professional && (
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>الخبرات والمهارات المهنية</Typography>
                                    <Grid container spacing={2} sx={{ mb: 3 }}>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                                                <Work color="primary" />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">المجال والصناعة</Typography>
                                                    <Typography variant="body1" fontWeight="bold">{professional.industry}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                                                <School color="primary" />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">سنوات الخبرة</Typography>
                                                    <Typography variant="body1" fontWeight="bold">{professional.yearsOfExperience} سنوات</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="subtitle1" sx={{ mb: 1.5 }}>المهارات التقنية (Skills):</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                        {professional.skills.map(skill => (
                                            <Chip 
                                                key={skill} 
                                                label={skill} 
                                                sx={{ 
                                                    bgcolor: 'primary.light', 
                                                    color: 'white', 
                                                    fontWeight: 500,
                                                    px: 1
                                                }} 
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* العمود الأيمن: وسائل التواصل والمنشورات */}
                <Grid item xs={12} md={4}>
                    
                    {/* بطاقة معلومات التواصل */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>معلومات التواصل</Typography>
                            <Stack spacing={0.5}>
                                <ContactItem icon={<Email color="action" />} text={email} href={`mailto:${email}`} />
                                {profile.phoneNumber && <ContactItem icon={<Phone color="action" />} text={profile.phoneNumber} />}
                                {profile.socialLinks?.linkedin && <ContactItem icon={<LinkedIn color="primary" />} text="LinkedIn Profile" href={profile.socialLinks.linkedin} />}
                                {profile.socialLinks?.github && <ContactItem icon={<GitHub color="action" />} text="GitHub Profile" href={profile.socialLinks.github} />}
                                {profile.socialLinks?.website && <ContactItem icon={<Language color="secondary" />} text="Personal Website" href={profile.socialLinks.website} />}
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* بطاقة المنشورات الحديثة */}
                    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', border: 'none' }}>
                        <Typography variant="h6" sx={{ mb: 2, px: 1 }}>أحدث المنشورات ({posts.length})</Typography>
                        <Box sx={{ maxHeight: 600, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: '10px' } }}>
                            {posts && posts.length > 0 ? (
                                posts.map(post => (
                                    <PostCard 
                                        key={post._id} 
                                        post={post} 
                                        authorName={profile.fullname} 
                                        authorAvatar={profile.avatar} 
                                    />
                                ))
                            ) : (
                                <Alert severity="info" sx={{ borderRadius: 2 }}>لا توجد منشورات لعرضها حالياً.</Alert>
                            )}
                        </Box>
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
}