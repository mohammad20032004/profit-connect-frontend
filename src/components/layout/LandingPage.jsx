"use client";

import React from 'react';
import { 
  Box, Typography, Button, Container, Grid, Card, Avatar, Stack 
} from '@mui/material';
import { 
  Public, Bolt, QueryStats, Star, AlternateEmail, Hub 
} from '@mui/icons-material';

// --- 1. Navbar Component ---
const Navbar = () => (
  <Box
    component="nav"
    sx={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      bgcolor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(36, 0, 70, 0.05)',
      py: 2
    }}
  >
    <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 900, color: '#240046', fontFamily: 'Manrope, sans-serif' }}>
        Profit Connect
      </Typography>
      
      <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
        {['Network', 'Opportunities', 'Curator', 'About'].map((item) => (
          <Typography key={item} component="a" href="#" sx={{ color: '#4b444f', fontWeight: 700, textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            {item}
          </Typography>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button sx={{ color: '#4b444f', fontWeight: 'bold', textTransform: 'none' }}>
          Sign In
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#240046', color: 'white', borderRadius: 50, px: 3, textTransform: 'none', fontWeight: 'bold',
            boxShadow: '0 10px 15px -3px rgba(36, 0, 70, 0.2)', '&:hover': { bgcolor: '#3a0070' }
          }}
        >
          Get Started
        </Button>
      </Stack>
    </Container>
  </Box>
);

// --- 2. Hero Section ---
const HeroSection = () => (
  <Container maxWidth="xl" sx={{ pt: { xs: 15, md: 20 }, pb: { xs: 10, md: 15 } }}>
    <Grid container spacing={8} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h2" sx={{ fontWeight: 800, color: '#240046', mb: 3, fontFamily: 'Manrope, sans-serif', lineHeight: 1.1 }}>
          Build Your Professional Future
        </Typography>
        <Typography sx={{ fontSize: '1.25rem', color: '#4b444f', mb: 5, maxWidth: 500 }}>
          A curated ecosystem where high-impact professionals discover exclusive opportunities and network with the world&apos;s elite curators.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" sx={{ bgcolor: '#00B4D8', borderRadius: 50, px: 4, py: 1.5, fontWeight: 'bold', textTransform: 'none', fontSize: '1.1rem', boxShadow: '0 20px 25px -5px rgba(0, 180, 216, 0.25)', '&:hover': { bgcolor: '#0096B4' } }}>
            Join for Free
          </Button>
          <Button variant="outlined" sx={{ borderColor: 'rgba(36, 0, 70, 0.2)', color: '#240046', borderRadius: 50, px: 4, py: 1.5, fontWeight: 'bold', textTransform: 'none', fontSize: '1.1rem', '&:hover': { bgcolor: 'rgba(36, 0, 70, 0.05)', borderColor: '#240046' } }}>
            Explore Jobs
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: -20, bgcolor: 'rgba(0, 180, 216, 0.1)', filter: 'blur(40px)', borderRadius: '50%' }} />
        <Box component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWOYCU_Kfi3IBjnrD3KIvhGPReoeZKv8oCFZVG1aQTMhA04L19f6JHxGRQ0xkVJXLIaBL_TvHnC3oWFH7DfffaL3ykRkoD1ZB8zZ4Tlxl-yEAIfq1HwODDplKWzHnVU3YyhQ5ch_DEokOAn5Pe1OF41KNKD_NFaHa7QbhGnRVMB5-Q1bZT4JdHtEKdNW9kOCx9-3b6Ly9OyYdepuNnulPrBO3ZdjoyWFldWZwLvK8LFkgnRzOE_a-V2OkqBmKzJyIemE0EDIpxxpM" alt="Dashboard" sx={{ width: '100%', borderRadius: 4, position: 'relative', boxShadow: '0 40px 80px -20px rgba(36, 0, 70, 0.06)' }} />
      </Grid>
    </Grid>
  </Container>
);

