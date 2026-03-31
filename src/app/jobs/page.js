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
    <Box
      sx={{
        minHeight: 'calc(100vh - 52px)',
        background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 46%, #f8f5ff 100%)',
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 6,
            p: { xs: 1.5, md: 2.25 },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, mb: 3.5 }}>
            <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, fontWeight: 900, color: '#0f172a' }}>
              Find open roles
            </Typography>
            <Typography sx={{ mt: 1, color: '#64748b', maxWidth: 720 }}>
              Browse live job openings and narrow them by type, workplace, and experience level.
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '280px minmax(0, 1fr)' },
              gap: 3,
              alignItems: 'start',
              minHeight: { lg: 'calc(100vh - 190px)' },
            }}
          >
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />

            <Box
              sx={{
                minWidth: 0,
                minHeight: 0,
                height: { xs: 'auto', lg: 'calc(100vh - 190px)' },
                overflowY: { xs: 'visible', lg: 'auto' },
                pr: { xs: 0, lg: 0.5 },
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(91,33,182,0.35) rgba(255,255,255,0.12)',
                '&::-webkit-scrollbar': { width: 8 },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 999,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(180deg, rgba(91,33,182,0.45), rgba(56,189,248,0.4))',
                  borderRadius: 999,
                },
              }}
            >
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
                    borderRadius: 4,
                    border: '1px solid rgba(226,232,240,0.95)',
                    bgcolor: 'rgba(255,255,255,0.62)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>
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
        </Box>
      </Container>
    </Box>
  );
}
