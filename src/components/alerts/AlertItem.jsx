"use client";

import React from 'react';
import { Box, Typography, Avatar, IconButton, Button, alpha, Chip, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';

// A specific component to render the alert content based on its type
const AlertContent = ({ alert }) => {
  const { actor, action, target, details } = alert;

  const Actor = () => <Typography component="span" variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{actor}</Typography>;

  switch (alert.type) {
    case 'like':
      return <Typography variant="body2" color="text.secondary"><Actor /> liked your recent post.</Typography>;
    case 'profile_view':
      return <Typography variant="body2" color="text.secondary"><Actor /> viewed your profile.</Typography>;
    case 'new_job':
      return (
        <Typography variant="body2" color="text.secondary">
          <Actor /> posted a new job:{' '}
          <Link href={target.url} passHref>
            <Typography component="span" sx={{ fontWeight: '600', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
              {target.title}
            </Typography>
          </Link>
        </Typography>
      );
    case 'endorsement':
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" color="text.secondary"><Actor /> endorsed you for</Typography>
            <Chip label={details.skill} color="secondary" size="small" sx={{ fontWeight: 'bold' }} />
        </Stack>
      );
    default:
      return null;
  }
};

export default function AlertItem({ alert }) {
  const { unread, avatarSrc, time, actionButton } = alert;

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: 2.5,
        bgcolor: unread ? (theme) => alpha(theme.palette.secondary.main, 0.1) : 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor: (theme) => unread ? alpha(theme.palette.secondary.main, 0.2) : theme.palette.action.hover,
          '& .more-icon': { opacity: 1 }
        }
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main', opacity: unread ? 1 : 0, flexShrink: 0 }} />
      <Avatar src={avatarSrc} sx={{ width: 48, height: 48, flexShrink: 0 }} />

      <Box sx={{ flexGrow: 1 }}>
        <AlertContent alert={alert} />
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">{time}</Typography>
            {actionButton && (
                <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    sx={{ borderRadius: 50, fontWeight: 'bold', textTransform: 'none', py: 0.2, px: 2, fontSize: '0.75rem' }}
                >
                    {actionButton.text}
                </Button>
            )}
        </Stack>
      </Box>

      <IconButton className="more-icon" sx={{ opacity: { xs: 1, md: 0 }, transition: 'opacity 0.2s', color: 'text.secondary' }}>
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
}
