'use client'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, Box, Typography, Divider } from '@mui/material';

const distributionData = [
  { name: 'Low', count: 20 },
  { name: 'Below Avg', count: 45 },
  { name: 'Average', count: 80 },
  { name: 'Median', count: 100 },
  { name: 'Above Avg', count: 75 },
  { name: 'High', count: 40 },
  { name: 'Very High', count: 15 }
];

const SalaryDistributionCard = () => (
  <Card sx={{ p: 4, borderRadius: 3, border: '1px solid #E9ECEF', boxShadow: 'none' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#212529' }}>Salary Distribution Curve</Typography>
        <Typography variant="body2" sx={{ color: '#6C757D' }}>Based on 1,245 reported salaries in New York.</Typography>
      </Box>
      <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#6C757D' }}>MEDIAN SALARY</Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#00B4D8' }}>$145,000</Typography>
      </Box>
    </Box>

    <Box sx={{ height: 280, width: '100%' }}>
      <ResponsiveContainer>
        <AreaChart data={distributionData}>
          <defs>
            <linearGradient id="colorSal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00B4D8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#ADB5BD', fontSize: 12}} />
          <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
          <Area type="monotone" dataKey="count" stroke="#00B4D8" strokeWidth={3} fill="url(#colorSal)" />
          <ReferenceLine x="Median" stroke="#240046" strokeDasharray="3 3" label={{ position: 'top', value: 'You', fill: '#240046', fontWeight: 'bold' }} />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
    
    <Divider sx={{ my: 2 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#ADB5BD' }}>Low ($90k)</Typography>
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#ADB5BD' }}>Median ($145k)</Typography>
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#ADB5BD' }}>High ($210k+)</Typography>
    </Box>
  </Card>
);
export default SalaryDistributionCard;