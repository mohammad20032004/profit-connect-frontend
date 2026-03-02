'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Button,
  Box,
  Divider,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public'; // أيقونة الكرة الأرضية
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentsModal from './CommentsModal';

// تخصيص أزرار التفاعل (Like, Comment...) لتشبه التصميم
const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#5E5E5E', // لون رمادي غامق للنص
  fontWeight: 600,
  padding: theme.spacing(1.5),
  borderRadius: '4px',
  flex: 1, // ليأخذ كل زر مساحة متساوية
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.9)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    fontSize: '24px', // حجم الأيقونة
  },
}));


const Post = ({
  authorName,
  authorHeadline,
  authorImage,
  timeAgo,
  content,
  postImage,
  reactionsCount,
  commentsCount,
  repostsCount,
  comments = []
}) => {
  const [openComments, setOpenComments] = useState(false);
  return (
    <Card sx={{
      maxWidth: '100%',
      borderRadius: '8px',
      boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)', // حدود خفيفة جداً بدلاً من الظل الثقيل
      mb: 2
    }}>

      {/* 1. Header: Author Info & Follow Button */}
      <CardHeader
        avatar={
          <Avatar
            src={authorImage}
            sx={{ width: 48, height: 48 }}
            alt={authorName}
          />
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              size="small"
              sx={{
                color: '#00B4D8', // Cyan Color
                fontWeight: 'bold',
                textTransform: 'none',
                mr: 1,
                fontSize: '14px',
                '&:hover': { bgcolor: '#e6f7fa' }
              }}
            >
              + Follow
            </Button>
            {/* يمكنك إضافة زر More (...) هنا إذا أردت */}
          </Box>
        }
        title={
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#191919', lineHeight: 1.2 }}>
            {authorName}
          </Typography>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', mb: 0.5 }}>
              {authorHeadline}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#666' }}>
              <Typography variant="caption" sx={{ fontSize: '12px' }}>
                {timeAgo} •
              </Typography>
              <PublicIcon sx={{ fontSize: 14, ml: 0.5 }} />
            </Box>
          </Box>
        }
        sx={{ pb: 1 }}
      />

      {/* 2. Content: Text */}
      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography variant="body1" color="text.primary" sx={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
      </CardContent>

      {/* 3. Content: Image (Optional) */}
      {postImage && (
        <Box
          component="img"
          src={postImage}
          alt="Post content"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            mt: 1,
            maxHeight: '500px',
            objectFit: 'cover'
          }}
        />
      )}

      {/* 4. Stats: Reactions & Comments count */}
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Left: Reactions Icons & Count */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Stacked Icons Effect */}
          <Box sx={{ position: 'relative', width: 42, height: 16 }}>
            <Box sx={{
              position: 'absolute', left: 0, zIndex: 2,
              bgcolor: '#0a66c2', borderRadius: '50%', p: '2px', display: 'flex'
            }}>
              <ThumbUpIcon sx={{ fontSize: 10, color: '#fff' }} />
            </Box>
            <Box sx={{
              position: 'absolute', left: 14, zIndex: 1,
              bgcolor: '#df704d', borderRadius: '50%', p: '2px', display: 'flex'
            }}>
              <FavoriteIcon sx={{ fontSize: 10, color: '#fff' }} />
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontSize: '12px', '&:hover': { color: '#004182', textDecoration: 'underline', cursor: 'pointer' } }}>
            {reactionsCount} reactions
          </Typography>
        </Box>

        {/* Right: Comments Count */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px', '&:hover': { color: '#004182', textDecoration: 'underline', cursor: 'pointer' } }}>
            {commentsCount} comments • {repostsCount} reposts
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* 5. Action Buttons (Footer) */}
      <CardActions sx={{ px: 1, py: 0.5, justifyContent: 'space-between' }}>
        <ActionButton startIcon={<ThumbUpOffAltIcon />}>
          Like
        </ActionButton>
        <ActionButton startIcon={<ChatBubbleOutlineIcon />} onClick={() => setOpenComments(true)}>
          Comment
        </ActionButton>
        <ActionButton startIcon={<RepeatIcon />}>
          Repost
        </ActionButton>
        <ActionButton startIcon={<SendIcon sx={{ transform: 'rotate(-45deg)', mt: -0.5 }} />}>
          Send
        </ActionButton>
      </CardActions>

      {/* Comments Modal */}
      <CommentsModal 
        open={openComments} 
        onClose={() => setOpenComments(false)}
        comments={comments}
        postAuthor={authorName}
      />

    </Card>
  );
};

export default Post;
