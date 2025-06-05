import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

// Loading component for lazy-loaded elements
const LazyComponentLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
    <CircularProgress size={30} />
  </Box>
);

const UserLayoutA = () => (
  <>
    <Suspense fallback={<LazyComponentLoader />}>
      <Header />
    </Suspense>
    <Outlet />
    <Suspense fallback={<LazyComponentLoader />}>
      <Footer />
    </Suspense>
  </>
);

export default UserLayoutA; 