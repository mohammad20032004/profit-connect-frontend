'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material";
import {
  acceptConnectionRequest,
  getConnections,
  getNetworkRequests,
  rejectConnectionRequest,
  removeConnection,
} from '@/services';
import { NetworkSidebar, Invitations, ProfileCard } from "@/components/network";

const getFullName = (user) => {
  const firstName = user?.profile?.firstName || '';
  const lastName = user?.profile?.lastName || '';
  return `${firstName} ${lastName}`.trim() || 'Unknown User';
};

export default function Network() {
  const token = useSelector((state) => state.user.token);
  const authChecked = useSelector((state) => state.user.authChecked);
  const [connections, setConnections] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestActionId, setRequestActionId] = useState('');
  const [removeActionId, setRemoveActionId] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadNetwork = async () => {
      if (!authChecked) {
        return;
      }

      if (!token) {
        setConnections([]);
        setRequests([]);
        setIsLoading(false);
        setError('Sign in to view your network.');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const [requestsResponse, connectionsResponse] = await Promise.all([
          getNetworkRequests(token),
          getConnections(token),
        ]);

        if (!isMounted) {
          return;
        }

        setRequests(requestsResponse?.data ?? []);
        setConnections(connectionsResponse?.data ?? []);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError.message || 'Failed to load network data');
        setRequests([]);
        setConnections([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNetwork();

    return () => {
      isMounted = false;
    };
  }, [authChecked, token]);

  const handleAccept = async (requestId) => {
    if (!token) {
      return;
    }

    setRequestActionId(requestId);

    try {
      await acceptConnectionRequest({ token, requestId });

      const acceptedRequest = requests.find((request) => request._id === requestId);

      setRequests((currentRequests) => currentRequests.filter((request) => request._id !== requestId));

      if (acceptedRequest?.requester) {
        setConnections((currentConnections) => [acceptedRequest.requester, ...currentConnections]);
      }
    } catch (actionError) {
      setError(actionError.message || 'Failed to accept connection request');
    } finally {
      setRequestActionId('');
    }
  };

  const handleReject = async (requestId) => {
    if (!token) {
      return;
    }

    setRequestActionId(requestId);

    try {
      await rejectConnectionRequest({ token, requestId });
      setRequests((currentRequests) => currentRequests.filter((request) => request._id !== requestId));
    } catch (actionError) {
      setError(actionError.message || 'Failed to reject connection request');
    } finally {
      setRequestActionId('');
    }
  };

  const handleRemove = async (userId) => {
    if (!token) {
      return;
    }

    setRemoveActionId(userId);

    try {
      await removeConnection({ token, userId });
      setConnections((currentConnections) => currentConnections.filter((connection) => connection._id !== userId));
    } catch (actionError) {
      setError(actionError.message || 'Failed to remove connection');
    } finally {
      setRemoveActionId('');
    }
  };

  const connectionCards = useMemo(() => connections.map((connection) => ({
    id: connection._id,
    name: getFullName(connection),
    headline: connection?.profile?.headline || 'No headline available',
    mutuals: 0,
    avatarSrc: connection?.profile?.avatar || '',
  })), [connections]);

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3 },
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "28%" } }}>
          <NetworkSidebar
            connectionsCount={connections.length}
            requestsCount={requests.length}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "72%" } }}>
          {error && !isLoading && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
              {error}
            </Alert>
          )}

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#00B4D8' }} />
            </Box>
          ) : (
            <>
              <Invitations
                invitations={requests}
                onAccept={handleAccept}
                onReject={handleReject}
                actionLoadingId={requestActionId}
              />

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800, color: '#240046', fontSize: '1.2rem' }}>
                  Your connections
                </Typography>
                <Typography sx={{ color: '#64748b', mt: 0.5 }}>
                  Manage accepted network connections.
                </Typography>
              </Box>

              {connectionCards.length === 0 && (
                <Box sx={{ p: 3, bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: 3 }}>
                  <Typography sx={{ color: '#64748b' }}>
                    You do not have any accepted connections yet.
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {connectionCards.map((connection) => (
                  <ProfileCard
                    key={connection.id}
                    name={connection.name}
                    headline={connection.headline}
                    mutuals={connection.mutuals}
                    avatarSrc={connection.avatarSrc}
                    actionLabel="Remove Connection"
                    onAction={() => handleRemove(connection.id)}
                    actionLoading={removeActionId === connection.id}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
