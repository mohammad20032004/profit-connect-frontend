import { Box, Typography, TextField, Button, Card, InputAdornment, Container, FormControl, InputLabel, Select, MenuItem, Chip, Stack } from '@mui/material';
import WorkIcon from '@mui/icons-material/WorkOutline';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SalaryHero = ({ filters, options, onChange, onSubmit, onClear, totalRecords }) => (
  <Box sx={{
    background: 'radial-gradient(circle at top left, rgba(58,12,163,0.6), transparent 32%), linear-gradient(135deg, #0f172a 0%, #14213d 45%, #1d3557 100%)',
    pt: 8,
    pb: 14,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0 0 32px 32px',
  }}>
    <Container maxWidth="xl">
      <Box sx={{ maxWidth: 760, mb: 5 }}>
        <Chip
          icon={<TrendingUpIcon />}
          label="Live market salary explorer"
          sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white', mb: 2 }}
        />
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.03em', fontSize: { xs: '2.1rem', md: '3.5rem' }, lineHeight: 1.05 }}>
          Salary intelligence that is actually useful
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.76)', fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.8, maxWidth: 620 }}>
          Compare salary ranges by job title, country, category, and experience level using real API data from your backend.
        </Typography>
      </Box>

      <Card sx={{
        p: 3,
        borderRadius: 4,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: '2fr 2fr 1.5fr 1.5fr auto auto' },
        gap: 2,
        alignItems: 'end',
        boxShadow: '0 24px 60px rgba(15,23,42,0.35)',
        bgcolor: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
      }}>
        <TextField
          fullWidth
          size="small"
          label="Job Title"
          value={filters.title}
          onChange={(event) => onChange('title', event.target.value)}
          placeholder="Frontend Developer"
          inputProps={{ list: 'salary-title-options' }}
          InputProps={{ startAdornment: <InputAdornment position="start"><WorkIcon sx={{ color: '#94a3b8' }} /></InputAdornment> }}
        />
        <datalist id="salary-title-options">
          {options.titles.map((title) => (
            <option key={title} value={title} />
          ))}
        </datalist>

        <TextField
          fullWidth
          size="small"
          label="Country"
          value={filters.country}
          onChange={(event) => onChange('country', event.target.value)}
          placeholder="Syria or USA"
          inputProps={{ list: 'salary-country-options' }}
          InputProps={{ startAdornment: <InputAdornment position="start"><LocationIcon sx={{ color: '#94a3b8' }} /></InputAdornment> }}
        />
        <datalist id="salary-country-options">
          {options.countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        <FormControl fullWidth size="small">
          <InputLabel id="salary-category-label">Category</InputLabel>
          <Select
            labelId="salary-category-label"
            label="Category"
            value={filters.category}
            onChange={(event) => onChange('category', event.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {options.categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="salary-experience-label">Experience</InputLabel>
          <Select
            labelId="salary-experience-label"
            label="Experience"
            value={filters.experienceLevel}
            onChange={(event) => onChange('experienceLevel', event.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {options.experienceLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            bgcolor: '#0ea5e9',
            minHeight: 40,
            px: 4,
            fontWeight: 800,
            '&:hover': { bgcolor: '#0284c7' },
          }}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={onClear}
          sx={{
            minHeight: 40,
            px: 3,
            color: '#0f172a',
            borderColor: '#cbd5e1',
          }}
        >
          Reset
        </Button>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 3 }}>
        <Chip label={`${totalRecords} matched salary records`} sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
        <Chip label="Sorted by median salary" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.86)' }} />
        <Chip label="Public API data" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.86)' }} />
      </Stack>
    </Container>
  </Box>
);
export default SalaryHero;
