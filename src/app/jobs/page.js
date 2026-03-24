'use client';

import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import { getJobs } from '@/services';
import { JobCard, JobFilters } from '../../components/jobs';

const initialFilters = {
  type: '',
  workPlace: '',
  workLevel: '',
};

export default function Jobs() {
  const [filters, setFilters] = useState(initialFilters);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await getJobs(filters);

        if (!isMounted) {
          return;
        }

        setJobs(response?.data ?? []);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setJobs([]);
        setError(loadError.message || 'Failed to load jobs');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, fontWeight: 800, color: '#0f172a' }}>
          Find open roles
        </Typography>
        <Typography sx={{ mt: 1, color: '#64748b' }}>
          Browse live job openings and narrow them by type, workplace, and experience level.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' }, gap: 4 }}>
        <JobFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />
        <Box>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#00b2d6' }} />
            </Box>
          )}

          {!isLoading && error && (
            <Alert severity="error" sx={{ borderRadius: 3 }}>
              {error}
            </Alert>
          )}

          {!isLoading && !error && jobs.length === 0 && (
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                bgcolor: 'white',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>
                No jobs found
              </Typography>
              <Typography sx={{ mt: 1, color: '#64748b' }}>
                Try changing the selected filters to view more results.
              </Typography>
            </Box>
          )}

          {!isLoading && !error && jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
