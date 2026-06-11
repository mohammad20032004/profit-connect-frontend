'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography, Alert } from '@mui/material';
import { Cake, Email, LocationOn, Phone, Public, Work } from '@mui/icons-material';
import { getUserById, followUser, unfollowUser } from '@/services/userService';
import { setUser } from '@/store/userSlice'; // To update the store after follow/unfollow

const StatItem = ({ label, value }) => (
    <Box textAlign="center">
        <Typography variant="h6" sx={{ color: 'primary.main' }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
);

const InfoItem = ({ icon, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
        {icon}
        <Typography variant="body1">{text || 'N/A'}</Typography>
    </Box>
);

export default function ProfileOverview({ userId: propUserId }) {
    const dispatch = useDispatch();
    const [profileUser, setProfileUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionInProgress, setActionInProgress] = useState(false);

    const { user: currentUser, token } = useSelector((state) => state.user);
    const userId = propUserId || currentUser?.id;

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        const fetchUserData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const { user } = await getUserById({ token, userId });
                setProfileUser(user);
                setIsFollowing(currentUser.profile.following.some(followedUser => followedUser._id === user.id));
            } catch (err) {
                setError(err.message || 'Failed to fetch user data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId, token, currentUser]);

    const handleFollowToggle = async () => {
        setActionInProgress(true);
        setError('');
        try {
            let updatedCurrentUser;
            if (isFollowing) {
                await unfollowUser({ token, userId });
                // Optimistically update UI
                updatedCurrentUser = {
                    ...currentUser,
                    profile: {
                        ...currentUser.profile,
                        followingCount: currentUser.profile.followingCount - 1,
                        following: currentUser.profile.following.filter(u => u._id !== userId),
                    }
                };
            } else {
                await followUser({ token, userId });
                updatedCurrentUser = {
                    ...currentUser,
                    profile: {
                        ...currentUser.profile,
                        followingCount: currentUser.profile.followingCount + 1,
                        following: [...currentUser.profile.following, { _id: userId, profile: profileUser.profile }], // Add basic info for consistency
                    }
                };
            }
            setIsFollowing(!isFollowing);
            dispatch(setUser(updatedCurrentUser)); // Update Redux state

            // Also update the local profileUser's followersCount for immediate UI feedback
            setProfileUser(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    followersCount: isFollowing ? prev.profile.followersCount - 1 : prev.profile.followersCount + 1,
                }
            }))

        } catch (err) {
            setError(err.message || 'Action failed. Please try again.');
        } finally {
            setActionInProgress(false);
        }
    };


    const isOwnProfile = useMemo(() => currentUser?.id === profileUser?.id, [currentUser, profileUser]);

    const renderActionButtons = () => {
        if (isOwnProfile) {
            return <Button variant="contained" color="primary">Edit Profile</Button>;
        }

        return (
            <Button
                variant={isFollowing ? 'outlined' : 'contained'}
                color={isFollowing ? 'secondary' : 'primary'}
                onClick={handleFollowToggle}
                disabled={actionInProgress}
                sx={{ minWidth: 120 }}
            >
                {actionInProgress ? <CircularProgress size={24} /> : (isFollowing ? 'Unfollow' : 'Follow')}
            </Button>
        );
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    if (!profileUser) {
        return <Alert severity="error">{error || 'User not found.'}</Alert>;
    }

    const { profile, role, email } = profileUser;

    const infoItems = [
        { icon: <Work fontSize="small" />, text: role },
        { icon: <LocationOn fontSize="small" />, text: profile?.location },
        { icon: <Email fontSize="small" />, text: email },
        { icon: <Phone fontSize="small" />, text: profile?.phone },
        { icon: <Cake fontSize="small" />, text: profile?.dateOfBirth?.slice(0, 10) },
        { icon: <Public fontSize="small" />, text: profile?.website },
    ];

    return (
        <Card>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Grid container spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                    <Grid item>
                        <Avatar src={profile?.avatar} sx={{ width: 80, height: 80, border: '3px solid', borderColor: 'primary.main' }} />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{profile?.fullname}</Typography>
                        <Typography variant="body1" color="text.secondary">{profile?.headline}</Typography>
                    </Grid>
                    <Grid item>{renderActionButtons()}</Grid>
                </Grid>

                <Grid container justifyContent="space-around" sx={{ mb: 3 }}>
                    <StatItem label="Followers" value={profile?.followersCount ?? 0} />
                    <StatItem label="Following" value={profile?.followingCount ?? 0} />
                    <StatItem label="Posts" value={profileUser.posts?.length ?? 0} />
                </Grid>

                {profile?.bio && <>
                    <Divider sx={{ mb: 3 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: 'text.primary', mb: 1.5 }}>About</Typography>
                        <Typography variant="body1" color="text.secondary">{profile.bio}</Typography>
                    </Box>
                </>}

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>
                    {infoItems.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <InfoItem icon={item.icon} text={item.text} />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
