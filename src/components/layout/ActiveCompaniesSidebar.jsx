'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import { getCompanies } from '@/services';

const getCompanyAccent = (company) => {
  const palette = ['#4285F4', '#7FBA00', '#0866FF', '#FF9900', '#E50914', '#06B6D4', '#8B5CF6'];
  const seed = (company?.name || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[seed % palette.length];
};

export default function ActiveCompaniesSidebar() {
  const token = useSelector((state) => state.user.token);
  const authChecked = useSelector((state) => state.user.authChecked);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCompanies = async () => {
      if (!authChecked) {
        return;
      }

      if (!token) {
        if (isMounted) {
          setCompanies([]);
          setLoading(false);
          setError('Sign in to view companies.');
        }
        return;
      }

      try {
        setLoading(true);
        setError('');
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
          setLoading(false);
        }
      }
    };

    loadCompanies();

    return () => {
      isMounted = false;
    };
  }, [authChecked, token]);

  const activeCompanies = useMemo(() => {
    return [...companies]
      .filter((company) => company?.status === 'Approved')
      .sort((first, second) => {
        if (Boolean(second.isVerified) !== Boolean(first.isVerified)) {
          return Number(Boolean(second.isVerified)) - Number(Boolean(first.isVerified));
        }

        return (second.followersCount || 0) - (first.followersCount || 0);
      })
      .slice(0, 5);
  }, [companies]);

  const totalFollowers = activeCompanies.reduce((sum, company) => sum + (company.followersCount || 0), 0);

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        top: 88,
        overflow: 'hidden',
        borderRadius: 5,
        border: '1px solid rgba(255,255,255,0.5)',
        bgcolor: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.38), rgba(255,255,255,0.14))',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        sx={{
          px: 2.25,
          pt: 2.25,
          pb: 1.5,
          background:
            'linear-gradient(135deg, rgba(36,0,70,0.92) 0%, rgba(90,24,154,0.86) 58%, rgba(14,165,233,0.75) 100%)',
          color: '#fff',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
          <Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, mb: 0.5 }}>
              Most Active Companies
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7 }}>
              Live companies pulled directly from the companies section.
            </Typography>
          </Box>
          <Chip
            icon={<BoltRoundedIcon sx={{ color: '#240046 !important' }} />}
            label="Live"
            size="small"
            sx={{
              bgcolor: '#fff',
              color: '#240046',
              fontWeight: 800,
              '& .MuiChip-label': { px: 1 },
            }}
          />
        </Stack>
      </Box>

      <Box sx={{ p: 1, position: 'relative', zIndex: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#250047' }} />
          </Box>
        ) : null}

        {!loading && error ? (
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            {error}
          </Alert>
        ) : null}

        {!loading && !error && activeCompanies.length > 0 ? (
          <>
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.56)',
                border: '1px solid rgba(226,232,240,0.9)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.58)',
              }}
            >
              <Typography sx={{ fontSize: '0.78rem', color: '#64748b', mb: 1 }}>
                Top companies in your network
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                <AvatarGroup max={4} sx={{ justifyContent: 'flex-end' }}>
                  {activeCompanies.slice(0, 4).map((company) => (
                    <Avatar
                      key={company._id}
                      src={company.logo || undefined}
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        bgcolor: getCompanyAccent(company),
                      }}
                    >
                      {company.name?.charAt(0)}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Chip
                  icon={<TrendingUpRoundedIcon sx={{ color: '#0f766e !important' }} />}
                  label={`${totalFollowers} followers`}
                  size="small"
                  sx={{
                    bgcolor: '#ecfeff',
                    color: '#0f766e',
                    fontWeight: 700,
                    borderRadius: 999,
                  }}
                />
              </Stack>
            </Box>

            <Stack spacing={1.1}>
              {activeCompanies.map((company, index) => (
                <Box
                  key={company._id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.25,
                    p: 1.25,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.58)',
                    border: '1px solid rgba(226,232,240,0.85)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 24px rgba(36,0,70,0.08)',
                    },
                  }}
                >
                  <Stack direction="row" spacing={1.1} alignItems="center" sx={{ minWidth: 0 }}>
                    <Avatar
                      src={company.logo || undefined}
                      sx={{
                        width: 42,
                        height: 42,
                        bgcolor: getCompanyAccent(company),
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        boxShadow: '0 10px 20px rgba(15,23,42,0.12)',
                      }}
                    >
                      {company.name?.charAt(0)}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Stack direction="row" spacing={0.6} alignItems="center" sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            color: '#240046',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {company.name}
                        </Typography>
                        {company.isVerified ? <VerifiedIcon sx={{ fontSize: 16, color: '#06b6d4', flexShrink: 0 }} /> : null}
                      </Stack>
                      <Typography sx={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {[company.industry, company.location].filter(Boolean).join(' • ') || 'Company profile'}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography sx={{ fontSize: '0.78rem', color: '#64748b', mb: 0.25 }}>
                      Followers
                    </Typography>
                    <Typography sx={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f766e' }}>
                      {company.followersCount || 0}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      #{index + 1} ranked
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </>
        ) : null}

        {!loading && !error && activeCompanies.length === 0 ? (
          <Box
            sx={{
              p: 2,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.56)',
              border: '1px solid rgba(226,232,240,0.9)',
            }}
          >
            <Typography sx={{ fontWeight: 800, color: '#240046', mb: 0.75 }}>
              No companies available
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', color: '#64748b' }}>
              Companies from the shared API will appear here once they are available.
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}
