'use client';

import { Card, Chip, IconButton, Stack, Box, Avatar, Typography, Button } from '@mui/material';
import { BookmarkBorder, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const JobCard = ({ title, company, location, salary, tags, logo }) => (
  <MotionCard
    elevation={0}
    whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(15,23,42,0.12)' }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
    layout
    sx={{
      p: 3,
      mb: 2,
      borderRadius: 3,
      border: '1px solid #f0f0f0',
      backgroundColor: '#ffffff',
    }}
  >
    <Box sx={{ display: 'flex', gap: 2.5 }}>
      <Avatar
        variant="rounded"
        src={logo}
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
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#240046',
                '&:hover': {
                  color: '#00b2d6',
                  textDecoration: 'underline',
                },
                cursor: 'pointer',
              }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#4b5563' }}>
              {company}
            </Typography>
          </Box>
          <IconButton size="small">
            <BookmarkBorder />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={3} sx={{ mt: 2, color: '#6b7280' }}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
            }}
          >
            <LocationOn sx={{ fontSize: 16 }} /> {location}
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            $ {salary}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2.5,
          }}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              label={tags[0]}
              size="small"
              sx={{
                bgcolor: 'rgba(0,178,214,0.1)',
                color: '#00b2d6',
                fontWeight: 700,
                borderRadius: 1,
              }}
            />
            <Chip
              label={tags[1]}
              size="small"
              sx={{ borderRadius: 1, fontWeight: 700 }}
            />
          </Stack>
          <Button
            sx={{
              bgcolor: '#00b2d6',
              color: 'white',
              px: 2.5,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { bgcolor: '#009bbd' },
            }}
          >
            Easy Apply
          </Button>
        </Box>
      </Box>
    </Box>
  </MotionCard>
);
export default JobCard;