'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography, Chip, Link, Paper, Alert } from '@mui/material';
import { Business, Cake, Email, GitHub, Language, LinkedIn, LocationOn, Phone, School, Work } from '@mui/icons-material';
import { getMe } from '@/services/authService';

// Mini-component for a user's post preview
const PostCard = ({ post }) => (
    <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>{post.content}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
            <Typography variant="caption">Likes: {post.likes.length}</Typography>
            <Typography variant="caption">Comments: {post.comments.length}</Typography>
        </Box>
    </Paper>
);

// Mini-component for professional details
const ProfessionalDetails = ({ professional }) => (
    <Box>
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Professional Info</Typography>
        <Chip icon={<Work />} label={`Industry: ${professional.industry}`} sx={{ mb: 1 }} />
        <Chip icon={<School />} label={`Experience: ${professional.yearsOfExperience} years`} sx={{ mb: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Skills:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {professional.skills.map(skill => <Chip key={skill} label={skill} color="secondary" />)}
        </Box>
    </Box>
);

export default function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            setError('Authentication token not found. Please log in.');
            return;
        }

        const fetchMyData = async () => {
            try {
                const { user } = await getMe(token);
                setUserData(user);
            } catch (err) {
                setError(err.message || 'Failed to fetch your profile data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyData();
    }, [token]);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!userData) {
        return <Alert severity="info">No profile data found.</Alert>;
    }

    const { profile, professional, posts, email } = userData;

    return (
        <Grid container spacing={3}>
            {/* Left Column: Main Profile Card */}
            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                            <Grid item>
                                <Avatar src={profile.avatar} sx={{ width: 100, height: 100, border: '3px solid', borderColor: 'primary.main' }} />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>{profile.fullname}</Typography>
                                <Typography variant="h6" color="text.secondary">{profile.headline}</Typography>
                                <Typography variant="body1" sx={{ my: 1 }}>{profile.bio}</Typography>
                                <Button variant="contained" sx={{ mt: 1 }}>Edit Profile</Button>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* Professional Details */}
                        {professional && <ProfessionalDetails professional={professional} />}

                    </CardContent>
                </Card>
            </Grid>

            {/* Right Column: Contact & Posts */}
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Contact & Links</Typography>
                    <Box display="flex" flexDirection="column" gap={1.5}>
                        <Link href={`mailto:${email}`} underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Email fontSize="small" /> {email}</Link>
                        {profile.phoneNumber && <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Phone fontSize="small" /> {profile.phoneNumber}</Typography>}
                        {profile.location && <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocationOn fontSize="small" /> {profile.location}</Typography>}
                        {profile.socialLinks?.linkedin && <Link href={profile.socialLinks.linkedin} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LinkedIn fontSize="small" /> LinkedIn</Link>}
                        {profile.socialLinks?.github && <Link href={profile.socialLinks.github} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><GitHub fontSize="small" /> GitHub</Link>}
                        {profile.socialLinks?.website && <Link href={profile.socialLinks.website} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Language fontSize="small" /> Website</Link>}
                    </Box>
                </Paper>

                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Your Recent Posts</Typography>
                    <Box maxHeight={400} overflow="auto">
                        {posts && posts.length > 0 ? (
                            posts.map(post => <PostCard key={post._id} post={post} />)
                        ) : (
                            <Typography>You haven't made any posts yet.</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
