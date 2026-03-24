'use client'
import { Box, Typography, Select, MenuItem, Button, FormControl, InputLabel, Stack } from '@mui/material';

const CompanyFilter = ({ filters, onFilterChange, onReset }) => (
  <Box sx={{ width: { lg: 280 }, flexShrink: 0 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#250047' }}>Filter Companies</Typography>
      <Button
        size="small"
        onClick={onReset}
        sx={{ color: '#64748b', textTransform: 'none', textDecoration: 'underline' }}
      >
        Reset
      </Button>
    </Box>

    <Stack spacing={2}>
      <FormControl fullWidth size="small">
        <InputLabel id="company-status-label">Status</InputLabel>
        <Select
          labelId="company-status-label"
          value={filters.status}
          label="Status"
          onChange={(event) => onFilterChange('status', event.target.value)}
          sx={{ bgcolor: 'white' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="company-verified-label">Verification</InputLabel>
        <Select
          labelId="company-verified-label"
          value={filters.isVerified}
          label="Verification"
          onChange={(event) => onFilterChange('isVerified', event.target.value)}
          sx={{ bgcolor: 'white' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="verified">Verified</MenuItem>
          <MenuItem value="unverified">Unverified</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  </Box>
);

export default CompanyFilter;
