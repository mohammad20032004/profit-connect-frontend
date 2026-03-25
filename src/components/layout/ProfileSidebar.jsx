'use client';

import { useState } from "react";
import { Paper, Box, Typography, Divider, Avatar, Chip, Button, Alert } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, updateUserProfile } from "@/lib/features/userSlice";
import { getCurrentUser, uploadAvatar } from "@/services";

const MiniProfile = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const profile = useSelector((state) => state.user.profile);
    const user = useSelector((state) => state.user.user);
    const [uploading, setUploading] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const fullName =
        profile?.fullname ||
        [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') ||
        user?.username;
    const followersCount = profile?.followersCount || 0;
    const followingCount = profile?.followingCount || 0;
    const headline = user?.role || profile?.phoneNumber || 'Front End Developer';
    const avatarSrc = profile?.avatar || "/Images/login-photo.png";
    const Rscore = profile?.rScore || 0;

    const handleAvatarChange = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';

        if (!file) return;

        if (!token) {
            setFeedback({ type: 'error', message: 'يجب تسجيل الدخول أولاً.' });
            return;
        }

        if (!file.type.startsWith('image/')) {
            setFeedback({ type: 'error', message: 'الملف المختار يجب أن يكون صورة.' });
            return;
        }

        setUploading(true);
        setFeedback({ type: '', message: '' });

        try {
            const uploadResponse = await uploadAvatar(token, file);
            const nextUser =
                uploadResponse?.user ||
                uploadResponse?.data?.user ||
                null;

            if (nextUser) {
                dispatch(setAuthData({
                    token: uploadResponse?.token || token,
                    user: nextUser,
                }));

                setFeedback({ type: 'success', message: 'تم تحديث الصورة الشخصية بنجاح.' });
                return;
            }

            try {
                const refreshedData = await getCurrentUser(token);
                dispatch(setAuthData({
                    token,
                    user: refreshedData?.user,
                }));
            } catch {
                const nextProfile =
                    uploadResponse?.profile ||
                    uploadResponse?.user?.profile ||
                    uploadResponse?.data?.profile ||
                    (uploadResponse?.avatar ? { avatar: uploadResponse.avatar } : null) ||
                    (uploadResponse?.data?.avatar ? { avatar: uploadResponse.data.avatar } : null);

                if (nextProfile) {
                    dispatch(updateUserProfile(nextProfile));
                }
            }

            setFeedback({ type: 'success', message: 'تم تحديث الصورة الشخصية بنجاح.' });
        } catch (error) {
            setFeedback({ type: 'error', message: error.message || 'فشل رفع الصورة الشخصية.' });
        } finally {
            setUploading(false);
        }
    };

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

                <Button
                    component="label"
                    variant="outlined"
                    size="small"
                    startIcon={<CameraAltOutlinedIcon />}
                    disabled={uploading}
                    sx={{
                        mb: 2,
                        borderRadius: 999,
                        textTransform: 'none',
                        borderColor: '#d0d7de',
                        color: '#240046',
                        '&:hover': { borderColor: '#240046', bgcolor: '#f8f5ff' }
                    }}
                >
                    {uploading ? 'جارٍ رفع الصورة...' : 'تغيير الصورة'}
                    <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                </Button>

                {feedback.message ? (
                    <Alert severity={feedback.type || 'info'} sx={{ mb: 2, textAlign: 'right' }}>
                        {feedback.message}
                    </Alert>
                ) : null}

                <Chip
                    icon={
                        Rscore >= 4000 ? <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <Image src="/Images/High-Score.gif" width={50} height={50} alt="Score" />
                        </Box> : " "
                    }
                    label={"R-Score:" + " " + Rscore}
                    size="large"
                    sx={{
                        bgcolor: '#f0f0ff',
                        color: '#240046',
                        fontWeight: 700,
                        mb: 1
                    }}
                />
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
