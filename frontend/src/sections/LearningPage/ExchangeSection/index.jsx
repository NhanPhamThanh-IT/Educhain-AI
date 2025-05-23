import { Box, Typography, Grid, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const ExchangeSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Exchange
      </Typography>
      <Grid container spacing={3}>
        {/* Add your exchange content here */}
        <Grid item xs={12}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[2],
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random/800x400?exchange"
              alt="Exchange"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Coming Soon
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The exchange section is under development. Stay tuned for trading features!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExchangeSection; 