'use client';

import { useRef, useState } from "react";
import { Paper, Box, Typography, Divider, Avatar, Chip, Alert, IconButton, Stack } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from "@mui/icons-material/Edit";
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
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
    const fileInputRef = useRef(null);

    // تجميع البيانات الأساسية
    const fullName = profile?.fullname || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || user?.username || 'User';
    const followersCount = profile?.followersCount || 0;
    const followingCount = profile?.followingCount || 0;
    const headline = user?.role || profile?.phoneNumber || 'Front End Developer';
    const avatarSrc = profile?.avatar || "/Images/login-photo.png";
    const Rscore = profile?.rScore || 0;

    const handleOpenFilePicker = () => {
        if (uploading) return;
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = ''; // Reset input

        if (!file) return;

        if (!token) {
            setFeedback({ type: 'error', message: 'You must be logged in first.' });
            return;
        }

        if (!file.type.startsWith('image/')) {
            setFeedback({ type: 'error', message: 'The selected file must be an image.' });
            return;
        }

        setUploading(true);
        setFeedback({ type: '', message: '' });

        try {
            const uploadResponse = await uploadAvatar(token, file);
            
            // استخراج البيانات الجديدة بذكاء
            const nextUser = uploadResponse?.user || uploadResponse?.data?.user;
            const nextProfile = uploadResponse?.profile || uploadResponse?.data?.profile || uploadResponse?.user?.profile;

            if (nextUser) {
                dispatch(setAuthData({
                    token: uploadResponse?.token || token,
                    user: nextUser,
                }));
            } else if (nextProfile) {
                dispatch(updateUserProfile(nextProfile));
            } else {
                // محاولة تحديث البيانات من السيرفر كحل أخير
                const refreshedData = await getCurrentUser(token);
                if (refreshedData?.user) {
                    dispatch(setAuthData({ token, user: refreshedData.user }));
                }
            }

            setFeedback({ type: 'success', message: 'Profile photo updated successfully.' });
        } catch (error) {
            setFeedback({ type: 'error', message: error.message || 'Failed to upload profile photo.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Paper elevation={0} sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            bgcolor: 'transparent',
            width: '100%'
        }}>
            <Box sx={{
                position: 'relative',
                zIndex: 1,
                height: 65,
                
            }}>
                <Box sx={{
                    position: 'absolute',
                    bottom: -42,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'inline-flex',
                    zIndex: 2
                }}>
                    <Avatar
                        onClick={handleOpenFilePicker}
                        sx={{
                            width: 84,
                            height: 84,
                            border: '4px solid',
                            borderColor: 'primary.dark',
                            boxShadow: '0 18px 34px rgba(36,0,70,0.2)',
                            cursor: uploading ? 'default' : 'pointer'
                        }}
                        src={avatarSrc}
                    />
                    
                </Box>
               
            </Box>

            <input
                ref={fileInputRef}
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
            />

            <Box sx={{ position: 'relative', zIndex: 1, pt: 6.5, pb: 2.5, px: 2.25, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem', mb: 0.5, color: 'primary.dark' }}>
                    {fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.88rem', mb: 2 }}>
                    {headline}
                </Typography>

                {feedback.message && (
                    <Alert severity={feedback.type || 'info'} sx={{ mb: 2, py: 0.3, borderRadius: 3, textAlign: 'left' }}>
                        {feedback.message}
                    </Alert>
                )}

                <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
                    <Chip
                        icon={Rscore >= 4000 ? <Image src="/Images/High-Score.gif" width={18} height={18} alt="Score" /> : <WorkspacePremiumRoundedIcon sx={{ color: 'primary.light' }} />}
                        label={`R-Score: ${Rscore}`}
                        sx={{
                            bgcolor: 'background.paper',
                            color: 'primary.dark',
                            fontWeight: 800,
                            height: 34,
                            border: 1,
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        }}
                    />
                   
                </Stack>
            </Box>


            <Box sx={{ position: 'relative', zIndex: 1, p: 1.25 }}>
                <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.2,
                        px: 1.25,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        border: "none",
                        mb: 1,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: 'custom.shadowLight' },
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: 2.5, bgcolor: 'rgba(56,189,248,0.14)', display: 'grid', placeItems: 'center' }}>
                                <VisibilityIcon sx={{ fontSize: 18, color: 'secondary.dark' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>Followers</Typography>
                                <Typography sx={{ fontWeight: 800, color: 'primary.dark', fontSize: '0.92rem' }}>{followersCount}</Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ color: 'secondary.main', fontSize: '0.8rem', fontWeight: 700 }}>View</Typography>
                    </Box>
                </Link>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.2,
                    px: 1.25,
                    borderRadius: 3,
                   bgcolor: 'background.paper',
                        border: "none",
                    mb: 1,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 'custom.shadowLight' },
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                        <Box sx={{ width: 34, height: 34, borderRadius: 2.5, bgcolor: 'rgba(16,185,129,0.14)', display: 'grid', placeItems: 'center' }}>
                            <TrendingUpIcon sx={{ fontSize: 18, color: 'success.dark' }} />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>Following</Typography>
                            <Typography sx={{ fontWeight: 800, color: 'primary.dark', fontSize: '0.92rem' }}>{followingCount}</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ color: 'success.main', fontSize: '0.8rem', fontWeight: 700 }}>Active</Typography>
                </Box>
            </Box>


            <Box sx={{
                position: 'relative',
                zIndex: 1,
                py: 1.5,
                px: 1.25,
            }}>
            </Box>
        </Paper>
    );
};

const ProfileSidebar = () => {
    return (
        <Box sx={{ width: '100%', position: 'sticky', top: 88 }}>
            <MiniProfile />
        </Box>
    );
};

export default ProfileSidebar;
