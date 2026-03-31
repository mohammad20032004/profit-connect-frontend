import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
const workPlaceOptions = ['On-site', 'Remote', 'Hybrid'];
const workLevelOptions = ['Entry', 'Mid', 'Senior', 'Director', 'VP'];

const JobSidebar = ({ filters, onFilterChange, onClear }) => (
  <Box
    sx={{
      p: 3,
      position: { lg: 'sticky' },
      top: 76,
      bgcolor: 'rgba(255,255,255,0.62)',
      backdropFilter: 'blur(18px)',
      borderRadius: 4,
      border: '1px solid rgba(255,255,255,0.55)',
      boxShadow: '0 18px 34px rgba(15,23,42,0.06)',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>Filter By</Typography>
      <Button
        onClick={onClear}
        size="small"
        sx={{ color: '#00b2d6', fontSize: '0.75rem', fontWeight: 700 }}
      >
        Clear all
      </Button>
    </Box>

    <Stack spacing={2.5}>
      <FormControl fullWidth size="small">
        <InputLabel id="job-type-label">Job Type</InputLabel>
        <Select
          labelId="job-type-label"
          value={filters.type}
          label="Job Type"
          onChange={(event) => onFilterChange('type', event.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {jobTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="work-place-label">Work Place</InputLabel>
        <Select
          labelId="work-place-label"
          value={filters.workPlace}
          label="Work Place"
          onChange={(event) => onFilterChange('workPlace', event.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {workPlaceOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="work-level-label">Work Level</InputLabel>
        <Select
          labelId="work-level-label"
          value={filters.workLevel}
          label="Work Level"
          onChange={(event) => onFilterChange('workLevel', event.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {workLevelOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  </Box>
);

export default JobSidebar;
