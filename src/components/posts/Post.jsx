'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentsModal from './CommentsModal';

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#5E5E5E',
  fontWeight: 700,
  padding: theme.spacing(1.2, 1.4),
  borderRadius: '14px',
  flex: 1,
  border: '1px solid rgba(255,255,255,0.55)',
  background: 'rgba(255,255,255,0.34)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
    color: '#240046',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    fontSize: '21px',
  },
}));

const Post = ({
  id,
  authorName,
  authorHeadline,
  authorImage,
  timeAgo,
  content,
  postImage,
  reactionsCount,
  commentsCount,
  comments = [],
  isLiked: initialIsLiked = false,
  visibility = 'public',
  onLike,
  onAddComment,
}) => {
  const [openComments, setOpenComments] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(reactionsCount);

  React.useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  React.useEffect(() => {
    setLikesCount(reactionsCount);
  }, [reactionsCount]);

  const handleLike = async () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => prev + (nextLiked ? 1 : -1));

    try {
      await onLike?.();
    } catch (error) {
      setIsLiked(!nextLiked);
      setLikesCount((prev) => prev + (nextLiked ? -1 : 1));
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Card
      data-aos="fade-up"
      data-aos-duration="500"
      sx={{
        maxWidth: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        border: '1px solid rgba(255,255,255,0.55)',
        boxShadow: '0 18px 36px rgba(15,23,42,0.08)',
        mb: 2.2,
        backgroundColor: 'rgba(255,255,255,0.68)',
        backdropFilter: 'blur(18px)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.12))',
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 24px 44px rgba(15,23,42,0.12)',
        },
      }}
    >

      <CardHeader
        avatar={
          <Avatar
            src={authorImage}
            sx={{ width: 48, height: 48 }}
            alt={authorName}
          />
        }
        action={
          <Button
            size="small"
            onClick={handleFollow}
            sx={{
              color: isFollowing ? '#475569' : '#0ea5e9',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '13px',
              borderRadius: 999,
              px: 1.5,
              bgcolor: isFollowing ? 'rgba(255,255,255,0.4)' : 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(255,255,255,0.55)',
              '&:hover': { bgcolor: isFollowing ? 'rgba(255,255,255,0.58)' : 'rgba(14,165,233,0.16)' }
            }}
          >
            {isFollowing ? '✓ Following' : '+ Follow'}
          </Button>
        }
        title={
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 800, color: '#1e1b4b', lineHeight: 1.2 }}>
              {authorName}
            </Typography>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', mb: 0.5, color: '#64748b' }}>
              {authorHeadline}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
              <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 600 }}>
                {timeAgo} • {visibility}
              </Typography>
              <PublicIcon sx={{ fontSize: 14, ml: 0.5 }} />
            </Box>
          </Box>
        }
        sx={{ position: 'relative', zIndex: 1, pb: 1, px: 0.5, pt: 1 }}
      />

      <CardContent sx={{ position: 'relative', zIndex: 1, pt: 0, pb: 1 }}>
        <Typography variant="body1" color="text.primary" sx={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#334155', whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
      </CardContent>

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
            borderTop: '1px solid rgba(255,255,255,0.38)',
            borderBottom: '1px solid rgba(255,255,255,0.38)',
            maxHeight: '500px',
            objectFit: 'cover',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.01)',
            },
          }}
        />
      )}

      <Box sx={{ position: 'relative', zIndex: 1, px: 2, py: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontSize: '12px', color: '#64748b', '&:hover': { color: '#5b21b6', textDecoration: 'underline', cursor: 'pointer' } }}>
            {likesCount} reactions
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px', color: '#64748b', '&:hover': { color: '#5b21b6', textDecoration: 'underline', cursor: 'pointer' } }}>
            {commentsCount} comments
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: 2, borderColor: 'rgba(148,163,184,0.14)' }} />

      <CardActions sx={{ position: 'relative', zIndex: 1, px: 1.25, py: 1.1, justifyContent: 'space-between', gap: 1 }}>
        <ActionButton 
          startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
          onClick={handleLike}
          sx={{ color: isLiked ? '#0a66c2' : '#5E5E5E' }}
        >
          Like
        </ActionButton>
        <ActionButton startIcon={<ChatBubbleOutlineIcon />} onClick={() => setOpenComments(true)}>
          Comment
        </ActionButton>
        <ActionButton startIcon={<SendIcon sx={{ transform: 'rotate(-45deg)', mt: -0.5 }} />}>
          Send
        </ActionButton>
      </CardActions>

      <CommentsModal
        open={openComments}
        onClose={() => setOpenComments(false)}
        comments={comments}
        postAuthor={authorName}
        onAddComment={onAddComment}
      />

    </Card>
  );
};

export default Post;
