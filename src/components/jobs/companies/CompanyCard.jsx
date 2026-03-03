import { Card, CardMedia, CardContent, Box, Typography, Avatar, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const CompanyCard = ({ name, industry, location, followers }) => (
  <Card sx={{ borderRadius: 3, border: '1px solid #ede6f4', '&:hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }, transition: '0.3s' }}>
    <CardMedia component="img" height="80" image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" />
    <CardContent sx={{ pt: 0, px: 2.5, pb: 3 }}>
      <Avatar sx={{ width: 60, height: 60, mt: -4, border: '4px solid white', bgcolor: '#ede6f4', mb: 2 }}>🚀</Avatar>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#250047' }}>{name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2, color: '#06b6d4' }}>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>4.7</Typography>
          <StarIcon sx={{ fontSize: 14 }} />
        </Box>
      </Box>
      <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>{industry} • {location}</Typography>
      <Box sx={{ bgcolor: '#f1f5f9', px: 1, py: 0.5, borderRadius: 1, width: 'fit-content', mb: 3 }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#475569', fontWeight: 600 }}>{followers} followers</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button fullWidth variant="contained" sx={{ bgcolor: '#250047', fontSize: '0.75rem', '&:hover': { bgcolor: '#3a006b' } }}>Follow</Button>
        <Button fullWidth variant="outlined" sx={{ color: '#250047', borderColor: 'rgba(37, 0, 71, 0.2)', fontSize: '0.75rem' }}>Jobs</Button>
      </Box>
    </CardContent>
  </Card>
);
export default CompanyCard;