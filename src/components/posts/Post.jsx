'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import {
  ThumbUpAlt, ThumbUpOffAlt, CommentOutlined, ShareOutlined, MoreVert
} from '@mui/icons-material';
import { CommentsModal } from './';


const PostActions = ({ onLike, onComment, isLiked }) => (
  <Stack direction="row" justifyContent="space-around" sx={{ mt: 1 }}>
    <ButtonAction icon={isLiked ? <ThumbUpAlt color="primary" /> : <ThumbUpOffAlt />} label="Like" onClick={onLike} isLiked={isLiked} />
    <ButtonAction icon={<CommentOutlined />} label="Comment" onClick={onComment} />
    <ButtonAction icon={<ShareOutlined />} label="Share" />
  </Stack>
);

const ButtonAction = ({ icon, label, onClick, isLiked }) => (
  <Button
    onClick={onClick}
    startIcon={icon}
    sx={{
      color: isLiked ? 'primary.main' : 'text.secondary',
      fontWeight: isLiked ? 'bold' : 'regular',
      flex: 1,
      py: 1.5,
      borderRadius: 2,
      '&:hover': { bgcolor: 'action.hover' },
    }}
  >
    {label}
  </Button>
);

export default function Post(props) {
  const { id, authorImage, authorName, authorHeadline, timeAgo, content, postImage, reactionsCount, commentsCount, onLike, isLiked, comments, onAddComment, authorId } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleCommentsModalOpen = () => setCommentsModalOpen(true);
  const handleCommentsModalClose = () => setCommentsModalOpen(false);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        {/* Post Header */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Avatar src={authorImage} sx={{ width: 48, height: 48, cursor: 'pointer' }} onClick={() => authorId && router.push(`/user-profile/${authorId}`)} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ cursor: 'pointer' }} onClick={() => authorId && router.push(`/user-profile/${authorId}`)}>{authorName}</Typography>
            <Typography variant="body2" color="text.secondary">{authorHeadline}</Typography>
            <Typography variant="caption" color="text.secondary">{timeAgo}</Typography>
          </Box>
          <IconButton onClick={handleMenuClick}><MoreVert /></IconButton>
        </Stack>

        {/* Post Content */}
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>

        {postImage && <Box component="img" src={postImage} alt="Post image" sx={{ width: '100%', borderRadius: 2, mb: 1.5, border: '1px solid', borderColor: 'divider' }} />}

        {/* Post Stats */}
        <Stack direction="row" justifyContent="space-between" sx={{ color: 'text.secondary', mb: 1 }}>
          <Typography variant="body2">{reactionsCount} Likes</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={handleCommentsModalOpen}>{commentsCount} Comments</Typography>
        </Stack>
        <Divider />
        <PostActions onLike={onLike} onComment={handleCommentsModalOpen} isLiked={isLiked} />
      </CardContent>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Save</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
      <CommentsModal open={isCommentsModalOpen} onClose={handleCommentsModalClose} comments={comments} postAuthor={authorName} onAddComment={(newComment) => onAddComment(id, newComment)} />
    </Card>
  );
}
