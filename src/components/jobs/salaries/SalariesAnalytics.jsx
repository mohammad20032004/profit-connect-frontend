'use client'
import { Container, Grid, Stack, Paper, Switch, FormControlLabel, Typography, Box, Button } from '@mui/material';
import { SalaryHero, SalaryDistributionCard, ExperienceInsights } from './index'

const SalariesAnalytics = () => (
  <Box sx={{ bgcolor: '#F8F9FA', minHeight: '100vh' }}>
    <SalaryHero />
    
    <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10, pb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#240046' }}>Salary Overview</Typography>
        <FormControlLabel
          control={<Switch defaultChecked sx={{ '& .Mui-checked': { color: '#00B4D8' }, '& .Mui-checked + .MuiSwitch-track': { bgcolor: '#00B4D8' } }} />}
          label={<Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Include Bonus</Typography>}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SalaryDistributionCard />
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #E9ECEF', boxShadow: 'none' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'rgba(0,180,216,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#00B4D8', fontWeight: 'bold' }}>
                ✓
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#6C757D', fontWeight: 600, display: 'block' }}>Confidence Level</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>Very High</Typography>
              </Box>
            </Paper>

            <ExperienceInsights />
          </Stack>
        </Grid>
      </Grid>
      
      <Box sx={{ 
        mt: 6, p: 4, borderRadius: 3, background: 'linear-gradient(90deg, #240046 0%, #3c096c 100%)',
        display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3
      }}>
        <Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>Help improve our data</Typography>
          <Typography sx={{ color: '#E0B1CB', fontSize: '0.9rem' }}>Submit your salary anonymously to help others.</Typography>
        </Box>
        <Button variant="outlined" sx={{ 
          color: 'white', borderColor: 'white', fontWeight: 'bold', px: 4, whiteSpace: 'nowrap',
          '&:hover': { borderColor: '#00B4D8', bgcolor: '#00B4D8' } 
        }}>
          Submit Salary
        </Button>
      </Box>
    </Container>
  </Box>
);

export default SalariesAnalytics;