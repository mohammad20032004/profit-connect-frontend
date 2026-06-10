"use client";
import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, LinearProgress,
  IconButton, InputAdornment, Paper, Stack, Link, Avatar, Divider
} from '@mui/material';
import {
  Visibility, VisibilityOff, ChevronRight
} from '@mui/icons-material';
import SignupHeader from './SignupHeader';

// Sub-component for the stepper icons at the bottom
function StepIcon({ active, label, number }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar sx={{
        width: 24, height: 24, fontSize: '0.75rem', fontWeight: 'bold',
        bgcolor: active ? 'secondary.main' : 'background.default',
        color: active ? 'white' : 'primary.main'
      }}>
        {number}
      </Avatar>
      <Typography sx={{
        fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase',
        color: active ? 'primary.main' : 'text.secondary',
        letterSpacing: 1
      }}>
        {label}
      </Typography>
    </Stack>
  );
}

export default function SignupPageStep1({ onNext, data }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    password: data?.password || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <SignupHeader />
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 } }}>
        <Paper elevation={0} sx={{
          borderRadius: 4, border: '1px solid', borderColor: 'divider',
          boxShadow: 'custom.shadowLight',
        }}>
          {/* Progress Bar Area */}
          <Box sx={{ p: 4, pb: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 1 }}>
              <Typography variant="subtitle1" color="primary.main">
                Step 1 of 3: Account Basics
              </Typography>
              <Typography variant="subtitle1" color="secondary.main">33%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={33}
              sx={{
                height: 8, borderRadius: 5, bgcolor: 'background.default',
                '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' }
              }}
            />
          </Box>

          {/* Titles */}
          <Box sx={{ px: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
              Create your account
            </Typography>
            <Typography color="text.secondary">
              Join Profit Connect to start your professional journey.
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Last Name"
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </Stack>

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Must contain at least 8 characters, one number and one special character."
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              endIcon={<ChevronRight />}
              sx={{ py: 1.8, fontSize: '1rem' }}
            >
              Next: Profile Details
            </Button>

            {/* Stepper Preview */}
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <StepIcon active label="Account" number="1" />
              <Box sx={{ flex: 1, borderBottom: '1px dotted', borderColor: 'divider', mx: 2 }} />
              <StepIcon label="Profile" number="2" />
              <Box sx={{ flex: 1, borderBottom: '1px dotted', borderColor: 'divider', mx: 2 }} />
              <StepIcon label="Finish" number="3" />
            </Stack>
          </Box>
        </Paper>

        <Typography sx={{ mt: 4, textAlign: 'center', fontSize: '0.875rem', color: 'text.secondary' }}>
          By continuing, you agree to Profit Connect&apos;s <Link href="#" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Terms of Service</Link> and <Link href="#" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Privacy Policy</Link>.
        </Typography>
      </Container>
    </Box>
  );
}
