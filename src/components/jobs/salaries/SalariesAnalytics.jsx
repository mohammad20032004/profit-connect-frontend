'use client'
import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Card, Chip, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import InsightsIcon from '@mui/icons-material/Insights';
import PaidIcon from '@mui/icons-material/Paid';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { getSalaries, getSalaryOptions, getSalaryStats } from '@/services';
import { SalaryHero, SalaryDistributionCard, ExperienceInsights } from './index'

const initialFilters = {
  title: '',
  country: '',
  category: '',
  experienceLevel: '',
};

const defaultOptions = {
  titles: [],
  countries: [],
  categories: [],
  experienceLevels: [],
};

const formatMoney = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
}).format(value || 0);

const SalariesAnalytics = () => {
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [options, setOptions] = useState(defaultOptions);
  const [salaries, setSalaries] = useState([]);
  const [stats, setStats] = useState([]);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadOptions = async () => {
      try {
        const response = await getSalaryOptions();

        if (isMounted) {
          setOptions(response?.data ?? defaultOptions);
        }
      } catch {
        if (isMounted) {
          setOptions(defaultOptions);
        }
      }
    };

    loadOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSalaryData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const [salaryResponse, statsResponse] = await Promise.all([
          getSalaries({ ...appliedFilters, page, limit: 9 }),
          getSalaryStats({
            title: appliedFilters.title,
            country: appliedFilters.country,
          }),
        ]);

        if (!isMounted) {
          return;
        }

        setSalaries(salaryResponse?.data ?? []);
        setPagination(salaryResponse?.pagination ?? {
          totalRecords: salaryResponse?.count ?? 0,
          currentPage: page,
          totalPages: 1,
        });
        setStats(statsResponse?.data ?? []);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError.message || 'Failed to load salary data');
        setSalaries([]);
        setStats([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSalaryData();

    return () => {
      isMounted = false;
    };
  }, [appliedFilters, page]);

  const summary = useMemo(() => {
    if (!salaries.length) {
      return {
        averageMedian: 0,
        highestMedian: 0,
        highestLabel: 'No data',
      };
    }

    const averageMedian = salaries.reduce((total, salary) => total + salary.medianSalaryUSD, 0) / salaries.length;
    const highestSalary = [...salaries].sort((first, second) => second.medianSalaryUSD - first.medianSalaryUSD)[0];

    return {
      averageMedian,
      highestMedian: highestSalary?.medianSalaryUSD || 0,
      highestLabel: highestSalary ? `${highestSalary.title} in ${highestSalary.country}` : 'No data',
    };
  }, [salaries]);

  const chartData = useMemo(() => salaries.slice(0, 6).map((salary) => ({
    label: `${salary.title.split(' ').slice(0, 2).join(' ')} · ${salary.country}`,
    minSalaryUSD: salary.minSalaryUSD,
    maxSalaryUSD: salary.maxSalaryUSD,
    medianSalaryUSD: salary.medianSalaryUSD,
  })), [salaries]);

  const championStat = useMemo(() => {
    if (!stats.length) {
      return null;
    }

    return [...stats].sort((first, second) => second.averageMedian - first.averageMedian)[0];
  }, [stats]);

  const experienceData = useMemo(() => {
    const levels = ['Entry', 'Mid', 'Senior'];

    return levels.map((level) => {
      const levelRecords = salaries.filter((salary) => salary.experienceLevel === level);
      const amount = levelRecords.length
        ? levelRecords.reduce((total, salary) => total + salary.medianSalaryUSD, 0) / levelRecords.length
        : 0;

      return {
        range: level,
        amount,
        highlight: appliedFilters.experienceLevel === level,
      };
    });
  }, [appliedFilters.experienceLevel, salaries]);

  const handleDraftChange = (key, value) => {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setPage(1);
    setAppliedFilters(draftFilters);
  };

  const handleClear = () => {
    setDraftFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setPage(1);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <SalaryHero
        filters={draftFilters}
        options={options}
        onChange={handleDraftChange}
        onSubmit={handleSearch}
        onClear={handleClear}
        totalRecords={pagination.totalRecords || 0}
      />

      <Container maxWidth="xl" sx={{ mt: -6, position: 'relative', zIndex: 10, pb: 8 }}>
        {error && !isLoading && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PaidIcon />
                </Box>
                <Box>
                  <Typography sx={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 700 }}>Average Median</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#0f172a' }}>{formatMoney(summary.averageMedian)}</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InsightsIcon />
                </Box>
                <Box>
                  <Typography sx={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 700 }}>Top Match Median</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#0f172a' }}>{formatMoney(summary.highestMedian)}</Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.8rem' }}>{summary.highestLabel}</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: '#ede9fe', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QueryStatsIcon />
                </Box>
                <Box>
                  <Typography sx={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 700 }}>Grouped Insights</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#0f172a' }}>{stats.length}</Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                    {appliedFilters.title ? 'Grouped by country' : 'Grouped by title'}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            {isLoading ? (
              <Card sx={{ p: 6, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#0ea5e9' }} />
              </Card>
            ) : (
              <SalaryDistributionCard
                salaries={chartData}
                averageMedian={summary.averageMedian}
                headline={appliedFilters.title ? `Focus: ${appliedFilters.title}` : 'Top salary medians in current page'}
              />
            )}
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' },
                gap: 3,
                height: '100%',
                alignItems: 'stretch',
              }}
            >
              <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <PublicIcon sx={{ color: '#0ea5e9' }} />
                  <Typography sx={{ fontWeight: 900, color: '#0f172a' }}>Market Snapshot</Typography>
                </Stack>
                <Stack spacing={1.25}>
                  {stats.slice(0, 4).map((item) => (
                    <Box key={item._id} sx={{ p: 1.5, borderRadius: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{item._id}</Typography>
                      <Typography sx={{ color: '#0ea5e9', fontWeight: 900, mt: 0.5 }}>{formatMoney(item.averageMedian)}</Typography>
                      <Typography sx={{ color: '#64748b', fontSize: '0.78rem', mt: 0.25 }}>
                        Avg range: {formatMoney(item.averageMin)} - {formatMoney(item.averageMax)}
                      </Typography>
                    </Box>
                  ))}
                  {!stats.length && (
                    <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                      No grouped statistics available for the current filters.
                    </Typography>
                  )}
                </Stack>
              </Card>

              <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%', background: 'linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <WorkspacePremiumIcon sx={{ color: '#2563eb' }} />
                  <Typography sx={{ fontWeight: 900, color: '#0f172a' }}>Highest Group</Typography>
                </Stack>

                {championStat ? (
                  <>
                    <Typography sx={{ fontWeight: 900, color: '#0f172a', fontSize: '1.15rem' }}>
                      {championStat._id}
                    </Typography>
                    <Typography sx={{ color: '#2563eb', fontWeight: 900, fontSize: '1.6rem', mt: 1 }}>
                      {formatMoney(championStat.averageMedian)}
                    </Typography>
                    <Typography sx={{ color: '#64748b', mt: 1.2, lineHeight: 1.7 }}>
                      Strongest grouped median in the current comparison set, based on `/api/salaries/stats`.
                    </Typography>
                    <Stack spacing={1.2} sx={{ mt: 3 }}>
                      <Chip label={`Min avg: ${formatMoney(championStat.averageMin)}`} sx={{ justifyContent: 'flex-start', bgcolor: '#dbeafe', color: '#1d4ed8', fontWeight: 700 }} />
                      <Chip label={`Max avg: ${formatMoney(championStat.averageMax)}`} sx={{ justifyContent: 'flex-start', bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />
                      <Chip label={`${championStat.totalRecords} records`} sx={{ justifyContent: 'flex-start', bgcolor: '#f8fafc', color: '#475569', fontWeight: 700 }} />
                    </Stack>
                  </>
                ) : (
                  <Typography sx={{ color: '#64748b' }}>
                    No grouped benchmark is available for the current filters.
                  </Typography>
                )}
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', xl: '1.2fr 0.8fr' },
                gap: 3,
                alignItems: 'stretch',
              }}
            >
              <Card sx={{ p: 3.5, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
                <Typography sx={{ fontWeight: 900, color: '#0f172a', fontSize: '1.15rem', mb: 0.75 }}>
                  Search Interpretation
                </Typography>
                <Typography sx={{ color: '#64748b', lineHeight: 1.8, maxWidth: 860 }}>
                  Use job title and country for focused benchmarking, then narrow by category and experience level. The chart reflects the current result page, while the market snapshot reflects grouped API statistics from the broader filtered dataset.
                </Typography>
              </Card>

              <ExperienceInsights experienceData={experienceData} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>Salary Results</Typography>
              <Typography sx={{ color: '#64748b', mt: 0.5 }}>
                Detailed salary records returned by the salary API.
              </Typography>
            </Box>
            <Chip label={`${pagination.totalRecords || 0} total records`} sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />
          </Box>

          <Grid container spacing={2.5} justifyContent={'center'}>
            {!isLoading && salaries.map((salary) => (
              <Grid item xs={12} md={6} xl={4} key={salary._id}>
                <Card sx={{ p: 3, borderRadius: 4, border: '1px solid #88b5f08e', boxShadow: 'none', height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto', background: 'linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem' }}>
                        {salary.title}
                      </Typography>
                      <Typography sx={{ color: '#64748b', mt: 0.5 }}>
                        {salary.country} • {salary.category}
                      </Typography>
                    </Box>
                    <Chip label={salary.experienceLevel} size="small" sx={{ bgcolor: '#f1f5f9', color: '#334155', fontWeight: 700 }} />
                  </Stack>

                  <Stack spacing={1.2} sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#64748b' }}>Min</Typography>
                      <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>{formatMoney(salary.minSalaryUSD)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#64748b' }}>Median</Typography>
                      <Typography sx={{ fontWeight: 900, color: '#0ea5e9' }}>{formatMoney(salary.medianSalaryUSD)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#64748b' }}>Max</Typography>
                      <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>{formatMoney(salary.maxSalaryUSD)}</Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ mt: 3, pt: 2.2, borderTop: '1px solid #eef2f7', display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                    <Typography sx={{ color: '#64748b', fontSize: '0.82rem' }}>
                      Range spread
                    </Typography>
                    <Typography sx={{ color: '#334155', fontWeight: 800, fontSize: '0.82rem' }}>
                      {formatMoney(salary.maxSalaryUSD - salary.minSalaryUSD)}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {!isLoading && !salaries.length && !error && (
            <Card sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', mt: 2 }}>
              <Typography sx={{ fontWeight: 900, color: '#0f172a' }}>No salary records found</Typography>
              <Typography sx={{ color: '#64748b', mt: 1 }}>
                Adjust the filters and search again to load salary records.
              </Typography>
            </Card>
          )}

          {!isLoading && pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage}
                onChange={(_, nextPage) => setPage(nextPage)}
                sx={{ '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#0f172a', color: 'white' } }}
              />
            </Box>
          )}
        </Box>

      </Container>
    </Box>
  );
};

export default SalariesAnalytics;
