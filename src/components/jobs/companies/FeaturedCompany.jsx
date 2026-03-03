import { Box, Typography, Avatar, Button, Card, CardMedia } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const FeaturedCompany = () => (
  <Card sx={{ display: 'flex', mb: 5, borderRadius: 3, border: '1px solid #ede6f4', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
    <CardMedia
      component="img"
      sx={{ width: 280, display: { xs: 'none', md: 'block' } }}
      image="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
    />
    <Box sx={{ p: 4, flex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: '#f7f5f8', border: '1px solid #ede6f4' }}>
            <Typography variant="h5">💎</Typography>
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#250047' }}>TechVision Corp</Typography>
              <VerifiedIcon sx={{ fontSize: 18, color: '#06b6d4' }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#64748b' }}>San Francisco, CA • Internet & Software</Typography>
          </Box>
        </Box>
        <Box sx={{ bgcolor: 'rgba(6, 182, 212, 0.1)', px: 1.5, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontWeight: 700, color: '#06b6d4' }}>4.9</Typography>
          <StarIcon sx={{ fontSize: 16, color: '#06b6d4' }} />
        </Box>
      </Box>
      <Typography variant="body2" sx={{ my: 2, color: '#475569', lineHeight: 1.6 }}>
        Leading the way in artificial intelligence and machine learning solutions for enterprise businesses globally. Join our team of innovators.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="contained" sx={{ bgcolor: '#250047', flex: 1, '&:hover': { bgcolor: '#3a006b' } }}>Follow Company</Button>
        <Button variant="outlined" sx={{ color: '#250047', borderColor: '#250047', flex: 1, '&:hover': { borderColor: '#3a006b' } }}>View Jobs</Button>
      </Box>
    </Box>
  </Card>
);
export default FeaturedCompany;