"use client";
import React, { useState, useRef } from 'react';
import {
  Box, Container, Typography, Button, LinearProgress,
  Paper, Stack, Link, Avatar, TextField
} from '@mui/material';
import {
  MarkEmailUnread, ArrowBack
} from '@mui/icons-material';
import SignupHeader from './SignupHeader';

export default function SignupPageStep3({ onBack, onComplete, loading = false }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <SignupHeader />
      <Container maxWidth="xs" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'custom.shadowLight' }}>

          {/* Progress Bar */}
          <Box sx={{ p: 3, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Step 3: Verification</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>100%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{ height: 8, borderRadius: 4, bgcolor: 'background.default' }}
            />
          </Box>

          {/* Content Area */}
          <Box sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.light', color: 'primary.main', mx: 'auto', mb: 3 }}>
              <MarkEmailUnread sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Verify your account</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              We sent a 4-digit code to your email. Please enter it below to complete your profile.
            </Typography>

            {/* OTP Inputs */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
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
                    style: { textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' },
                    maxLength: 1
                  }}
                  sx={{
                    width: { xs: 48, sm: 56 },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': { borderWidth: 2 },
                    }
                  }}
                />
              ))}
            </Stack>

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={onComplete}
              sx={{ py: 1.5, mb: 2, fontSize: '1rem' }}
            >
              {loading ? 'Creating Account...' : 'Complete Profile'}
            </Button>

            <Typography variant="body2" color="text.secondary">
              Didn&apos;t receive the code?{' '}
              <Link href="#" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Resend Code
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* Back Button */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ color: 'text.secondary' }}>
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
