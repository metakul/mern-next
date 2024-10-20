import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatResponse } from '@/lib/slices/Chatgpt/ChatgptApiSlice';
import { selectChatMessages, selectLoading } from '@/lib/slices/Chatgpt/ChatGptSlice';
import { AppDispatch } from '@/lib/store';
import { TextField, Button, Typography, Box, Paper, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { parseMessageContent } from '@/scripts/handleBlogCss';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bootm';
import { getColors } from '@/layout/Theme/themes'; // Import your color utility

const ChatGPTClone = () => {
  const [input, setInput] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const messages = useSelector(selectChatMessages);

  const colors = getColors(); // Get the current theme colors
  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>();

  const handleSendMessage = () => {
    if (!input.trim()) return; 
    dispatch(fetchChatResponse(input));
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if Shift is NOT pressed
      e.preventDefault(); // Prevent new line in textarea
      handleSendMessage();
    }
  };

  return (
    <div style={{ margin: 'auto', padding: '20px' }}>
      <Paper
        ref={containerRef}
        elevation={3}
        style={{
          height: "65vh",
          overflowY: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: colors.secondary[900], // Background based on theme
          color: colors.primary[100], // Primary color for text
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          style={{ 
            marginBottom: '16px', 
            textAlign: 'center', 
            color: colors.grey[400], // Typography color based on theme
          }}
        >
          Chat with AI
        </Typography>
        <Box>
          {messages.map((message, index) => (
            <Box
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                margin: '8px 0',
                textAlign: message.role === 'user' ? 'right' : 'left',
              }}
            >
              {message.role === 'user' ? (
                <Avatar style={{ marginLeft: 'auto', marginRight: '8px', backgroundColor: colors.primary[500] }}>
                  ME
                </Avatar>
              ) : (
                <Avatar style={{ marginRight: '8px', backgroundColor: colors.secondary[500] }}>
                  AI
                </Avatar>
              )}
              <Box
                style={{
                  maxWidth: '75%',
                  wordWrap: 'break-word',
                  padding: '8px',
                  borderRadius: '20px',
                  backgroundColor: message.role === 'user' ? colors.primary[900] : colors.secondary[800],
                  color: message.role === 'user' ? colors.grey[100] : colors.grey[100],
                  boxShadow: message.role === 'user' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                {parseMessageContent(message.content).map((part, index) => 
                  typeof part === 'string' ? (
                    <span key={index}>{part}</span>
                  ) : (
                    part
                  )
                )}
              </Box>
            </Box>
          ))}
          {loading && (
            <Typography variant="body2" style={{ textAlign: 'center', marginTop: '8px', color: colors.grey[400] }}>
              Loading response...
            </Typography>
          )}
          <div ref={endRef} /> {/* Scroll to bottom */}
        </Box>
      </Paper>
      <Box style={{ marginTop: '16px', display: 'flex' }}>
        <TextField
          variant="outlined"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ flexGrow: 1, marginRight: '8px', backgroundColor: colors.grey[900], color: colors.primary[500] }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  style={{ 
                    height: '100%', 
                    backgroundColor: colors.blueAccent[500], 
                    color: colors.grey[100] 
                  }}
                >
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
};

export default ChatGPTClone;
