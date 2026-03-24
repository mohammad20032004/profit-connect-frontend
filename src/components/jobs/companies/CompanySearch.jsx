import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CompanySearch = ({ value, onChange }) => (
  <Box sx={{ textAlign: 'center', my: 6 }}>
    <Typography variant="h3" sx={{ fontWeight: 700, color: '#250047', mb: 2 }}>
      Explore Companies
    </Typography>
    <Typography sx={{ color: '#64748b', maxWidth: 720, mx: 'auto' }}>
      Search by company name, industry, or location to find the right company profile.
    </Typography>
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <TextField
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for companies, industries, or locations"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#94a3b8' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#e2e8f0' },
            '&:hover fieldset': { borderColor: '#06b6d4' },
            '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
          },
        }}
      />
    </Box>
  </Box>
);

export default CompanySearch;
