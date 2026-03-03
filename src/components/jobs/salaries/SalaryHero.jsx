import { Box, Typography, TextField, Button, Card, InputAdornment, Container } from '@mui/material';
import WorkIcon from '@mui/icons-material/WorkOutline';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';

const SalaryHero = () => (
  <Box sx={{ 
    bgcolor: '#240046', pt: 8, pb: 14, textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden', borderRadius: '0 0 24px 24px'
  }}>
    <Container maxWidth="md">
      <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em', fontSize: { xs: '2rem', md: '3rem' } }}>
        Discover Your Market Value
      </Typography>
      <Typography sx={{ color: '#E0B1CB', mb: 5, fontSize: { xs: '1rem', md: '1.2rem' } }}>
        Find out exactly what you should be earning with our comprehensive salary insights.
      </Typography>

      <Card sx={{ 
        p: 3, borderRadius: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, alignItems: 'flex-end', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <Box sx={{ flex: 1, textAlign: 'left', width: '100%' }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1, color: '#212529' }}>Job Title</Typography>
          <TextField 
            fullWidth 
            size="small" 
            defaultValue="Senior Product Designer"
            InputProps={{ startAdornment: <InputAdornment position="start"><WorkIcon sx={{color:'#ADB5BD'}}/></InputAdornment> }}
          />
        </Box>
        <Box sx={{ flex: 1, textAlign: 'left', width: '100%' }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1, color: '#212529' }}>Location</Typography>
          <TextField 
            fullWidth 
            size="small" 
            defaultValue="New York, NY"
            InputProps={{ startAdornment: <InputAdornment position="start"><LocationIcon sx={{color:'#ADB5BD'}}/></InputAdornment> }}
          />
        </Box>
        <Button variant="contained" sx={{ 
          bgcolor: '#00B4D8', height: 40, px: 4, fontWeight: 'bold', textTransform: 'none',
          '&:hover': { bgcolor: '#0096B4' }
        }}>
          Calculate
        </Button>
      </Card>
    </Container>
  </Box>
);
export default SalaryHero;