import { Box, Typography, Avatar, Button, Card, CardMedia } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const FeaturedCompany = ({ company, onFollow, isFollowLoading }) => {
  if (!company) {
    return null;
  }

  return (
    <Card sx={{ display: 'flex', mb: 5, borderRadius: 3, border: '1px solid #ede6f4', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <CardMedia
        component="img"
        sx={{ width: 280, display: { xs: 'none', md: 'block' } }}
        image={company.coverPhoto || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174'}
      />
      <Box sx={{ p: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar src={company.logo} variant="rounded" sx={{ width: 56, height: 56, bgcolor: '#f7f5f8', border: '1px solid #ede6f4' }}>
              {company.name?.charAt(0)}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#250047' }}>{company.name}</Typography>
                {company.isVerified && <VerifiedIcon sx={{ fontSize: 18, color: '#06b6d4' }} />}
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b' }}>{company.location} • {company.industry}</Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: 'rgba(6, 182, 212, 0.1)', px: 1.5, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontWeight: 700, color: '#06b6d4' }}>{company.followersCount || 0}</Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#06b6d4' }}>followers</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ my: 2, color: '#475569', lineHeight: 1.6 }}>
          {company.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => onFollow(company._id)}
            disabled={isFollowLoading}
            sx={{ bgcolor: '#250047', flex: 1, '&:hover': { bgcolor: '#3a006b' } }}
          >
            {isFollowLoading ? 'Updating...' : company.isFollowing ? 'Following' : 'Follow Company'}
          </Button>
          <Button
            variant="outlined"
            href={company.website || undefined}
            target={company.website ? '_blank' : undefined}
            rel={company.website ? 'noreferrer' : undefined}
            disabled={!company.website}
            sx={{ color: '#250047', borderColor: '#250047', flex: 1, '&:hover': { borderColor: '#3a006b' } }}
          >
            {company.website ? 'Visit Website' : 'No Website'}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default FeaturedCompany;
