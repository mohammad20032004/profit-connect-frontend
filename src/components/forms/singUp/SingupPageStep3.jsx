"use client";
import React, { useState, useRef } from 'react';
import {
  Box, Container, Typography, Button, LinearProgress,
  Paper, Stack, Link, Avatar, TextField
} from '@mui/material';
import {
  MarkEmailUnread, ArrowBack
} from '@mui/icons-material';
import SingupHeader from './SingupHeader';

const colors = {
  primary: "#6b10c6",
  bgLight: "#f7f6f8",
  textPurple: "#4b3d5a",
  borderLight: "#dbcfe7",
};

export default function SingupPageStep3({ onBack, onComplete, loading = false }) {
  // مصفوفة لتخزين الأرقام الأربعة
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // معالجة تغيير النص في خانات OTP
  const handleChange = (index, value) => {
    if (isNaN(value)) return; // قبول الأرقام فقط

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // انتقال التركيز للخانة التالية تلقائياً
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // معالجة الضغط على زر Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box sx={{ bgcolor: colors.bgLight, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* 1. Header Area */}
      <SingupHeader />
      {/* 2. Main Content */}
      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #ede7f3', overflow: 'hidden' }}>

          {/* Progress Bar */}
          <Box sx={{ p: 3, pb: 1 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Step 3: Verification</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>100%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{ height: 8, borderRadius: 4, bgcolor: '#dbcfe7', '& .MuiLinearProgress-bar': { bgcolor: colors.primary } }}
            />
            <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 'bold', mt: 1, display: 'block' }}>
              Final Step
            </Typography>
          </Box>

          {/* Icon Illustration */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
            <Avatar sx={{ width: 96, height: 96, bgcolor: 'rgba(107, 16, 198, 0.1)' }}>
              <MarkEmailUnread sx={{ fontSize: 48, color: colors.primary }} />
            </Avatar>
          </Box>

          {/* Text Content */}
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Verify your account</Typography>
            <Typography variant="body2" sx={{ color: colors.textPurple, px: 2 }}>
              We sent a 4-digit code to your email address. Please enter it below to complete your profile.
            </Typography>

            {/* OTP Inputs */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 4 }}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  placeholder="•"
                  inputProps={{
                    style: { textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', padding: '12px 0' },
                    maxLength: 1
                  }}
                  sx={{
                    width: 56, height: 64,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': { borderColor: colors.borderLight, borderWidth: 2 },
                      '&.Mui-focused fieldset': { borderColor: colors.primary },
                    }
                  }}
                />
              ))}
            </Stack>

            {/* Complete Button */}
          <Link
            href="#"
            underline="none"
            onClick={(event) => {
              event.preventDefault();
              if (loading) return;
              onComplete();
            }}
            sx={{ display: 'block', mb: 2 }}
          >
            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ bgcolor: colors.primary, fontWeight: 'bold', textTransform: 'none', '&:hover': { bgcolor: '#560ca3' } }}
            >
              {loading ? 'Creating Account...' : 'Complete Profile'}
            </Button>
          </Link>

            <Typography variant="body2" sx={{ color: colors.textPurple }}>
              Didn&apos;t receive the code?{' '}
              <Link href="#" sx={{ color: colors.primary, fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Resend Code
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* Back Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            startIcon={<ArrowBack sx={{ fontSize: 'small' }} />}
            onClick={onBack}
            sx={{ color: colors.textPurple, textTransform: 'none', fontWeight: '500' }}
          >
            Back to email settings
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
