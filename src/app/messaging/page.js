'use client';

import { Box } from '@mui/material';
import { ConversationList, ChatWindow, SidebarNav } from '@/components/messaging';

export default function messaging() {
  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 52px)', width: '100%', overflow: 'hidden' }}>
      <SidebarNav />
      <ConversationList />
      <ChatWindow />
    </Box>
  );
}