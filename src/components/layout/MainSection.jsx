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
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
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
  return avatar || undefined;
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

  const avatarSrc = profile?.avatar || undefined;
  const canSubmit = content.trim().length > 0 && !loading;
  const contentLength = content.trim().length;
  const visibilityLabel =
    visibility === 'private' ? 'Private circle' : visibility === 'connections' ? 'Connections only' : 'Public';

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
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 2, md: 2.5 },
        mb: 3,
        borderRadius: 4,
        border: 1,
        borderColor: 'custom.border',
        bgcolor: 'background.paper',
        boxShadow: 'custom.shadowLight',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.75, sm: 1.5 }}
          alignItems={{ xs: 'stretch', sm: 'flex-start' }}
        >
          <Avatar
            src={avatarSrc}
            sx={{
              width: 52,
              height: 52,
              alignSelf: { xs: 'flex-start', sm: 'auto' },
              border: '2px solid',
              borderColor: 'custom.border',
            }}
          >
            {user?.username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              spacing={1.5}
              sx={{ mb: 1.5 }}
            >
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: 'primary.dark' }}>
                    Create a post
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1,
                      py: 0.45,
                      borderRadius: 999,
                      bgcolor: 'background.default',
                      border: 1,
                      borderColor: 'custom.border',
                      color: 'primary.light',
                    }}
                  >
                    <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>Fresh update</Typography>
                  </Box>
                </Stack>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                  Share a quick win, idea, or announcement with your network.
                </Typography>
              </Box>

              <Box
                sx={{
                  alignSelf: { xs: 'flex-start', sm: 'flex-start' },
                  px: 1.25,
                  py: 0.75,
                  borderRadius: 3,
                  bgcolor: 'background.default',
                  border: 1,
                  borderColor: 'custom.border',
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 0.25 }}>Visibility</Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'primary.dark' }}>
                  {visibilityLabel}
                </Typography>
              </Box>
            </Stack>

            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="What would you like to share today?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'background.default',
                  alignItems: 'flex-start',
                  '& fieldset': {
                    borderColor: 'custom.border',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.light',
                  },
                  '&.Mui-focused fieldset': {
                    borderWidth: '1px',
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
              }}
            />

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mt: 1.5 }}>
              <TextField
                fullWidth
                placeholder="Optional image URL"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                InputProps={{
                  startAdornment: <AddPhotoAlternateOutlinedIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'background.default',
                    '& fieldset': { borderColor: 'custom.border' },
                    '&:hover fieldset': { borderColor: 'primary.light' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                }}
              />

              <TextField
                select
                value={visibility}
                onChange={(event) => setVisibility(event.target.value)}
                SelectProps={{
                  native: true,
                  IconComponent: KeyboardArrowDownRoundedIcon,
                }}
                InputProps={{
                  startAdornment: <PublicOutlinedIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
                sx={{
                  minWidth: { xs: '100%', md: 180 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'background.default',
                    pr: 0.5,
                    transition: 'all 0.2s ease',
                    '& fieldset': {
                      borderColor: 'custom.border',
                    },
                    '&:hover': {
                      bgcolor: 'background.paper',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'background.paper',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: 'primary.dark',
                  },
                  '& .MuiSelect-icon': {
                    color: 'primary.light',
                    fontSize: 24,
                    right: 10,
                    top: 'calc(50% - 12px)',
                    transition: 'transform 0.2s ease',
                  },
                  '& .Mui-focused .MuiSelect-icon': {
                    transform: 'rotate(180deg)',
                  },
                  '& select': {
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    cursor: 'pointer',
                  },
                }}
              >
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="connections">connections</option>
              </TextField>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={1.25}
              sx={{ mt: 1.75 }}
            >
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                <Box
                  sx={{
                    px: 1.1,
                    py: 0.8,
                    borderRadius: 999,
                    bgcolor: 'background.default',
                    border: 1,
                    borderColor: 'custom.border',
                  }}
                >
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', fontWeight: 600 }}>
                    {contentLength}/280 ready
                  </Typography>
                </Box>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                  Keep it clear, concise, and worth stopping for.
                </Typography>
              </Stack>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!canSubmit}
                disableElevation
                sx={{
                  textTransform: 'none',
                  borderRadius: 999,
                  px: 3.25,
                  py: 1.05,
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.7)',
                    bgcolor: 'action.disabledBackground',
                  },
                }}
              >
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
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
    <Box
      sx={{
        width: '100%',
        m: '0 auto',
        height:"95vh",
        overflowY: 'scroll',
        p: { xs: 1.5, md: 2 },
        position: 'relative',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 12,
          borderRadius: 5,
          pointerEvents: 'none',
        },
      }}
    >
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
