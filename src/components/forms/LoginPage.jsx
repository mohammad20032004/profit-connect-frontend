'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    InputAdornment,
    IconButton,
    Stack,
    Divider,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SchoolIcon from '@mui/icons-material/School'; // أيقونة قبعة التخرج
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';
import { login } from '@/services/authService';
import { setAuthData } from '@/lib/features/userSlice';

// 1. تخصيص حقل الإدخال ليطابق التصميم (حواف ناعمة وخلفية بيضاء)
const LoginTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {
            borderColor: '#E0E0E0',
        },
        '&:hover fieldset': {
            borderColor: '#BDBDBD',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#240046', // لون التركيز بنفسجي
        },
    },
});

// 2. زر تسجيل الدخول الرئيسي
const LoginButton = styled(Button)({
    backgroundColor: '#240046',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#1a0033',
    },
});

// 3. أزرار التواصل الاجتماعي
const SocialButton = styled(Button)({
    borderColor: '#E0E0E0',
    color: '#333',
    textTransform: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontWeight: '500',
    '&:hover': {
        backgroundColor: '#F5F5F5',
        borderColor: '#BDBDBD',
    },
});

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const data = await login(formData);

            dispatch(setAuthData({
                token: data?.token,
                user: data?.user,
            }));

            localStorage.setItem('profit_connect_token', data?.token);
            alert('تم تسجيل الدخول بنجاح!');
            router.push('/');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth={'xl'} sx={{ width: '100%', height: '100vh', py: 4 }}>
            <Grid container sx={{ height: '90vh', width: '100%' }} maxWidth={'xl'}>

                {/* ================= LEFT SIDE (Image & Branding) ================= */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        position: 'relative',
                        backgroundColor: '#240046',
                        backgroundImage: 'url(/Images/login-photo.png)', // صورة خلفية شبيهة
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: { xs: 'none', md: 'flex' }, // إخفاء في الموبايل
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        overflow: 'hidden',
                        color: 'white',
                        width: '50%',
                        '&::before': { // طبقة تغطية شفافة (Overlay) لجعل النص مقروءاً
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(36, 0, 70, 0.85)', // شفافية بنفسجية
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 4, maxWidth: '500px' }}>
                        {/* الأيقونة الكبيرة */}
                        <Image src={'/logo/white-logo.svg'} alt='logo' width={150} height={150} />

                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                            Build your professional future today.
                        </Typography>

                        <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.8 }}>
                            Join thousands of professionals accelerating their careers with personalized pathways and networking.
                        </Typography>
                    </Box>

                    {/* الشعار الصغير في الأسفل */}
                    <Box sx={{ position: 'relative', zIndex: 1, position: 'absolute', bottom: 40, left: 40, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 0.5, borderRadius: '50%' }}>
                            <Image src={'/logo/white-logo.svg'} alt='logo' width={50} height={50} />

                        </Box>
                        <Typography variant="subtitle2" sx={{ letterSpacing: 2 }}>Profit Connect</Typography>
                    </Box>
                </Grid>

                {/* ================= RIGHT SIDE (Form) ================= */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        width: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff'
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '100%' }, p: 4 }}>

                        {/* Logo Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                            <Box sx={{ bgcolor: '#240046', color: 'white', p: 0.5, borderRadius: '4px', display: 'flex' }}>
                                <Typography variant="h5" fontWeight="bold" lineHeight={1} px={0.5}>P</Typography>
                            </Box>
                            <Typography variant="h5" fontWeight="bold" color="#240046" ml={-1}>
                                rofit Connect
                            </Typography>
                        </Box>

                        <Typography variant="h4" fontWeight="bold" gutterBottom color="#191919">
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Please enter your details to sign in.
                        </Typography>

                        <form noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3}>

                                {/* Email Input */}
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1, color: '#333' }}>
                                        Email Address
                                    </Typography>
                                    <LoginTextField
                                        fullWidth
                                        placeholder="name@company.com"
                                        variant="outlined"
                                        type="email"
                                        value={formData.email}
                                        onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                                    />
                                </Box>

                                {/* Password Input */}
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1, color: '#333' }}>
                                        Password
                                    </Typography>
                                    <LoginTextField
                                        fullWidth
                                        placeholder="••••••••"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>

                                {/* Remember Me & Forgot Password */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox sx={{ color: '#E0E0E0', '&.Mui-checked': { color: '#240046' } }} />}
                                        label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                                    />
                                    <Link href="#" underline="hover" sx={{ color: '#00B4D8', fontWeight: '600', fontSize: '14px' }}>
                                        Forgot Password?
                                    </Link>
                                </Box>

                                
                                {/* Submit Button */}
                                <LoginButton fullWidth variant="contained" type="submit" disabled={loading}>
                                    {loading ? 'Signing In...' : 'Log In'}
                                </LoginButton>
                             
                            </Stack>
                        </form>

                        {/* Divider */}
                        <Divider sx={{ my: 4, color: 'text.secondary', fontSize: '14px' }}>
                            Or continue with
                        </Divider>

                        {/* Social Buttons */}
                        <Stack direction="row" spacing={2}>
                            <SocialButton fullWidth startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}>
                                Google
                            </SocialButton>
                            <SocialButton fullWidth startIcon={<LinkedInIcon sx={{ color: '#0A66C2' }} />}>
                                LinkedIn
                            </SocialButton>
                        </Stack>

                        {/* Footer */}
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don&apos;t have an account?{' '}
                                <Link href="/sign-up" underline="hover" sx={{ color: '#00B4D8', fontWeight: 'bold' }}>
                                    Sign up
                                </Link>
                            </Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>

        </Container>
    );
}
