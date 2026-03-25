'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Box, CircularProgress, Container, Grid, Pagination, Typography } from '@mui/material';
import { getCompanies, toggleCompanyFollow } from '@/services';
import { CompanySearch, CompanyFilters, FeaturedCompany, CompanyCard } from '../../../components/jobs/companies';

const initialFilters = {
  status: '',
  isVerified: '',
};

export default function Companies() {
  const token = useSelector((state) => state.user.token);
  const authChecked = useSelector((state) => state.user.authChecked);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [followLoadingId, setFollowLoadingId] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCompanies = async () => {
      if (!authChecked) {
        return;
      }

      if (!token) {
        setCompanies([]);
        setIsLoading(false);
        setError('Sign in to view companies.');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await getCompanies(token);

        if (!isMounted) {
          return;
        }

        setCompanies(response?.data ?? []);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setCompanies([]);
        setError(loadError.message || 'Failed to load companies');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCompanies();

    return () => {
      isMounted = false;
    };
  }, [authChecked, token]);

  const handleFilterChange = (key, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm('');
  };

  const handleFollow = async (companyId) => {
    if (!token) {
      setError('Sign in first to follow companies.');
      return;
    }

    setFollowLoadingId(companyId);

    try {
      const response = await toggleCompanyFollow({ token, companyId });

      setCompanies((currentCompanies) => currentCompanies.map((company) => {
        if (company._id !== companyId) {
          return company;
        }

        return {
          ...company,
          isFollowing: response.isFollowing,
          followersCount: response.followersCount,
        };
      }));
    } catch (followError) {
      setError(followError.message || 'Failed to update follow status');
    } finally {
      setFollowLoadingId('');
    }
  };

  const visibleCompanies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return companies.filter((company) => {
      const matchesSearch = !normalizedSearch || [
        company.name,
        company.industry,
        company.location,
      ].some((value) => value?.toLowerCase().includes(normalizedSearch));

      const matchesStatus = !filters.status || company.status === filters.status;

      const matchesVerification = !filters.isVerified
        || (filters.isVerified === 'verified' && company.isVerified)
        || (filters.isVerified === 'unverified' && !company.isVerified);

      return matchesSearch && matchesStatus && matchesVerification;
    });
  }, [companies, filters, searchTerm]);

  const featuredCompany = useMemo(() => {
    if (!visibleCompanies.length) {
      return null;
    }

    return visibleCompanies.find((company) => company.isVerified)
      || [...visibleCompanies].sort((first, second) => (second.followersCount || 0) - (first.followersCount || 0))[0];
  }, [visibleCompanies]);

  const companyCards = featuredCompany
    ? visibleCompanies.filter((company) => company._id !== featuredCompany._id)
    : visibleCompanies;

  const highlightedCompanyCards = companyCards.slice(0, 3);
  const remainingCompanyCards = companyCards.slice(3);

  return (
    <Box sx={{ bgcolor: '#f7f5f8', minHeight: '100vh', pb: 8,width: '100%' }}>
      <Container maxWidth="xl">
        <CompanySearch value={searchTerm} onChange={setSearchTerm} />

        <Box sx={{ display: 'flex', gap: 5, flexDirection: { xs: 'column', lg: 'row' } }}>
          <CompanyFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
          
          <Box sx={{ flex: 1 }}>
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#250047' }} />
              </Box>
            )}

            {!isLoading && error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                {error}
              </Alert>
            )}

            {!isLoading && !error && (
              <>
                <FeaturedCompany
                  company={featuredCompany}
                  onFollow={handleFollow}
                  isFollowLoading={followLoadingId === featuredCompany?._id}
                />

                {visibleCompanies.length === 0 ? (
                  <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 3, border: '1px solid #ede6f4' }}>
                    <Typography sx={{ fontWeight: 700, color: '#250047' }}>
                      No companies found
                    </Typography>
                    <Typography sx={{ mt: 1, color: '#64748b' }}>
                      Try adjusting the search text or selected filters.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {!!highlightedCompanyCards.length && (
                      <Grid container spacing={3} sx={{ mb: remainingCompanyCards.length ? 1 : 0 , justifyContent: 'center' }}>
                        {highlightedCompanyCards.map((company) => (
                          <Grid item xs={12} md={6} lg={4} key={company._id}>
                            <CompanyCard
                              company={company}
                              onFollow={handleFollow}
                              isFollowLoading={followLoadingId === company._id}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    {!!remainingCompanyCards.length && (
                      <Grid container spacing={3} sx={{ mt: 0 , justifyContent: 'center' }}>
                        {remainingCompanyCards.map((company) => (
                          <Grid item xs={12} md={6} lg={4} key={company._id}>
                            <CompanyCard
                              company={company}
                              onFollow={handleFollow}
                              isFollowLoading={followLoadingId === company._id}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    {!highlightedCompanyCards.length && !remainingCompanyCards.length && (
                      <Grid container spacing={3} justifyContent={'center'}>
                        {companyCards.map((company) => (
                          <Grid item xs={12} md={6} lg={4} key={company._id}>
                            <CompanyCard
                              company={company}
                              onFollow={handleFollow}
                              isFollowLoading={followLoadingId === company._id}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                      <Pagination
                        count={1}
                        page={1}
                        sx={{
                          '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#250047', color: 'white' },
                        }}
                      />
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
