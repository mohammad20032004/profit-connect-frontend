"use client";
import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, LinearProgress,
  Paper, Grid, Stack, IconButton, Link, Card, CardContent
} from '@mui/material';
import {
  School, Work, ChevronRight, ArrowBack, CheckCircle, ArrowForward
} from '@mui/icons-material';
import SignupHeader from './SignupHeader';

// RoleCard component now uses theme values directly
function RoleCard({ title, description, icon, selected, onClick, type }) {
  const accentColor = type === 'student' ? 'secondary.main' : 'primary.main';

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%', cursor: 'pointer', transition: 'all 0.2s ease-in-out',
        border: '3px solid',
        borderColor: selected ? accentColor : 'transparent',
        boxShadow: selected ? (theme) => `0 8px 24px ${theme.palette.primary.main}1A` : 'custom.shadowLight',
        '&:hover': {
          borderColor: selected ? accentColor : 'divider',
          transform: 'translateY(-4px)',
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{
          width: 64, height: 64, borderRadius: '50%', mb: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? `${accentColor}30` : `${accentColor}15`,
          color: accentColor
        }}>
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 3 }}>
          {description}
        </Typography>

        <Stack direction="row" alignItems="center" sx={{ color: selected ? accentColor : 'text.disabled' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {selected ? 'Selected' : 'Select this option'}
          </Typography>
          {selected ? <CheckCircle fontSize="small" sx={{ ml: 1 }} /> : <ArrowForward fontSize="small" sx={{ ml: 1 }} />}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function SignupPageStep2({ onNext, onBack, data }) {
  const [selectedRole, setSelectedRole] = useState(data?.role || 'Student');

  const handleNext = () => {
    onNext({ role: selectedRole });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <SignupHeader />
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper elevation={0} sx={{
          borderRadius: 4, border: '1px solid', borderColor: 'divider',
          boxShadow: 'custom.shadowLight',
        }}>
          {/* Progress Section */}
          <Box sx={{ p: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: '600' }}>Step 2 of 4: Select Role</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>50%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{ height: 8, borderRadius: 5, bgcolor: 'background.default' }}
              color="secondary"
            />
          </Box>

          {/* Headline */}
          <Box sx={{ pt: 5, pb: 3, textAlign: 'center', px: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              What is your current role?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This helps us tailor your experience for your specific career stage.
            </Typography>
          </Box>

          {/* Selection Grid */}
          <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 } }}>
            <Grid item xs={12} md={6}>
              <RoleCard
                title="I am a Student"
                description="Exploring internships, graduate programs, and entry-level career opportunities."
                icon={<School sx={{ fontSize: 40 }} />}
                selected={selectedRole === 'Student'}
                onClick={() => setSelectedRole('Student')}
                type="student"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RoleCard
                title="I am a Professional"
                description="Looking for career growth, management roles, or making a mid-level industry switch."
                icon={<Work sx={{ fontSize: 40 }} />}
                selected={selectedRole === 'Professional'}
                onClick={() => setSelectedRole('Professional')}
                type="professional"
              />
            </Grid>
          </Grid>

          {/* Footer Actions */}
          <Box sx={{ p: 3, bgcolor: 'background.default', borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={onBack}>
              Back
            </Button>
            <Button variant="contained" endIcon={<ChevronRight />} onClick={handleNext} sx={{ px: 4, py: 1.2 }}>
              Next Step
            </Button>
          </Box>
        </Paper>

        <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
          Need help? <Link href="#" sx={{ color: 'primary.main', fontWeight: '600' }}>Contact Support</Link>.
        </Typography>
      </Container>
    </Box>
  );
}
