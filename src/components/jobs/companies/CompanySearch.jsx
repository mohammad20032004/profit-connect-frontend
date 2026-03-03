import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CompanySearch = () => (
  <Box sx={{ textAlign: 'center', my: 6 }}>
    <Typography variant="h3" sx={{ fontWeight: 700, color: '#250047', mb: 2 }}>
      Explore Top Companies to Work For
    </Typography>
    <Box sx={{ maxWidth: 700, mx: 'auto', display: 'flex', gap: 1.5, mt: 4 }}>
      <TextField
        fullWidth
        placeholder="Search for companies, skills, or locations"
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
          }
        }}
      />
      <Button 
        variant="contained" 
        sx={{ 
          bgcolor: '#250047', 
          px: 4, 
          fontWeight: 'bold',
          '&:hover': { bgcolor: '#3a006b' } 
        }}
      >
        Search
      </Button>
    </Box>
  </Box>
);
export default CompanySearch;