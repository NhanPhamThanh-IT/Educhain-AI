import { Suspense, memo } from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * A wrapper component for lazy loading other components
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to lazy load
 * @param {number} [props.size=40] - The size of the loading spinner
 * @param {number} [props.height=200] - The height of the loading container
 */
const LazyLoadWrapper = memo(({ children, size = 40, height = 200 }) => {
  return (
    <Suspense fallback={
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height, 
        width: '100%' 
      }}>
        <CircularProgress size={size} />
      </Box>
    }>
      {children}
    </Suspense>  );
});

export default LazyLoadWrapper;
