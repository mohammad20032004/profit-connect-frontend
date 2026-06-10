'use client';

import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Cake, Email, LocationOn, Phone, Public, Work } from '@mui/icons-material';

const StatItem = ({ label, value }) => (
    <Box textAlign="center">
        <Typography variant="h6" sx={{ color: 'primary.main' }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
);

const InfoItem = ({ icon, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
        {icon}
        <Typography variant="body1">{text}</Typography>
    </Box>
);

export default function ProfileOverview({ user, profile, stats, role }) {

    const infoItems = [
        { icon: <Work fontSize="small" />, text: role || 'N/A' },
        { icon: <LocationOn fontSize="small" />, text: profile?.location || 'N/A' },
        { icon: <Email fontSize="small" />, text: user?.email },
        { icon: <Phone fontSize="small" />, text: profile?.phone || 'N/A' },
        { icon: <Cake fontSize="small" />, text: profile?.dateOfBirth?.slice(0,10) || 'N/A' },
        { icon: <Public fontSize="small" />, text: profile?.website || 'N/A' },
    ];

    return (
        <Card>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                {/* Header */}
                <Grid container spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                    <Grid item>
                        <Avatar
                            src={profile?.avatar}
                            sx={{ width: 80, height: 80, border: '3px solid', borderColor: 'primary.main' }}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {profile?.fullname || `${profile?.firstName} ${profile?.lastName}`}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">{profile?.headline}</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary">Edit Profile</Button>
                    </Grid>
                </Grid>

                {/* Stats */}
                <Grid container justifyContent="space-around" sx={{ mb: 3 }}>
                    <StatItem label="Connections" value={stats?.connections || 0} />
                    <StatItem label="Profile Views" value={stats?.views || 0} />
                    <StatItem label="Posts" value={stats?.posts || 0} />
                </Grid>

                <Divider sx={{ mb: 3 }} />

                {/* About Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: 'text.primary', mb: 1.5 }}>
                        About
                    </Typography>
                    <Typography variant="body1" color="text.secondary">{profile?.bio}</Typography>
                </Box>

                {/* Info Grid */}
                <Grid container spacing={2} >
                    {infoItems.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <InfoItem icon={item.icon} text={item.text} />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
