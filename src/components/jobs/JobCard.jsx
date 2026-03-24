'use client';

import { Card, Chip, IconButton, Stack, Box, Avatar, Typography } from '@mui/material';
import { BookmarkBorder, LocationOn } from '@mui/icons-material';

const formatSalary = (salary) => {
  if (!salary || (salary.min === undefined && salary.max === undefined)) {
    return 'Salary not specified';
  }

  const currency = salary.currency || 'USD';
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });

  if (salary.min !== undefined && salary.max !== undefined) {
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} ${currency}`;
  }

  if (salary.min !== undefined) {
    return `From ${formatter.format(salary.min)} ${currency}`;
  }

  return `Up to ${formatter.format(salary.max)} ${currency}`;
};

const buildTags = (job) => [job.type, job.workPlace, job.workLevel].filter(Boolean);

const JobCard = ({ job }) => {
  const tags = buildTags(job);
  const companyName = typeof job.company === 'object' ? job.company?.name : 'Company';
  const companyLogo = typeof job.company === 'object' ? job.company?.logo : '';

  return (
    <Card
      elevation={0}
      data-aos="fade-up"
      data-aos-duration="450"
      sx={{
        p: 3,
        mb: 2,
        borderRadius: 3,
        border: '1px solid #f0f0f0',
        backgroundColor: '#ffffff',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 28px rgba(15,23,42,0.12)',
        },
        '&:active': {
          transform: 'scale(0.99)',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2.5 }}>
        <Avatar
          variant="rounded"
          src={companyLogo}
          alt={companyName}
          sx={{
            width: 56,
            height: 56,
            bgcolor: '#f9fafb',
            p: 1,
            border: '1px solid #eee',
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#240046',
                }}
              >
                {job.title}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#4b5563' }}>
                {companyName}
              </Typography>
            </Box>
            <IconButton size="small">
              <BookmarkBorder />
            </IconButton>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            sx={{ mt: 2, color: '#6b7280' }}
          >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.75rem',
              }}
            >
              <LocationOn sx={{ fontSize: 16 }} /> {job.location}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {formatSalary(job.salary)}
            </Typography>
          </Stack>

          <Typography sx={{ mt: 2, color: '#475569', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {job.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2.5,
            }}
          >
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {tags.map((tag, index) => (
                <Chip
                  key={`${job._id}-${tag}`}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: index === 0 ? 'rgba(0,178,214,0.1)' : '#f8fafc',
                    color: index === 0 ? '#00b2d6' : '#334155',
                    fontWeight: 700,
                    borderRadius: 1,
                  }}
                />
              ))}
            </Stack>
            <Chip
              label={job.status || 'Open'}
              size="small"
              sx={{
                bgcolor: 'rgba(14,165,233,0.1)',
                color: '#0284c7',
                fontWeight: 800,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default JobCard;
