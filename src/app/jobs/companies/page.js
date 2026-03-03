import React from 'react'
import { Box, Container, Typography, Breadcrumbs, Link, Grid, Pagination } from '@mui/material';
import { CompanySearch, CompanyFilters, FeaturedCompany, CompanyCard } from '../../../components/jobs/companies';

export default function Companies() {
  const companiesData = [
    { name: 'Nebula Systems', industry: 'Aerospace', location: 'Seattle, WA', followers: '12k' },
    { name: 'EcoGrowth', industry: 'Green Energy', location: 'Austin, TX', followers: '8.5k' },
    { name: 'Global Bank', industry: 'Finance', location: 'New York, NY', followers: '45k' },
    { name: 'BrightIdeas', industry: 'Marketing', location: 'Remote', followers: '3.2k' },
    { name: 'MediCore', industry: 'Healthcare', location: 'Boston, MA', followers: '9.1k' },
    { name: 'EduSpark', industry: 'EdTech', location: 'Chicago, IL', followers: '5.6k' },
  ];

  return (
    <Box sx={{ bgcolor: '#f7f5f8', minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="xl">
        

        <CompanySearch />

        <Box sx={{ display: 'flex', gap: 5, flexDirection: { xs: 'column', lg: 'row' } }}>
          <CompanyFilters />
          
          <Box sx={{ flex: 1 }}>
            <FeaturedCompany />
            
            <Grid container spacing={3}>
              {companiesData.map((company, index) => (
                <Grid item xs={12} sm={6} xl={4} key={index}>
                  <CompanyCard {...company} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <Pagination 
                count={10} 
                sx={{ 
                  '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#250047', color: 'white' } 
                }} 
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
