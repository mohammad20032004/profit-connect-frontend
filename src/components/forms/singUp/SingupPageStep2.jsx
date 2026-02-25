"use client";
import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, LinearProgress,
  Paper, Grid, Stack, IconButton, Link, Card, CardContent
} from '@mui/material';
import {
  School, Work, ChevronRight, ArrowBack, CheckCircle, ArrowForward
} from '@mui/icons-material';

// إعداد الألوان والسمات المخصصة
const themeColors = {
  primary: "#6b10c6",
  accentCyan: "#06b6d4",
  bgLight: "#f7f6f8",
  textDark: "#140d1b",
  borderLight: "#ede6f4",
};

export default function SingupPageStep2({ onNext, onBack, data }) {
  const [selectedRole, setSelectedRole] = useState(data?.role || 'student');

  const handleNext = () => {
    console.log('Step 2 Data:', { role: selectedRole });
    onNext({ role: selectedRole });
  };

  return (
    <Box sx={{ bgcolor: themeColors.bgLight, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header (Top Navigation) */}
      <Box component="header" sx={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        px: { xs: 2, md: 15 }, py: 2, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider'
      }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ color: themeColors.primary, display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 48 48" fill="currentColor">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" />
            </svg>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: themeColors.textDark }}>
            CareerPath
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Already have an account?
          </Typography>
          <Button variant="contained" sx={{ 
            bgcolor: themeColors.primary, fontWeight: 'bold', textTransform: 'none',
            '&:hover': { bgcolor: '#560ca3' }
          }}>
            Log In
          </Button>
        </Stack>
      </Box>

      {/* 2. Main Content */}
      <Container maxWidth="md" sx={{ py: 8, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={0} sx={{ 
          borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          
          {/* Progress Bar Section */}
          <Box sx={{ p: 4, pb: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ color: themeColors.primary, fontWeight: 'bold', letterSpacing: 1.5 }}>
                  ONBOARDING
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>Step 2 of 4</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: '500' }}>50% Complete</Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={50} 
              sx={{ 
                height: 10, borderRadius: 5, bgcolor: 'rgba(107, 16, 198, 0.1)',
                '& .MuiLinearProgress-bar': { bgcolor: themeColors.accentCyan }
              }} 
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block', fontWeight: '500' }}>
              Professional Role Selection
            </Typography>
          </Box>

          {/* Headline */}
          <Box sx={{ pt: 5, pb: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: themeColors.textDark, mb: 1 }}>
              What is your current role?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This helps us tailor your CareerPath experience for your specific career stage.
            </Typography>
          </Box>

          {/* Selection Cards Grid */}
          <Grid container spacing={3} sx={{ p: 4 }}>
            {/* Student Card */}
            <Grid item xs={12} md={6}>
              <RoleCard 
                title="I am a Student"
                description="Exploring internships, graduate programs, and entry-level career opportunities."
                icon={<School sx={{ fontSize: 40 }} />}
                selected={selectedRole === 'student'}
                onClick={() => setSelectedRole('student')}
                accentColor={themeColors.accentCyan}
              />
            </Grid>
            {/* Professional Card */}
            <Grid item xs={12} md={6}>
              <RoleCard 
                title="I am a Professional"
                description="Looking for career growth, management roles, or making a mid-level industry switch."
                icon={<Work sx={{ fontSize: 40 }} />}
                selected={selectedRole === 'professional'}
                onClick={() => setSelectedRole('professional')}
                accentColor={themeColors.primary}
              />
            </Grid>
          </Grid>

          {/* Action Footer */}
          <Box sx={{ 
            p: 4, bgcolor: 'rgba(0,0,0,0.02)', borderTop: '1px solid', borderColor: 'divider',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <Button 
              startIcon={<ArrowBack />} 
              onClick={onBack}
              sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'none' }}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              endIcon={<ChevronRight />}
              onClick={handleNext}
              sx={{ 
                px: 4, py: 1.5, bgcolor: themeColors.primary, borderRadius: 2, 
                fontWeight: 'bold', textTransform: 'none',
                boxShadow: `0 8px 20px rgba(107, 16, 198, 0.2)`,
                '&:hover': { bgcolor: '#560ca3' }
              }}
            >
              Next Step
            </Button>
          </Box>
        </Paper>

        {/* Support Footer */}
        <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
          Need help? <Link href="#" sx={{ color: themeColors.primary, textDecoration: 'underline' }}>Contact our support team</Link> or visit our <Link href="#" sx={{ color: themeColors.primary, textDecoration: 'underline' }}>FAQ</Link>.
        </Typography>
      </Container>
    </Box>
  );
}

// مكون البطاقة القابل للاختيار
function RoleCard({ title, description, icon, selected, onClick, accentColor }) {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        height: '100%', cursor: 'pointer', transition: 'all 0.3s ease',
        border: '3px solid',
        borderColor: selected ? accentColor : 'transparent',
        boxShadow: selected ? `0 10px 20px rgba(0,0,0,0.1)` : 'none',
        '&:hover': { borderColor: selected ? accentColor : 'rgba(107, 16, 198, 0.3)', transform: 'translateY(-4px)' }
      }}
    >
      <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ 
          width: 64, height: 64, borderRadius: '50%', mb: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: `${accentColor}15`, color: accentColor
        }}>
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
          {description}
        </Typography>
        
        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', color: selected ? accentColor : 'text.disabled' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            {selected ? 'Selected' : 'Select this option'}
          </Typography>
          {selected ? <CheckCircle fontSize="small" /> : <ArrowForward fontSize="small" />}
        </Box>
      </CardContent>
    </Card>
  );
}