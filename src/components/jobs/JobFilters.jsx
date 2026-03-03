import { Box, Typography } from '@mui/material';

const JobSidebar = () => (
  <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 3, border: '1px solid #e6f2f4' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <Typography sx={{ fontWeight: 700 }}>Filter By</Typography>
      <Typography sx={{ color: '#00b2d6', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Clear all</Typography>
    </Box>
    
    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
      Work Type
    </Typography>
    {['Remote', 'On-site'].map((type) => (
      <Box key={type} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <input type="checkbox" style={{ accentColor: '#00b2d6', width: 18, height: 18 }} />
        <Typography sx={{ ml: 1, fontSize: '0.875rem' }}>{type}</Typography>
      </Box>
    ))}
  </Box>
);
export default JobSidebar;