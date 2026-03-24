import { Box, Typography, Card, LinearProgress, Stack } from '@mui/material';

const formatSalary = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
}).format(amount || 0);

const ExperienceInsights = ({ experienceData }) => {
  const highestMedian = Math.max(...experienceData.map((item) => item.amount || 0), 1);

  return (
    <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.75 }}>Salary by Experience</Typography>
      <Typography sx={{ color: '#64748b', fontSize: '0.9rem', mb: 3 }}>
        Average median salary distribution across experience levels in the current dataset.
      </Typography>

      <Stack spacing={2.5}>
        {experienceData.map((item) => (
          <Box key={item.range}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>
                {item.range}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 900, color: item.highlight ? '#0ea5e9' : '#0f172a' }}>
                {formatSalary(item.amount)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(item.amount / highestMedian) * 100}
              sx={{
                height: 12,
                borderRadius: 999,
                bgcolor: '#eef2f7',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 999,
                  bgcolor: item.highlight ? '#0ea5e9' : '#1e3a8a',
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default ExperienceInsights;
