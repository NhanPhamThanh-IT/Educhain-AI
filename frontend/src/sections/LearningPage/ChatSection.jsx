import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaUser, FaRobot } from 'react-icons/fa';

const ChatSection = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Hello! How can I help you with your learning today?',
      timestamp: '10:00 AM',
    },
    {
      id: 2,
      sender: 'user',
      message: 'I have a question about the last lesson.',
      timestamp: '10:01 AM',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        sender: 'user',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatHistory.length + 2,
          sender: 'bot',
          message: 'I understand your question. Let me help you with that.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatHistory(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ p: 3, mb: 3, borderRadius: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Chat with AI Assistant
          </Typography>
          
          {/* Chat Messages */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, maxHeight: '60vh' }}>
            <List>
              {chatHistory.map((chat) => (
                <ListItem
                  key={chat.id}
                  sx={{
                    flexDirection: chat.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: chat.sender === 'user' ? theme.palette.primary.main : theme.palette.secondary.main,
                      }}
                    >
                      {chat.sender === 'user' ? <FaUser /> : <FaRobot />}
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: chat.sender === 'user' ? theme.palette.primary.light : theme.palette.grey[100],
                      borderRadius: 2,
                      p: 2,
                      ml: chat.sender === 'user' ? 0 : 2,
                      mr: chat.sender === 'user' ? 2 : 0,
                    }}
                  >
                    <Typography variant="body1">{chat.message}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      {chat.timestamp}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Message Input */}
          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{
                px: 4,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ChatSection; 