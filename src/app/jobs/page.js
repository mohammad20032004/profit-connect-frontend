'use client';

import { Box, Button, Container, Typography, Avatar } from '@mui/material';
import { JobCard, JobFilters } from '../../components/jobs';

export default function Jobs() {
  return (
   <Container maxWidth="xl" sx={{ py: 5 }}>
     
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' }, gap: 4 }}>
        <JobFilters />
        <Box>
           <JobCard title="Senior Frontend Developer" company="Starlight" location="Remote" salary="130k-160k" tags={['Full-time', 'React']} />
        </Box>
      </Box>
    </Container>
  )
}