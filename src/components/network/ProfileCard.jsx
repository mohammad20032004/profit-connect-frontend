import { Card, Box, Avatar, Typography, Button } from '@mui/material';

export default function ProfileCard({ name, headline, mutuals, avatarSrc, actionLabel = 'Connect', onAction, actionLoading = false }) {
  return (
    <Card variant="outlined" sx={{ width: { xs: '100%', sm: 300 }, borderRadius: 3, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } }}>
      {/* Banner with Direct Gradient */}
      <Box sx={{ height: 64, background: 'linear-gradient(135deg, #240046 0%, #00B4D8 100%)' }} />
      
      <Avatar src={avatarSrc} sx={{ width: 72, height: 72, mx: 'auto', mt: -4.5, border: '4px solid white' }} />
      
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 'bold', color: '#240046' }}>{name}</Typography>
        <Typography variant="caption" sx={{ color: 'gray', display: 'block', height: 35, mt: 0.5 }}>{headline}</Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1, display: 'block' }}>{mutuals} mutual connections</Typography>
        
        <Button
          fullWidth
          onClick={onAction}
          disabled={actionLoading}
          sx={{ mt: 2, borderRadius: 10, border: '1px solid #00B4D8', color: '#00B4D8', fontWeight: 'bold', '&:hover': { bgcolor: '#f0fdff' } }}
        >
          {actionLoading ? 'Updating...' : actionLabel}
        </Button>
      </Box>
    </Card>
  );
}
