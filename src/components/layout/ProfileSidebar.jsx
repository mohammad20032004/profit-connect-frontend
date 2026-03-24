'use client';

import { Paper, Box, Typography, Divider, Avatar, Chip, LinearProgress } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const MiniProfile = () => {
    const profile = useSelector((state) => state.user.profile);
    const user = useSelector((state) => state.user.user);

    const fullName =
        profile?.fullname ||
        [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') ||
        user?.username;
    const followersCount = profile?.followersCount || 0;
    const followingCount = profile?.followingCount || 0;
    const headline = user?.role || profile?.phoneNumber || 'Front End Developer';
    const avatarSrc = profile?.avatar ? `/Images/${profile.avatar}` : "/Images/login-photo.png";

    return (
        <Paper elevation={0} sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            bgcolor: 'white',
            width: '100%'
        }}>
            {/* Cover & Avatar */}
            <Box sx={{
                height: 60,
                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                background: 'linear-gradient(135deg, #240046 0%, #3c096c 100%)',
                position: 'relative'
            }}>
                <Avatar
                    sx={{
                        width: 72,
                        height: 72,
                        border: '4px solid white',
                        position: 'absolute',
                        bottom: -36,
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                    src={avatarSrc}
                />
            </Box>

            {/* Profile Info */}
            <Box sx={{ pt: 5, pb: 2, px: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>{fullName}</Typography>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem', mb: 2 }}>{headline}</Typography>

                <Chip
                    icon={<VerifiedUserIcon sx={{ fontSize: 16 }} />}
                    label="R-Score: 98"
                    size="small"
                    sx={{
                        bgcolor: '#f0f0ff',
                        color: '#240046',
                        fontWeight: 700,
                        border: '1px solid #240046',
                        mb: 1
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Image src="/Images/High-Score.gif" width={50} height={50} alt="Score" />
                </Box>
            </Box>

            <Divider />

            {/* Stats */}
            <Box sx={{ py: 1.5, px: 2 }}>
                <Link href="/profile" style={{ textDecoration: 'none' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        '&:hover': { bgcolor: '#f5f5f5' },
                        cursor: 'pointer',
                        borderRadius: 1,
                        px: 1
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VisibilityIcon sx={{ fontSize: 18, color: '#666' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>Followers</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: '#00b4d8', fontSize: '0.9rem' }}>{followersCount}</Typography>
                    </Box>
                </Link>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    '&:hover': { bgcolor: '#f5f5f5' },
                    cursor: 'pointer',
                    borderRadius: 1,
                    px: 1
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 18, color: '#666' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>Following</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: '#00b4d8', fontSize: '0.9rem' }}>{followingCount}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* Saved Items */}
            <Box sx={{
                py: 1.5,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': { bgcolor: '#f5f5f5' },
                cursor: 'pointer'
            }}>
                <BookmarkBorderIcon sx={{ fontSize: 18, color: '#666' }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>My items</Typography>
            </Box>
        </Paper>
    )
}

const ProfileSidebar = () => {
    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <MiniProfile />
        </Box>
    )
};

export default ProfileSidebar;
