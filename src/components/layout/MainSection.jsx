'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { useSelector } from 'react-redux';
import { Post } from '../posts';
import { addComment, createPost, getPosts, toggleLike } from '@/services/postService';

const getAuthorName = (user) => {
  const profile = user?.profile;
  return (
    profile?.fullname ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') ||
    user?.username ||
    'Unknown User'
  );
};

const getAuthorHeadline = (user) => user?.profile?.headline || user?.role || 'Professional Member';

const getAuthorImage = (user) => {
  const avatar = user?.profile?.avatar;
  return avatar ? `/Images/${avatar}` : undefined;
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return 'now';

  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.max(1, Math.floor((now - date) / 1000));

  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  return `${Math.floor(diffInSeconds / 86400)}d`;
};

const mapPost = (post, currentUserId) => ({
  id: post?._id,
  authorName: getAuthorName(post?.user),
  authorHeadline: getAuthorHeadline(post?.user),
  authorImage: getAuthorImage(post?.user),
  timeAgo: formatRelativeTime(post?.createdAt),
  content: post?.content || '',
  postImage: post?.image || null,
  reactionsCount: post?.likes?.length || 0,
  commentsCount: post?.comments?.length || 0,
  visibility: post?.visibility || 'public',
  isLiked: Boolean(currentUserId && post?.likes?.includes(currentUserId)),
  comments: (post?.comments || []).map((comment) => ({
    id: comment?._id,
    user: getAuthorName(comment?.user),
    text_comment: comment?.content,
    userImage: getAuthorImage(comment?.user),
    timeAgo: formatRelativeTime(comment?.createdAt),
  })),
});

function CreatePostComposer({ onCreate, loading }) {
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.user.profile);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [visibility, setVisibility] = useState('public');

  const avatarSrc = profile?.avatar ? `/Images/${profile.avatar}` : undefined;
  const canSubmit = content.trim().length > 0 && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    await onCreate({
      content: content.trim(),
      image: image.trim() || null,
      visibility,
    });

    setContent('');
    setImage('');
    setVisibility('public');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 2.5,
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        bgcolor: '#fff',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Avatar src={avatarSrc}>{user?.username?.charAt(0)?.toUpperCase()}</Avatar>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Start a post..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fbfcfe' } }}
          />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mt: 1.5 }}>
            <TextField
              fullWidth
              placeholder="Optional image URL"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              InputProps={{
                startAdornment: <AddPhotoAlternateOutlinedIcon sx={{ color: '#6b7280', mr: 1 }} />,
              }}
            />

            <TextField
              select
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
              SelectProps={{ native: true }}
              sx={{ minWidth: { xs: '100%', md: 160 } }}
              InputProps={{
                startAdornment: <PublicOutlinedIcon sx={{ color: '#6b7280', mr: 1 }} />,
              }}
            >
              <option value="public">public</option>
              <option value="private">private</option>
              <option value="connections">connections</option>
            </TextField>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
            <Typography sx={{ color: '#6b7280', fontSize: '0.92rem' }}>
              Share your update with your network.
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canSubmit}
              sx={{
                textTransform: 'none',
                borderRadius: 999,
                px: 3,
                bgcolor: '#240046',
                '&:hover': { bgcolor: '#3c096c' },
              }}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function MainSection() {
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingPost, setCreatingPost] = useState(false);
  const [error, setError] = useState('');

  const currentUserId = currentUser?.id || currentUser?._id;

  const mappedPosts = useMemo(
    () => posts.map((post) => mapPost(post, currentUserId)),
    [posts, currentUserId]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setError('');
        const response = await getPosts({ token, page: 1, limit: 10 });
        setPosts(response?.data || []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handleCreatePost = async (postData) => {
    if (!token) return;

    try {
      setCreatingPost(true);
      const response = await createPost({ token, postData });
      setPosts((prev) => [response.data, ...prev]);
    } catch (createError) {
      alert(createError.message);
    } finally {
      setCreatingPost(false);
    }
  };

  const handleToggleLike = async (postId) => {
    if (!token) return;

    try {
      const response = await toggleLike({ token, postId });
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.isLiked
                  ? [...(post.likes || []), currentUserId].filter(Boolean)
                  : (post.likes || []).filter((likeId) => likeId !== currentUserId),
              }
            : post
        )
      );
    } catch (likeError) {
      alert(likeError.message);
    }
  };

  const handleAddComment = async (postId, content) => {
    if (!token) return;

    try {
      await addComment({ token, postId, content });
      const response = await getPosts({ token, page: 1, limit: 10 });
      setPosts(response?.data || []);
    } catch (commentError) {
      alert(commentError.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress sx={{ color: '#240046' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', m: '0 auto', p: 2 }}>
      <CreatePostComposer onCreate={handleCreatePost} loading={creatingPost} />

      {error ? (
        <Paper elevation={0} sx={{ p: 2.5, mb: 2, borderRadius: 3, border: '1px solid #fecaca', bgcolor: '#fff1f2' }}>
          <Typography sx={{ color: '#b42318', fontWeight: 700 }}>{error}</Typography>
        </Paper>
      ) : null}

      {mappedPosts.map((post) => (
        <Post
          key={post.id}
          {...post}
          onLike={() => handleToggleLike(post.id)}
          onAddComment={(content) => handleAddComment(post.id, content)}
        />
      ))}
    </Box>
  );
}
