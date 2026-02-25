"use client";
import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, LinearProgress, 
  IconButton, InputAdornment, Paper, Stack, Link, Avatar, Divider 
} from '@mui/material';
import { 
  Visibility, VisibilityOff, ChevronRight, 
  Person, Work, CheckCircle 
} from '@mui/icons-material';
import SingupHeader from './SingupHeader';


const colors = {
  primary: "#250047",
  accentCyan: "#00B4D8",
  bgLight: "#f7f5f8",
  textPurple: "#7445a1",
  borderLight: "#dccdea"
};

export default function SingupPageStep1({ onNext, data }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    password: data?.password || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 1 Data:', formData);
    onNext(formData);
  };

  return (
    <Box sx={{ bgcolor: colors.bgLight, minHeight: '100vh' }}>
      {/* Header */}
<SingupHeader />
      {/* Main Form Container */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={0} sx={{ 
          borderRadius: '16px', border: '1px solid #ede6f4', overflow: 'hidden',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
         
        }}>
          {/* Progress Bar Area */}
          <Box sx={{ p: 4, pb: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: '600', color: colors.primary }}>
                Step 1 of 3: Account Basics
              </Typography>
              <Typography sx={{ fontWeight: 'bold', color: colors.accentCyan }}>33%</Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={33} 
              sx={{ 
                height: 8, borderRadius: 5, bgcolor: '#ede6f4',
                '& .MuiLinearProgress-bar': { bgcolor: colors.accentCyan }
              }} 
            />
          </Box>

          {/* Titles */}
          <Box sx={{ px: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.primary, mb: 1 }}>
              Create your account
            </Typography>
            <Typography sx={{ color: colors.textPurple }}>
              Join CareerPath to start your professional journey.
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: colors.primary }}>First Name</Typography>
                <TextField 
                  fullWidth 
                  placeholder="e.g. John" 
                  variant="outlined"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: colors.primary }}>Last Name</Typography>
                <TextField 
                  fullWidth 
                  placeholder="e.g. Doe" 
                  variant="outlined"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </Box>
            </Stack>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: colors.primary }}>Email Address</Typography>
              <TextField 
                fullWidth 
                placeholder="john.doe@example.com" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: colors.primary }}>Password</Typography>
              <TextField 
                fullWidth 
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
              />
              <Typography variant="caption" sx={{ color: colors.textPurple, mt: 1, display: 'block' }}>
                Must contain at least 8 characters, one number and one special character.
              </Typography>
            </Box>

            <Button 
              fullWidth 
              type="submit"
              variant="contained" 
              endIcon={<ChevronRight />}
              sx={{ 
                py: 1.8, bgcolor: colors.primary, borderRadius: '8px', 
                fontWeight: 'bold', fontSize: '1rem', textTransform: 'none',
                '&:hover': { bgcolor: '#350066' }
              }}
            >
              Next: Profile Details
            </Button>

            {/* Stepper Preview */}
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <StepIcon active label="Account" number="1" />
              <Box sx={{ flex: 1, borderBottom: '1px dotted #dccdea', mx: 2 }} />
              <StepIcon label="Profile" number="2" />
              <Box sx={{ flex: 1, borderBottom: '1px dotted #dccdea', mx: 2 }} />
              <StepIcon label="Finish" number="3" />
            </Stack>
          </Box>
        </Paper>

        <Typography sx={{ mt: 4, textAlign: 'center', fontSize: '0.875rem', color: colors.textPurple }}>
          By continuing, you agree to CareerPath's <Link href="#" sx={{ color: colors.primary, fontWeight: 'bold' }}>Terms of Service</Link> and <Link href="#" sx={{ color: colors.primary, fontWeight: 'bold' }}>Privacy Policy</Link>.
        </Typography>
      </Container>
    </Box>
  );
}

// مكون فرعي للأيقونات السفلية
function StepIcon({ active, label, number }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar sx={{ 
        width: 24, height: 24, fontSize: '0.75rem', fontWeight: 'bold',
        bgcolor: active ? colors.accentCyan : '#ede6f4',
        color: active ? 'white' : colors.primary
      }}>
        {number}
      </Avatar>
      <Typography sx={{ 
        fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', 
        color: active ? colors.primary : colors.textPurple,
        letterSpacing: 1
      }}>
        {label}
      </Typography>
    </Stack>
  );
}