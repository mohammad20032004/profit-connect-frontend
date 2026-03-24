import { Card, CardMedia, CardContent, Box, Typography, Avatar, Button, Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const CompanyCard = ({ company, onFollow, isFollowLoading }) => (
  <Card sx={{ borderRadius: 3, border: '1px solid #ede6f4', '&:hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }, transition: '0.3s' }}>
    <CardMedia component="img" height="80" image={company.coverPhoto || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'} />
    <CardContent sx={{ pt: 0, px: 2.5, pb: 3 }}>
      <Avatar src={company.logo} sx={{ width: 60, height: 60, mt: -4, border: '4px solid white', bgcolor: '#ede6f4', mb: 2 }}>
        {company.name?.charAt(0)}
      </Avatar>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#250047' }}>{company.name}</Typography>
            {company.isVerified && <VerifiedIcon sx={{ fontSize: 18, color: '#06b6d4' }} />}
          </Box>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
            {company.industry} • {company.location}
          </Typography>
        </Box>
        <Chip
          label={company.status}
          size="small"
          sx={{
            bgcolor: company.status === 'Approved' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
            color: company.status === 'Approved' ? '#15803d' : '#b45309',
            fontWeight: 700,
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: '#475569', minHeight: 48, mt: 1.5, mb: 2 }}>
        {company.description}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {company.companySize && (
          <Chip label={company.companySize} size="small" sx={{ bgcolor: '#f8fafc', color: '#334155' }} />
        )}
        <Chip label={`${company.followersCount || 0} followers`} size="small" sx={{ bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onFollow(company._id)}
          disabled={isFollowLoading}
          sx={{ bgcolor: '#250047', fontSize: '0.75rem', '&:hover': { bgcolor: '#3a006b' } }}
        >
          {isFollowLoading ? 'Updating...' : company.isFollowing ? 'Following' : 'Follow'}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          href={company.website || undefined}
          target={company.website ? '_blank' : undefined}
          rel={company.website ? 'noreferrer' : undefined}
          disabled={!company.website}
          sx={{ color: '#250047', borderColor: 'rgba(37, 0, 71, 0.2)', fontSize: '0.75rem' }}
        >
          {company.website ? 'Website' : 'No Website'}
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default CompanyCard;
