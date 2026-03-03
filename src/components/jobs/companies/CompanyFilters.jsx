'use client'
import { Box, Typography, FormControlLabel, Checkbox, Select, MenuItem, Rating, Button } from '@mui/material';

const CompanyFilter = () => (
  <Box sx={{ width: { lg: 280 }, flexShrink: 0 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#250047' }}>Filter Companies</Typography>
      <Button size="small" sx={{ color: '#64748b', textTransform: 'none', textDecoration: 'underline' }}>Reset</Button>
    </Box>

    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', mb: 1 }}>Location</Typography>
    <Select fullWidth size="small" defaultValue="Worldwide" sx={{ mb: 4, bgcolor: 'white' }}>
      <MenuItem value="Worldwide">Worldwide</MenuItem>
      <MenuItem value="USA">United States</MenuItem>
    </Select>

    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', mb: 1 }}>Industry</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
      {['Technology', 'Finance', 'Healthcare', 'Education'].map((label) => (
        <FormControlLabel 
          key={label} 
          control={<Checkbox size="small" sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#250047' } }} />} 
          label={<Typography sx={{ fontSize: '0.875rem', color: '#475569' }}>{label}</Typography>} 
        />
      ))}
    </Box>

    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', mb: 1 }}>Star Rating</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating value={4} readOnly size="small" sx={{ color: '#06b6d4' }} />
      <Typography variant="caption" sx={{ color: '#64748b' }}>& Up</Typography>
    </Box>
  </Box>
);
export default CompanyFilter;