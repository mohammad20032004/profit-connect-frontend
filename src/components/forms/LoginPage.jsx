'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    Box,
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';
import { login } from '@/services/authService';
import { setAuthData } from '@/lib/features/userSlice';
import { Logo } from '../common';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const data = await login(formData);
            dispatch(setAuthData({ token: data?.token, user: data?.user }));
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
        <Container 
            maxWidth="xl" 
            sx={{ 
                minHeight: '100vh', 
                py: { xs: 4, md: 2 }, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >    
            {/* الحاوية الرئيسية تحولت إلى Flexbox */}
            <Box 
                sx={{ 
                    display: 'flex',
                    // xs: عمودي (فوق بعض)، md: أفقي (بجانب بعض لتقسيم المساحة)
                    flexDirection: { xs: 'column', md: 'row' }, 
                    height: { xs: 'auto', md: '90vh' }, 
                    minHeight: { md: '650px' },
                    width: '100%', 
                    boxShadow: { xs: 'none', sm: '0px 8px 40px rgba(0,0,0,0.12)' }, 
                    borderRadius: { xs: 0, sm: 5 }, 
                    overflow: 'hidden',
                    backgroundColor: 'background.paper',
                    mx: {xs: 0, md: 4,lg: 15}
                }}
            >

                {/* القسم الأيسر الصوري (Image & Branding) */}
                {/* يأخذ flex: 1 في الشاشات الكبيرة ليقسم المساحة بالتساوي (50%)، ويختفي في الشاشات الصغيرة */}
                <Box
                    sx={{
                        flex: 1, 
                        position: 'relative',
                        background: (theme) => `linear-gradient(rgba(36, 0, 70, 0.85), rgba(36, 0, 70, 0.85)), url(/Images/login-photo.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    <Box sx={{ textAlign: 'center', px: 4, maxWidth: '500px' }}>
                        <Image src={'/logo/white-logo.svg'} alt='logo' width={120} height={120} style={{ marginBottom: '16px' }} />
                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, fontSize: { md: '2rem', lg: '2.5rem' } }}>
                            Build your professional future today.
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.9, fontSize: { md: '0.95rem', lg: '1.1rem' } }}>
                            Join thousands of professionals accelerating their careers with personalized pathways and networking.
                        </Typography>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 40, left: 40 }}>
                        <Logo variant="light" />
                    </Box>
                </Box>

                {/* القسم الأيمن (Form) */}
                {/* يأخذ flex: 1 ليمثل الـ 50% الأخرى في الشاشات الكبيرة، ويأخذ العرض الكامل 100% في الشاشات الصغيرة */}
                <Box
                    sx={{
                        flex: 1, 
                        width: { xs: '100%', md: 'auto' }, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: 'background.paper',
                        p: { xs: 2, sm: 5, md: 2 },
                        overflowY: 'auto'
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: '550px' , px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 6 }, mx: 'auto' }}>
                        <Logo />
                        <Typography 
                            variant="h4" 
                            fontWeight="bold" 
                            gutterBottom 
                            sx={{ mt: 3, color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.1rem' } }}
                        >
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                            Please enter your details to sign in.
                        </Typography>

                        <form noValidate onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked sx={{ '&.Mui-checked': { color: 'primary.main' } }} />}
                                        label={<Typography variant="body2">Remember me</Typography>}
                                    />
                                    <Link href="#" underline="hover" sx={{ color: 'secondary.main', fontWeight: 'bold', fontSize: '0.875rem' }}>
                                        Forgot Password?
                                    </Link>
                                </Box>

                                <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ py: 1.5, fontSize: '1rem' }}>
                                    {loading ? 'Signing In...' : 'Log In'}
                                </Button>
                            </Stack>
                        </form>

                       

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" underline="hover" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
                
            </Box>
        </Container>
    );
}