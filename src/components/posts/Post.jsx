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
  Stack,
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
  fontWeight: 600,
  padding: theme.spacing(1.5),
  borderRadius: '4px',
  flex: 1,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.9)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    fontSize: '24px',
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
        borderRadius: '8px',
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)',
        mb: 2,
        backgroundColor: '#ffffff',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 28px rgba(15,23,42,0.12)',
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
              color: isFollowing ? '#666' : '#00B4D8',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '14px',
              '&:hover': { bgcolor: isFollowing ? '#f5f5f5' : '#e6f7fa' }
            }}
          >
            {isFollowing ? '✓ Following' : '+ Follow'}
          </Button>
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
                {timeAgo} • {visibility}
              </Typography>
              <PublicIcon sx={{ fontSize: 14, ml: 0.5 }} />
            </Box>
          </Box>
        }
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography variant="body1" color="text.primary" sx={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
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
            maxHeight: '500px',
            objectFit: 'cover',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.01)',
            },
          }}
        />
      )}

      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontSize: '12px', '&:hover': { color: '#004182', textDecoration: 'underline', cursor: 'pointer' } }}>
            {likesCount} reactions
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px', '&:hover': { color: '#004182', textDecoration: 'underline', cursor: 'pointer' } }}>
            {commentsCount} comments
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: 2 }} />

      <CardActions sx={{ px: 1, py: 0.5, justifyContent: 'space-between' }}>
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
