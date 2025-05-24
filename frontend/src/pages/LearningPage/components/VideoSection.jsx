import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoLibrary as VideoIcon } from '@mui/icons-material';

const VideoSection = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const suggestions = [
    "Create a video about React hooks",
    "Explain JavaScript promises",
    "Show how to use Redux in React",
    "Demonstrate CSS Grid layout",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call with 15s delay
    setTimeout(() => {
      setLoading(false);
      // Replace this with your actual Google Drive FILE ID (not folder!)
      setVideoLink('https://drive.google.com/file/d/15JaHu-HrweuVi0XV0tYDcmbhUGYyx98K/preview');

    }, 15000);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <VideoIcon sx={{ color: '#FB923C' }} />
        Learning by Video
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Create Learning Video
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Suggested prompts:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {suggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                onClick={() => setPrompt(suggestion)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#FB923C20',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!prompt || loading}
            sx={{
              backgroundColor: '#FB923C',
              '&:hover': {
                backgroundColor: '#EA580C',
              },
            }}
          >
            Generate Video
          </Button>
        </form>
      </Paper>

      <AnimatePresence>
      {loading && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    style={{ textAlign: 'center', padding: '2rem' }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#FB923C',
          }}
        />
      ))}
    </Box>
  </motion.div>
)}


        {videoLink && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom textAlign="center">
                Your video is ready!
              </Typography>
              <Box sx={{ mt: 2 }}>
                <iframe
                  src={videoLink}
                  width="100%"
                  height="480"
                  allow="autoplay"
                  style={{ border: 'none', borderRadius: 8 }}
                />
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default VideoSection;
