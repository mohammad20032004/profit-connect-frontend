'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Avatar,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';

const CommentsModal = ({ open, onClose, comments = [], postAuthor, onAddComment }) => {
  const profile = useSelector((state) => state.user.profile);
  const user = useSelector((state) => state.user.user);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const avatarSrc = profile?.avatar || undefined;

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    try {
      setLoading(true);
      await onAddComment?.(newComment.trim());
      setNewComment('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', sm: '600px' },
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {postAuthor}&apos;s post
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Comments List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {comments.length > 0 ? (
            <Stack spacing={2}>
              {comments.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
             No Comment Yet!
            </Typography>
          )}
        </Box>

        <Divider />

        {/* Add Comment */}
        <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <Avatar sx={{ width: 32, height: 32 }} src={avatarSrc}>
            {user?.username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Add Comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ bgcolor: '#f3f6f8', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={!newComment.trim() || loading}
            sx={{
              minWidth: 'auto',
              px: 2,
              bgcolor: '#00B4D8',
              '&:hover': { bgcolor: '#0096b8' }
            }}
          >
            <SendIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
