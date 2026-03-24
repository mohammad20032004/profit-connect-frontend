import React from 'react';
import { Card, Box, Typography, Button, Avatar } from '@mui/material';

const getFullName = (user) => {
  const firstName = user?.profile?.firstName || '';
  const lastName = user?.profile?.lastName || '';
  return `${firstName} ${lastName}`.trim() || 'Unknown User';
};

export default function Invitations({ invitations = [], onAccept, onReject, actionLoadingId = '' }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, mb: 3, border: '1px solid #e2e8f0' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#240046' }}>Invitations</Typography>
        <Typography sx={{ color: '#00B4D8', fontWeight: 'bold', fontSize: '0.875rem' }}>
          {invitations.length} pending
        </Typography>
      </Box>

      {!invitations.length && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: '#64748b', fontSize: '0.92rem' }}>
            No pending invitations right now.
          </Typography>
        </Box>
      )}

      {invitations.map((invitation) => (
        <Box
          key={invitation._id}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            borderTop: '1px solid #f8fafc',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              src={invitation.requester?.profile?.avatar}
              sx={{ width: 56, height: 56, border: '1px solid #f1f5f9' }}
            />
            <Box>
              <Typography sx={{ fontWeight: 'bold', color: '#240046', fontSize: '0.95rem' }}>
                {getFullName(invitation.requester)}
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                {invitation.requester?.profile?.headline || 'No headline available'}
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: '0.7rem', mt: 0.5 }}>
                {new Date(invitation.createdAt).toLocaleDateString('en-US')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => onReject(invitation._id)}
              disabled={actionLoadingId === invitation._id}
              sx={{ color: '#64748b', fontWeight: 'bold', textTransform: 'none' }}
            >
              {actionLoadingId === invitation._id ? 'Updating...' : 'Ignore'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => onAccept(invitation._id)}
              disabled={actionLoadingId === invitation._id}
              sx={{
                borderRadius: 20,
                borderColor: '#00B4D8',
                color: '#00B4D8',
                fontWeight: 'bold',
                textTransform: 'none',
                px: 3,
                '&:hover': { borderColor: '#00B4D8', bgcolor: 'rgba(0, 180, 216, 0.05)' }
              }}
            >
              {actionLoadingId === invitation._id ? 'Updating...' : 'Accept'}
            </Button>
          </Box>
        </Box>
      ))}
    </Card>
  );
}
