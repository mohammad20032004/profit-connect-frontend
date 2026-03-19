"use client";

import React from 'react';
import { Box, Typography, Avatar, IconButton, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function AlertItem({ unread, avatarSrc, content, time, actionButton }) {
  return (
    <Box 
      sx={{ 
        px: 4, 
        py: 3, 
        bgcolor: unread ? '#E6F7FA' : 'white', // خلفية سماوية فاتحة إذا كان غير مقروء
        borderBottom: '1px solid #f3f4f5',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        transition: 'background-color 0.3s',
        '&:hover': { bgcolor: unread ? '#dcf4f9' : '#f8f9fa', '& .more-icon': { opacity: 1 } }
      }}
    >
      {/* نقطة "غير مقروء" */}
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00B4D8', opacity: unread ? 1 : 0, flexShrink: 0 }} />
      
      {/* الصورة الشخصية */}
      <Avatar src={avatarSrc} sx={{ width: 48, height: 48, flexShrink: 0 }} />
      
      {/* المحتوى النصي */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: '0.875rem', color: '#191c1d' }}>
          {content}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: actionButton ? 1 : 0.5 }}>
          <Typography sx={{ fontSize: '0.75rem', color: '#7c7480', fontWeight: 500 }}>
            {time}
          </Typography>
          
          {/* زر الإجراء (إن وجد) */}
          {actionButton && (
            <Button 
              variant="outlined" 
              size="small"
              sx={{ 
                borderRadius: 50, 
                borderColor: '#00B4D8', 
                color: '#00B4D8', 
                fontWeight: 'bold', 
                textTransform: 'none',
                py: 0.2,
                px: 2,
                fontSize: '0.75rem',
                '&:hover': { bgcolor: '#00B4D8', color: 'white' }
              }}
            >
              {actionButton}
            </Button>
          )}
        </Box>
      </Box>

      {/* أيقونة الخيارات (تظهر عند التمرير) */}
      <IconButton className="more-icon" sx={{ opacity: 0, transition: 'opacity 0.2s', color: '#7c7480', '&:hover': { color: '#00B4D8' } }}>
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
}