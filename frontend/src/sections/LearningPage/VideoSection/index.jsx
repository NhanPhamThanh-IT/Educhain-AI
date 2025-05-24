import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  CircularProgress,
  Link,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

const suggestionChips = [
  "Create a video about React hooks",
  "Explain JavaScript promises",
  "Make a tutorial about CSS Grid",
  "Create a video about Node.js basics",
];

const VideoSection = ({ selectedHistory }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDownloadLink, setShowDownloadLink] = useState(false);

  useEffect(() => {
    console.log('VideoSection mounted/updated with selectedHistory:', selectedHistory);
    console.log('Current URL params:', searchParams.toString());
  }, [selectedHistory, searchParams]);

  const handleSubmit = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    // Simulate API call with 15s delay
    await new Promise(resolve => setTimeout(resolve, 15000));
    setIsLoading(false);
    setShowDownloadLink(true);
  };

  const handleCreateVideo = () => {
    const newParams = new URLSearchParams();
    newParams.set('section', 'learningByVideo');
    newParams.set('historyItem', 'create-video');
    navigate(`/learning/course?${newParams.toString()}`);
  };

  const renderOverview = () => (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Learning by Video
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create engaging educational videos using our AI-powered video generation tool. Simply enter a prompt and let our system create a comprehensive video for you.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Video
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generate a new educational video by providing a prompt. Our AI will create a comprehensive video based on your request.
              </Typography>
              <Button
                variant="contained"
                onClick={handleCreateVideo}
                sx={{ mt: 2 }}
              >
                Create Video
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Videos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No videos created yet. Start by creating your first video!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderCreateVideo = () => (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Create Learning Video
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Enter a prompt to generate an educational video. Our AI will create a comprehensive video based on your request.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Suggestions:
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          {suggestionChips.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              onClick={() => setPrompt(suggestion)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!prompt || isLoading}
          sx={{ width: '100%' }}
        >
          Generate Video
        </Button>
      </Paper>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <CircularProgress size={60} thickness={4} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Creating your video...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This may take a few moments
              </Typography>
            </Box>
          </motion.div>
        )}

        {showDownloadLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Your video is ready!
              </Typography>
              <Link
                href="https://drive.google.com/drive/folders/194qEqxzPZTZe6dKQcMGl9kbz5YHlDdGn?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  display: 'inline-block',
                  mt: 2,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                <Button variant="contained" color="primary" size="large">
                  Download Video
                </Button>
              </Link>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );

  // Check both selectedHistory prop and URL params
  const shouldShowCreateVideo = selectedHistory === 'create-video' || searchParams.get('historyItem') === 'create-video';
  
  if (shouldShowCreateVideo) {
    return renderCreateVideo();
  }
  
  return renderOverview();
};

export default VideoSection; 