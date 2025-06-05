import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Lazy load routes
const AppRoutes = lazy(() => import('@routes'));

// App-level loading component
const AppLoading = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    bgcolor: '#f5f5f5' 
  }}>
    <CircularProgress size={60} thickness={4} color="primary" />
  </Box>
);

const App = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
