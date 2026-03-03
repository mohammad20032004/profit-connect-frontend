import { Box, Typography, Card, LinearProgress } from '@mui/material';

const experienceData = [
  { range: '0-2 Years', amount: 95000, width: 50 },
  { range: '2-4 Years', amount: 120000, width: 65 },
  { range: '4-6 Years', amount: 145000, width: 80 },
  { range: '6-8 Years', amount: 170000, width: 90 },
  { range: '8+ Years', amount: 200000, width: 100 }
];

const ExperienceInsights = () => (
  <Card sx={{ p: 3, borderRadius: 3, border: '1px solid #E9ECEF', boxShadow: 'none' }}>
    <Typography variant="h6" sx={{ fontWeight: 800, color: '#212529', mb: 3 }}>Salary by Experience</Typography>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {experienceData.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ width: 70, fontSize: '0.7rem', fontWeight: 700, color: '#6C757D', textAlign: 'right' }}>
            {item.range}
          </Typography>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <LinearProgress 
              variant="determinate" 
              value={item.width} 
              sx={{ 
                height: 20, borderRadius: 10, bgcolor: '#F8F9FA',
                '& .MuiLinearProgress-bar': {
                  bgcolor: item.range === '4-6 Years' ? '#00B4D8' : (index > 2 ? '#240046' : '#E0B1CB'),
                  borderRadius: 10
                }
              }} 
            />
          </Box>
          <Typography sx={{ width: 55, fontSize: '0.75rem', fontWeight: 800, color: item.range === '4-6 Years' ? '#00B4D8' : '#212529' }}>
            ${item.amount / 1000}k
          </Typography>
        </Box>
      ))}
    </Box>
  </Card>
);
export default ExperienceInsights;