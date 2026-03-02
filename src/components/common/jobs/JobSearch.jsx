import { Paper, TextField, InputAdornment } from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';

const JobSearch = () => (
  <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e6f2f4', bgcolor: 'white' }}>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
      <TextField
        fullWidth
        placeholder="Job title, keywords, or company"
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search sx={{ color: '#9ca3af' }} /></InputAdornment>,
          sx: { borderRadius: 2 }
        }}
      />
      <TextField
        fullWidth
        placeholder="City, state, or zip"
        InputProps={{
          startAdornment: <InputAdornment position="start"><LocationOn sx={{ color: '#9ca3af' }} /></InputAdornment>,
          sx: { borderRadius: 2 }
        }}
      />
      <Button variant="contained" sx={{ 
        bgcolor: '#00b2d6', px: 5, height: 56, fontWeight: 'bold', borderRadius: 2,
        '&:hover': { bgcolor: '#009bbd' }
      }}>
        Search Jobs
      </Button>
    </Box>
  </Paper>
);
export default JobSearch;