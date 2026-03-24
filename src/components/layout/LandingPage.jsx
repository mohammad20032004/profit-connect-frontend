"use client";

import React from 'react'
import { Box, Button, Chip, Container, Stack, Typography, Grid, Card } from '@mui/material'
import { keyframes } from '@mui/system'
import HubIcon from '@mui/icons-material/Hub';
import InsightsIcon from '@mui/icons-material/Insights';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import Link from 'next/link'
const palette = {
    ink: '#111827',
    deep: '#0f172a',
    plum: '#34113f',
    berry: '#6b214f',
    cyan: '#0ea5b7',
    sand: '#f7f4ef',
    rose: '#fff1f2',
    line: 'rgba(17, 24, 39, 0.08)',
};


const HeroSection = () => {

    const subtleMove = keyframes`
  0% {
    transform: rotate(15deg) translate3d(0, 0, 0) scale(1);
    opacity: 0.18;
  }
  50% {
    transform: rotate(19deg) translate3d(-18px, -28px, 0) scale(1.08);
    opacity: 0.34;
  }
  100% {
    transform: rotate(15deg) translate3d(0, 0, 0) scale(1);
    opacity: 0.18;
  }
`;

    const floatCard = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -12px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

    const pulseGlow = keyframes`
  0% {
    opacity: 0.35;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.08);
  }
  100% {
    opacity: 0.35;
    transform: scale(1);
  }
`;

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                bgcolor: '#FFF6F6',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '100%',
                py: { xs: 8, md: 0 },
                background: 'linear-gradient(180deg, #fff7f7 0%, #fff1f1 100%)',
            }}
        >
            <Container maxWidth="lg" sx={{ zIndex: 10, textAlign: 'center', position: 'relative' }}>
                <Stack spacing={3} alignItems="center">
                    <Chip
                        data-aos="zoom-in"
                        data-aos-duration="700"
                        label="Professional networking, rebuilt with clarity"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.82)',
                            color: palette.plum,
                            border: `1px solid ${palette.line}`,
                            fontWeight: 700,
                            backdropFilter: 'blur(12px)',
                        }}
                    />

                    <Typography
                        data-aos="fade-up"
                        data-aos-duration="900"
                        data-aos-delay="80"
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 900,
                            color: '#34113f',
                            mb: 1,
                            fontSize: { xs: '2.7rem', md: '4.6rem' },
                            lineHeight: 1.08,
                            letterSpacing: '-0.04em',
                            maxWidth: 900,
                        }}
                    >
                        Elevate Your Professional Trajectory
                    </Typography>

                    <Typography
                        data-aos="fade-up"
                        data-aos-duration="900"
                        data-aos-delay="180"
                        variant="h5"
                        sx={{
                            color: '#555',
                            lineHeight: 1.7,
                            px: { xs: 1, md: 10 },
                            fontSize: { xs: '1.05rem', md: '1.35rem' },
                            fontWeight: 400,
                            maxWidth: 860,
                        }}
                    >
                        A curated ecosystem to connect with vetted leaders, discover exclusive opportunities, and make data-driven career moves.
                    </Typography>
                </Stack>

                <Box
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="320"
                    sx={{
                        position: 'absolute',
                        right: { xs: '4%', md: '8%' },
                        top: { xs: '8%', md: '12%' },
                        width: { xs: 120, md: 170 },
                        p: 2,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.72)',
                        border: `1px solid ${palette.line}`,
                        backdropFilter: 'blur(16px)',
                        textAlign: 'left',
                        animation: `${floatCard} 5.2s ease-in-out infinite`,
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 0.6 }}>
                        Career signal
                    </Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 900, color: palette.plum }}>
                        +84%
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                        stronger professional visibility
                    </Typography>
                </Box>
            </Container>

            <Box
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    width: { xs: '80%', md: '50%' },
                    height: '75%',
                    bgcolor: '#34113f',
                    borderRadius: '80px',
                    top: { xs: '-10%', md: '-15%' },
                    right: { xs: '-20%', md: '-10%' },
                    transform: 'rotate(15deg)',
                    opacity: 0.4,
                    filter: 'blur(80px)',
                    animation: `${subtleMove} 12s ease-in-out infinite`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    width: { xs: '60%', md: '40%' },
                    height: '75%',
                    bgcolor: '#0ea5b7',
                    borderRadius: '80px',
                    bottom: { xs: '-10%', md: '-15%' },
                    left: { xs: '-20%', md: '-10%' },
                    transform: 'rotate(15deg)',
                    opacity: 0.42,
                    filter: 'blur(82px)',
                    animation: `${subtleMove} 14s ease-in-out infinite reverse`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 'auto',
                    width: { xs: 180, md: 260 },
                    height: { xs: 180, md: 260 },
                    borderRadius: '50%',
                    right: { xs: '10%', md: '18%' },
                    bottom: { xs: '12%', md: '18%' },
                    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
                    animation: `${pulseGlow} 6s ease-in-out infinite`,
                    pointerEvents: 'none',
                }}
            />
        </Box>
    );
};
const FloatButtons = () => {
    return (
        <Box
            spacing={1.5}
            sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: { xs: 24, md: 40 },
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
                sx={{
                    pointerEvents: 'auto',
                    bgcolor: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(18px)',
                    border: `1px solid ${palette.line}`,
                    borderRadius: 9999,
                    p: 1,
                    boxShadow: '0 16px 40px rgba(52,17,63,0.16)',
                }}
            >
                <Button
                    component={Link}
                    href="/log-in"
                    variant="outlined"
                    size="large"
                    sx={{
                        fontWeight: 700,
                        px: 3,
                        py: 1.3,
                        borderRadius: 9999,
                        textTransform: 'none',
                        color: palette.plum,
                        borderColor: 'rgba(52,17,63,0.18)',
                        bgcolor: 'rgba(255,255,255,0.72)',
                    }}
                >
                    Sign In
                </Button>
                <Button
                    component={Link}
                    href="/sign-up"
                    variant="contained"
                    size="large"
                    sx={{
                        fontWeight: 700,
                        px: 4,
                        py: 1.3,
                        borderRadius: 9999,
                        textTransform: 'none',
                        bgcolor: palette.plum,
                        boxShadow: '0px 8px 24px rgba(52,17,63,0.2)',
                        '&:hover': {
                            boxShadow: '0px 12px 32px rgba(52,17,63,0.28)',
                            bgcolor: '#4a1857',
                        },
                    }}
                >
                    Create Account
                </Button>
            </Stack>
        </Box>
    );
};
const FeaturesSection = () => {
    const features = [
        {
            icon: <HubIcon sx={{ fontSize: 40 }} />,
            title: "Smart Matchmaking", // تعارف ذكي
            description: "Connect based on actual skills and project history, not just job titles. Enter a lounge of curated experts.",
        },
        {
            icon: <InsightsIcon sx={{ fontSize: 40 }} />,
            title: "Transparent Market Data", // بيانات سوق شفافة
            description: "Know your exact worth with real-time salary insights, trend analysis, and positioning signals.",
        },
        {
            icon: <WorkOutlineIcon sx={{ fontSize: 40 }} />,
            title: "Curated Opportunities", // فرص مُنتقاة
            description: "Say goodbye to generic job boards. Get matched with high-signal roles that fit your exact professional DNA.",
        }
    ];

    return (
        <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: '#ffffff' }}>
            <Container maxWidth="xl">

                {/* عنوان القسم */}
                <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 }, maxWidth: 700, mx: 'auto' }}>
                    <Typography
                        sx={{
                            color: '#00B4D8', // السماوي
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            mb: 2
                        }}
                    >
                        Why Choose Us
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            color: '#240046', // البنفسجي الغامق
                            fontSize: { xs: '2rem', md: '3rem' },
                            lineHeight: 1.2
                        }}
                    >
                        Designed for Signal, Not Noise
                    </Typography>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
                    {features.map((feature, index) => (<Card
                        elevation={0}
                        key={index}
                        sx={{
                            width: { xs: '100%', md: '30%' , lg: '28%' },
                            display: 'flex',
                            flexDirection: 'column',
                            height: 500,
                            p: { xs: 4, md: 5 },
                            borderRadius: 6,
                            border: '1px solid rgba(36, 0, 70, 0.08)',
                            bgcolor: '#f8f9fa', // رمادي فاتح جداً ليميز البطاقة عن الخلفية البيضاء
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-8px)', // ترتفع البطاقة لأعلى قليلاً
                                boxShadow: '0 20px 40px rgba(36, 0, 70, 0.08)',
                                borderColor: 'rgba(0, 180, 216, 0.3)', // يتغير لون الإطار للسماوي
                            }
                        }}
                    >
                        {/* الأيقونة داخل دائرة */}
                        <Box
                            sx={{
                                width: 72,
                                height: 72,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(0, 180, 216, 0.1)',
                                color: '#00B4D8',
                                mb: 4,
                            }}
                        >
                            {feature.icon}
                        </Box>

                        {/* نصوص البطاقة */}
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: '#240046',
                                mb: 2
                            }}
                        >
                            {feature.title}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#4b444f',
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                                flexGrow: 1 // لضمان بقاء الأيقونات والعناوين على نفس المستوى حتى لو اختلف طول النص
                            }}
                        >
                            {feature.description}
                        </Typography>
                    </Card>
                    ))}
                </Box>

            </Container>
        </Box>
    );
}
const HowItWorksSection = () => {
    const steps = [
        {
            number: "01",
            title: "Build Your Identity",
            description: "Shape a profile around expertise, proof, and positioning so the right people understand your value in seconds.",
        },
        {
            number: "02",
            title: "Curate Your Feed",
            description: "Follow the industries, operators, and conversations that matter instead of scrolling through generic noise.",
        },
        {
            number: "03",
            title: "Move with Confidence",
            description: "Apply, connect, and negotiate using stronger visibility and clearer market signals.",
        }
    ];

    return (
        <Box
            sx={{
                py: { xs: 10, md: 16 },
                background: 'linear-gradient(180deg, #f8f9fa 0%, #f4f8fb 100%)',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    data-aos="fade-up"
                    data-aos-duration="800"
                    sx={{ textAlign: 'center', mb: { xs: 7, md: 10 }, maxWidth: 760, mx: 'auto' }}
                >
                    <Typography
                        sx={{
                            color: '#00B4D8',
                            fontWeight: 800,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            mb: 2
                        }}
                    >
                        How It Works
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            color: '#240046',
                            fontSize: { xs: '2rem', md: '3.25rem' },
                            lineHeight: 1.08,
                            mb: 2,
                        }}
                    >
                        A simple path from profile clarity to real opportunity
                    </Typography>
                    <Typography
                        sx={{
                            color: '#5b5561',
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.8,
                        }}
                    >
                        Every step is designed to reduce noise, sharpen your signal, and move you faster toward the right connections and roles.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        gap: { xs: 2.5, lg: 0 },
                    }}
                >
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <Card
                                data-aos="zoom-in-up"
                                data-aos-duration="850"
                                data-aos-delay={index * 130}
                                elevation={0}
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    minHeight: 320,
                                    p: { xs: 3, md: 4.5 },
                                    borderRadius: 7,
                                    border: '1px solid rgba(36, 0, 70, 0.08)',
                                    bgcolor: 'rgba(255,255,255,0.82)',
                                    backdropFilter: 'blur(14px)',
                                    boxShadow: '0 24px 50px rgba(36, 0, 70, 0.08)',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -18,
                                        right: -12,
                                        fontSize: { xs: '5rem', md: '7rem' },
                                        fontWeight: 900,
                                        lineHeight: 1,
                                        color: 'rgba(0, 180, 216, 0.08)',
                                        userSelect: 'none',
                                    }}
                                >
                                    {step.number}
                                </Box>

                                <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                                    <Box
                                        sx={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: index === 1 ? 'rgba(52,17,63,0.08)' : 'rgba(0, 180, 216, 0.1)',
                                            color: index === 1 ? '#34113f' : '#00B4D8',
                                            border: '1px solid rgba(36, 0, 70, 0.08)',
                                            fontSize: '1.5rem',
                                            fontWeight: 900,
                                        }}
                                    >
                                        {step.number}
                                    </Box>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 900,
                                            color: '#240046',
                                            fontSize: { xs: '1.45rem', md: '1.9rem' },
                                            lineHeight: 1.15,
                                            maxWidth: 260,
                                        }}
                                    >
                                        {step.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: '#4b444f',
                                            fontSize: '1.02rem',
                                            lineHeight: 1.85,
                                            maxWidth: 360,
                                        }}
                                    >
                                        {step.description}
                                    </Typography>
                                </Stack>
                            </Card>

                            {index < steps.length - 1 && (
                                <Box
                                    data-aos="fade-in"
                                    data-aos-duration="700"
                                    data-aos-delay={index * 140 + 160}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: { lg: 2 },
                                        py: { xs: 0.5, lg: 0 },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: { xs: 56, lg: 72 },
                                            height: { xs: 56, lg: 72 },
                                            borderRadius: '50%',
                                            bgcolor: '#ffffff',
                                            border: '1px solid rgba(0, 180, 216, 0.18)',
                                            boxShadow: '0 12px 24px rgba(0, 180, 216, 0.12)',
                                            color: '#00B4D8',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
                                            <SouthRoundedIcon sx={{ fontSize: 28 }} />
                                        </Box>
                                        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                                            <EastRoundedIcon sx={{ fontSize: 30 }} />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
export default function LandingPage() {
    return (
        <div style={{ position: 'relative' }}>
            <Box sx={{ width: '100%', position: 'relative', pb: { xs: 12, md: 10 } }}>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />       
            </Box>

            <FloatButtons />
        </div>
    )
}
