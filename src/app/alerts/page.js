"use client";

import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AlertItem } from '@/components/alerts';
import { AlertsSidebar } from '@/components/alerts';
export default function Alerts() {
  // بيانات تجريبية للإشعارات
  const alertsData = [
    {
      id: 1,
      unread: true,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAm7WjaSoq002GKhq0aRyu98Rb1EmoOjdzxlj6mI9j18dNM_r6IwXI0t24QP4aNLwdmeDbMgVso49IGLSX8384fAtdOjMY3YB6_KTcNtnh989twHNbFUkrhuLNkwm4l6rMlBIIdFnT_T_NLDGySAE-Yq6Gp5pBZkr_7yiBYc03QVAL94TVg7QtiJXCzbg4ypTMVDx0sQMxD3CtmspWtcIwrB02p6sFHHmxDzl0TwHlQZeUsiqwf64jZ-kRBInU2aoAlWuzLulPxgA",
      content: <><strong style={{ color: '#240046' }}>MaxTec Group</strong> viewed your profile</>,
      time: "2m ago",
      actionButton: null
    },
    {
      id: 2,
      unread: true,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd7BwCgXIqnXY6M1AHz71V39md8jVrXOhJeisoR_RFBZQkOkVHHeE3Rnl1qp6-nUDCN6Z6v37qX87AggLTQd9jZ7J7yPpeuvO1WLXQJ2M9crtq64R1NTjxwffmaJfesXZMcT70KTVZriE6Nkq_sInGS63GqaBWjMoBgiOAl3DaDDGiRCbvRxpNSlAo2ewC5hRI0yKNlBfbQQ0z3hRNlquejb-EznNa3dyuWrI2COhl19jmu8jLWimV1RnYNC_lvAKK7AKra54KWE8",
      content: <><strong style={{ color: '#240046' }}>Sarah</strong> liked your recent post</>,
      time: "15m ago",
      actionButton: "Say Congrats"
    },
    {
      id: 3,
      unread: false,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMHhxk7U7DcUyIb_wNrub5M3xZODCoikACnbrHlXWTLcenYnLJOwo92J49C3CFUJPv6lPH26tue0vLxzFmOTamssAaAW6gCLBS8IUylETsLpU1cfT6dlu4DV1rxCx1NAS7u5NTsAnCVTCF6hFdai7lwvNURrLm48eAm3mtkiQRrmDZAe3MlnA7b-tQbrNkDIa97xZ2FVuZV5iwPzYf_mYJcM_41DI8iRwS736AJrtGHnYEzCYRyKOIlHXCT1S56om1UWUWXuTMJOA",
      content: <><strong style={{ color: '#240046' }}>TechCorp</strong> posted a new job: <span style={{ color: '#00677d', fontWeight: 500 }}>Senior UI Designer</span></>,
      time: "2h ago",
      actionButton: "View Job"
    },
    {
      id: 4,
      unread: false,
      avatarSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVEbKw7zJSlI5OWT9buct_qCm0xnt8JhISC1TcI5BvNshm9y5XLodVW1-Q_lxPevu4DWunchW9hwpSwJno9OS34X2kTks1c6Xabgumcbcks1Ms761MywOXyuGt8CB0QodvJ-KQtpYs6sTKEHkHHFX7AS0UlBwbcHolbZvJut-ynDttEWvBGE3Uz6RZFoW9TaOIogtFzoUV_2ouUFxSrZWh_Oi474jsyvWb3EkUiiXEqZnpBf0dCNlOXhgsLLrqQShTddztacr7s50",
      content: <><strong style={{ color: '#240046' }}>John Doe</strong> endorsed you for <strong style={{ backgroundColor: '#b3ebff', color: '#004e5f', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase', marginLeft: '4px' }}>React Development</strong></>,
      time: "5h ago",
      actionButton: null
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pt: 12, pb: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          
          {/* العمود الجانبي (Sidebar) */}
          <Grid item xs={12} md={3}>
            <AlertsSidebar />
          </Grid>

          {/* عمود المحتوى الرئيسي (Feed) */}
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: 'white', borderRadius: 4, border: '1px solid #e1e3e4', overflow: 'hidden' }}>
              
              {/* ترويسة الإشعارات */}
              <Box sx={{ px: 4, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f5' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#240046', fontFamily: 'Manrope, sans-serif' }}>
                  Recent Alerts
                </Typography>
                <Typography component="button" sx={{ color: '#00B4D8', fontSize: '0.875rem', fontWeight: 600, border: 'none', bgcolor: 'transparent', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Mark all as read
                </Typography>
              </Box>

              {/* قائمة الإشعارات */}
              <Box>
                {alertsData.map((alert) => (
                  <AlertItem 
                    key={alert.id}
                    unread={alert.unread}
                    avatarSrc={alert.avatarSrc}
                    content={alert.content}
                    time={alert.time}
                    actionButton={alert.actionButton}
                  />
                ))}
              </Box>

              {/* زر عرض المزيد */}
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Button 
                  endIcon={<ExpandMoreIcon />}
                  sx={{ 
                    color: '#7c7480', 
                    fontWeight: 600, 
                    textTransform: 'none',
                    '&:hover': { color: '#240046', bgcolor: 'transparent' }
                  }}
                >
                  View older alerts
                </Button>
              </Box>

            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}