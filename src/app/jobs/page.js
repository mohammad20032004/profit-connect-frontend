import { Box, Button, Container, Typography, Avatar } from '@mui/material';
import JobCard from '../../components/common/jobs/JobCard';
import SearchHeader from '../../components/common/jobs/JobHeader';
import JobSidebar from '../../components/common/jobs/JobSidebar';
export default function Jobs() {
  return (
   <Container maxWidth="xl" sx={{ py: 5 }}>
     
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' }, gap: 4 }}>
        <JobSidebar />
        <Box>
           <JobCard title="Senior Frontend Developer" company="Starlight" location="Remote" salary="130k-160k" tags={['Full-time', 'React']} />
           {/* كرر المكون حسب الحاجة */}
        </Box>
      </Box>
    </Container>
  )
}