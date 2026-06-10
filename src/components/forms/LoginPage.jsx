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
        <Container maxWidth="xl" sx={{ height: '100vh', py: { xs: 2, md: 4 }, display: 'flex', alignItems: 'center' }}>
            <Grid container sx={{ height: { xs: 'auto', md: '90vh' }, width: '100%', boxShadow: { md: '0px 8px 40px rgba(0,0,0,0.12)' }, borderRadius: { md: 5 }, overflow: 'hidden' }}>

                {/* Left Side (Image & Branding) */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
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
                        <Image src={'/logo/white-logo.svg'} alt='logo' width={150} height={150} />
                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                            Build your professional future today.
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'normal', opacity: 0.9 }}>
                            Join thousands of professionals accelerating their careers with personalized pathways and networking.
                        </Typography>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 40, left: 40 }}>
                        <Logo variant="light" />
                    </Box>
                </Grid>

                {/* Right Side (Form) */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.paper',
                        p: { xs: 3, sm: 5, md: 6 }
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: '450px' }}>
                        <Logo />
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 3, color: 'text.primary' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
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

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked sx={{ '&.Mui-checked': { color: 'primary.main' } }} />}
                                        label={<Typography variant="body2">Remember me</Typography>}
                                    />
                                    <Link href="#" underline="hover" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                                        Forgot Password?
                                    </Link>
                                </Box>

                                <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ py: 1.5, fontSize: '1rem' }}>
                                    {loading ? 'Signing In...' : 'Log In'}
                                </Button>
                            </Stack>
                        </form>

                        <Divider sx={{ my: 4 }}>Or continue with</Divider>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ py: 1.2 }}>
                                Google
                            </Button>
                            <Button fullWidth variant="outlined" startIcon={<LinkedInIcon color="primary" />} sx={{ py: 1.2 }}>
                                LinkedIn
                            </Button>
                        </Stack>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" underline="hover" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