// --- 3. Features Section ---
const FeaturesSection = () => {
  const features = [
    { icon: <Public />, title: "Global Networking", desc: "Connect with vetted industry leaders across 40+ countries in a private, high-signal environment." },
    { icon: <Bolt />, title: "Smart Job Matching", desc: "AI-driven curation that suggests opportunities based on your specific expertise and trajectory." },
    { icon: <QueryStats />, title: "Salary Insights", desc: "Real-time compensation data and market trends to ensure your worth is always recognized." }
  ];

  return (
    <Box sx={{ bgcolor: '#f3f4f5', py: 15 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#240046', mb: 2, fontFamily: 'Manrope, sans-serif' }}>Curated Intelligence</Typography>
          <Typography sx={{ color: '#4b444f', fontSize: '1.1rem' }}>The tools you need to stay ahead of the digital economy.</Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 5, borderRadius: 4, boxShadow: '0 40px 80px -20px rgba(36, 0, 70, 0.06)', transition: 'all 0.3s', '&:hover': { bgcolor: '#e7e8e9', '& .icon-box': { bgcolor: '#00B4D8', color: 'white' } } }}>
                <Box className="icon-box" sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(0, 180, 216, 0.1)', color: '#00B4D8', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, transition: 'all 0.3s' }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#240046', mb: 2, fontFamily: 'Manrope, sans-serif' }}>{item.title}</Typography>
                <Typography sx={{ color: '#4b444f', lineHeight: 1.7 }}>{item.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// --- 4. Reviews Section ---
const ReviewsSection = () => {
  const reviews = [
    { name: "Sarah Jenkins", role: "CTO, NexaFlow", text: "The quality of the network here is unparalleled. I found my current CTO role within three weeks of joining.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK6pXhIDDw3PgQGn5VH4viNY4LpfCjLrssR_l2Gm9tSEBdtDIfOqIneHqtUDj51ppUQQKhAd8dEUUcmtvMgQjNdeuRWq2YmEd0uukEccKDRbqUvALN1znxZ1-rGr4s53fwyF_NV9n-dMrv4QBATXjUwAHy_2QN96LqPTF2-oYuYRHj-LdJffbppp9qJDVM7lLdBL60BgBgnv-sDVuOaGlm0sJfS8-4PKsGuR4EYkLWoLgockVwbrt2erXcct13Qk9lLtmwr5MGY3A" },
    { name: "David Chen", role: "VP Growth, Orbital", text: "Finally, a platform that respects the density of an executive schedule. The curation is spot-on every time.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7FxTMlTZRVVSE1scRx2M8a1TbTTr3qlh3omDo_K3rI-FDn_wysGcXtqwCUX2K5mGYI-5qvCO2B8nn0Ye-rKnCuv19KVmksBC9R4rihFuvqH19HlFL05iFTKowRRrMytnVHKN8S91igZpNAMTSdV_0BJn7nR9tsKn2oPKbCSbpY9pXlRUHGOXNWci9i7GtyLNtc3jMog6MnCFcTEBVoUxETqvB3NfBbg_adtkdC7G9JBXD1QJ-LN3MpW9eQ08gLiv1SqsUKPcCRrk" },
    { name: "Elena Rodriguez", role: "Director of UX, Horizon", text: "The salary insights alone paid for the membership 10x over in my last negotiation. A must-have tool.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwhDwnW1eNCVajEuYRnwjZsS2fx51Mcs0NTo-Xs-GMJbZdOS342tEKPURMNwm9FIAvYVlq3p-T9W8K_xf9tt_Mfo_zU81c7eCuEoZbRXj1BD1MiIitnBfm4720CH4kmfBNuYXH6poER4yPhz84cXChGm-7GKIyYbYS_0zCS0nHDqopatrUajt5RSfQ61KOrPgzWMcAHJD_g21T64V-kr2m6D0rwfGuAAT1GMvCoWS3fC5dO3IC7a0sk9Oj0saoR8E6r9kezOokoGM" }
  ];

  return (
    <Box sx={{ py: 15, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#240046', mb: 2, fontFamily: 'Manrope, sans-serif' }}>Trusted by Leaders</Typography>
          <Typography sx={{ color: '#4b444f' }}>Hear from the executives and innovators who have redefined their trajectory.</Typography>
        </Box>
        <Grid container spacing={4}>
          {reviews.map((rev, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(205, 195, 208, 0.3)', boxShadow: '0 40px 80px -20px rgba(36, 0, 70, 0.06)' }}>
                <Stack direction="row" spacing={0.5} sx={{ color: '#00B4D8', mb: 3 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} fontSize="small" />)}
                </Stack>
                <Typography sx={{ color: '#191c1d', mb: 4, fontStyle: 'italic' }}>&quot;{rev.text}&quot;</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={rev.img} sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#240046' }}>{rev.name}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#4b444f' }}>{rev.role}</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// --- 5. CTA Section ---
const CTASection = () => (
  <Container maxWidth="xl" sx={{ mb: 15 }}>
    <Box sx={{ bgcolor: '#240046', borderRadius: 4, p: { xs: 6, md: 12 }, textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(36, 0, 70, 0.4)' }}>
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, bgcolor: 'rgba(0, 180, 216, 0.2)', filter: 'blur(100px)' }} />
      <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, bgcolor: 'rgba(0, 180, 216, 0.1)', filter: 'blur(100px)' }} />
      
      <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 3, position: 'relative', zIndex: 10, fontFamily: 'Manrope, sans-serif' }}>
        Ready to elevate your career?
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', mb: 6, position: 'relative', zIndex: 10 }}>
        Join the waitlist for our next curated cohort. Limited seats available for Q3.
      </Typography>
      <Button variant="contained" sx={{ bgcolor: '#00B4D8', color: 'white', borderRadius: 50, px: 6, py: 2, fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'none', position: 'relative', zIndex: 10, '&:hover': { bgcolor: '#0096B4' } }}>
        Join for Free
      </Button>
    </Box>
  </Container>
);

// --- 6. Footer ---
const Footer = () => (
  <Box component="footer" sx={{ bgcolor: '#0f001e', borderRadius: '24px 24px 0 0', py: 8 }}>
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ mb: { xs: 4, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1, fontFamily: 'Manrope, sans-serif' }}>Profit Connect</Typography>
        <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>© 2024 Profit Connect. The Digital Curator.</Typography>
      </Box>
      <Stack direction="row" spacing={4} sx={{ mb: { xs: 4, md: 0 } }}>
        {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
          <Typography key={link} component="a" href="#" sx={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { color: '#00B4D8' } }}>{link}</Typography>
        ))}
      </Stack>
      <Stack direction="row" spacing={2}>
        {[
          <AlternateEmail key="alternate-email" fontSize="small" />,
          <Hub key="hub" fontSize="small" />,
        ].map((icon, i) => (
          <Box key={i} sx={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { color: '#00B4D8', borderColor: '#00B4D8' } }}>
            {icon}
          </Box>
        ))}
      </Stack>
    </Container>
  </Box>
);

// --- Main Page Component ---
export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      {/* قسم How it Works يعتمد على نفس مبدأ Grid، تركته لاختصار الكود ويمكنك بناءه بسهولة */}
      <ReviewsSection />
      <CTASection />
      <Footer />
    </Box>
  );
}
