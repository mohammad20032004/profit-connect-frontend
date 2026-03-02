'use client';

import { Paper, Button, Box, Typography, Divider, Avatar, Chip } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Image from "next/image";
import { useSelector } from "react-redux";




const MiniProfile = () => {
    return (
        <Paper elevation={0} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            bgcolor: '#240046',
            borderRadius: 4,
            height: '50vh',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Box sx={{
                bgcolor: 'white', width: '100%', height: '80%', borderTopRightRadius: 15,
                borderTopLeftRadius: 15, textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #d0f9ff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

            }}>
                <Avatar sx={{
                    width: 80,
                    height: 80,
                    border: '4px solid #fff',
                    mt: -15,
                }} src="/Images/login-photo.png" />
                <Box sx={{ padding: 2, paddingTop: 0 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>John Doe</Typography>
                    <Typography variant="body2" component="div" color="#7d7d7d">Front End Developer</Typography>
                </Box>
                 <Chip
                    icon={<VerifiedUserIcon fontSize="16px" />}
                    label="R-Score: 98"
                    color="#240046"
                    variant="outlined" 
                    className="Reputation_Score"
                
                />
                <Image src={"/Images/High-Score.gif"} width={60} height={60} alt="Score Icon" />
                <Divider sx={{ width: '100%', my: 2 }} />
                <Box sx={{ width: '100%', px: 1.5, display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                        Profile viewers
                    </Typography>
                    <strong>3221</strong>
                </Box>
                <Box sx={{ width: '100%', px: 1.5, display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                        Post imprission
                    </Typography><strong>321</strong>
                </Box>
               
            </Box>

        </Paper>
    )
}
const InfoPrfileSidebar = () => {
    const info = useSelector((state) => state.user.profile);
    console.log(info);
    return (
        <Box component={'div'} sx={{ width: '100%', height: '100vh', p: 2 }}>
            <MiniProfile />
        </Box>
    )
};

export default InfoPrfileSidebar;
