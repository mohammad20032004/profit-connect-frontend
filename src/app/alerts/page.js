"use client";

import React from 'react';
import { Box, Container, Grid, Typography, Button, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AlertItem } from '@/components/alerts';
import { AlertsSidebar } from '@/components/alerts';

export default function Alerts() {
  // New, structured alert data
  const alertsData = [
    {
      id: 1,
      type: 'profile_view',
      unread: true,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAm7WjaSoq002GKhq0aRyu98Rb1EmoOjdzxlj6mI9j18dNM_r6IwXI0t24QP4aNLwdmeDbMgVso49IGLSX8384fAtdOjMY3YB6_KTcNtnh989twHNbFUkrhuLNkwm4l6rMlBIIdFnT_T_NLDGySAE-Yq6Gp5pBZkr_7yiBYc03QVAL94TVg7QtiJXCzbg4ypTMVDx0sQMxD3CtmspWtcIwrB02p6sFHHmxDzl0TwHlQZeUsiqwf64jZ-kRBInU2aoAlWuzLulPxgA",
      actor: "MaxTec Group",
      time: "2m ago",
    },
    {
      id: 2,
      type: 'like',
      unread: true,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd7BwCgXIqnXY6M1AHz71V39md8jVrXOhJeisoR_RFBZQkOkVHHeE3Rnl1qp6-nUDCN6Z6v37qX87AggLTQd9jZ7J7yPpeuvO1WLXQJ2M9crtq64R1NTjxwffmaJfesXZMcT70KTVZriE6Nkq_sInGS63GqaBWjMoBgiOAl3DaDDGiRCbvRxpNSlAo2ewC5hRI0yKNlBfbQQ0z3hRNlquejb-EznNa3dyuWrI2COhl19jmu8jLWimV1RnYNC_lvAKK7AKra54KWE8",
      actor: "Sarah",
      time: "15m ago",
      actionButton: { text: "Say Congrats", url: "#" },
    },
    {
      id: 3,
      type: 'new_job',
      unread: false,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMHhxk7U7DcUyIb_wNrub5M3xZODCoikACnbrHlXWTLcenYnLJOwo92J49C3CFUJPv6lPH26tue0vLxzFmOTamssAaAW6gCLBS8IUylETsLpU1cfT6dlu4DV1rxCx1NAS7u5NTsAnCVTCF6hFdai7lwvNURrLm48eAm3mtkiQRrmDZAe3MlnA7b-tQbrNkDIa97xZ2FVuZV5iwPzYf_mYJcM_41DI8iRwS736AJrtGHnYEzCYRyKOIlHXCT1S56om1UWUWXuTMJOA",
      actor: "TechCorp",
      target: { title: "Senior UI Designer", url: "#" },
      time: "2h ago",
      actionButton: { text: "View Job", url: "#" },
    },
    {
      id: 4,
      type: 'endorsement',
      unread: false,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVEbKw7zJSlI5OWT9buct_qCm0xnt8JhISC1TcI5BvNshm9y5XLodVW1-Q_lxPevu4DWunchW9hwpSwJno9OS34X2kTks1c6Xabgumcbcks1Ms761MywOXyuGt8CB0QodvJ-KQtpYs6sTKEHkHHFX7AS0UlBwbcHolbZvJut-ynDttEWvBGE3Uz6RZFoW9TaOIogtFzoUV_2ouUFxSrZWh_Oi474jsyvWb3EkUiiXEqZnpBf0dCNlOXhgsLLrqQShTddztacr7s50",
      actor: "John Doe",
      details: { skill: "React Development" },
      time: "5h ago",
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: { xs: 8, md: 12 }, pb: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          
          <Grid item xs={12} md={3}>
            <AlertsSidebar />
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
              
              <Box sx={{ px: { xs: 2, md: 4 }, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                  Recent Alerts
                </Typography>
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                >
                  Mark all as read
                </Button>
              </Box>

              <Box>
                {alertsData.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </Box>

              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button endIcon={<ExpandMoreIcon />} sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none' }}>
                  View older alerts
                </Button>
              </Box>

            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}