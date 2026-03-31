'use client';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { ChatWindow, ConversationList, SidebarNav } from '@/components/messaging';
import { demoConversations } from '@/components/messaging/ConversationList';

export default function MessagingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(demoConversations[0]);

  const conversations = useMemo(() => demoConversations, []);

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 52px)',
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 46%, #f8f5ff 100%)',
        p: { xs: 0, md: 1.5 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          borderRadius: { xs: 0, md: 6 },
          border: { xs: 'none', md: '1px solid rgba(255,255,255,0.5)' },
          background: 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.48) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: { xs: 'none', md: '0 28px 60px rgba(15,23,42,0.08)' },
        }}
      >
      <SidebarNav />
      <ConversationList
        conversations={conversations}
        selectedId={selectedConversation?.id}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectConversation={setSelectedConversation}
      />
      <ChatWindow conversation={selectedConversation} />
      </Box>
    </Box>
  );
}
