import {
  Routes,
  Route
} from 'react-router-dom';
import {
  Suspense,
  lazy
} from 'react';
import {
  CircularProgress,
  Box
} from '@mui/material';

import LoginLayout from '@components/layouts/LoginLayout';
import NotLoginLayout from '@components/layouts/NotLoginLayout';

// Replace direct imports with lazy imports
const Home = lazy(() => import('@pages/NotLoginPages/Home/index'));
const Docs = lazy(() => import('@pages/NotLoginPages/Docs/index'));
const DepositAndEarn = lazy(() => import('@pages/NotLoginPages/DepositAndEarn/index'));
const About = lazy(() => import('@pages/NotLoginPages/AboutUs/index'));
const Profile = lazy(() => import('@pages/LoginPages/Profile'));
const Settings = lazy(() => import('@pages/LoginPages/Settings'));
const NotFound = lazy(() => import('@pages/ErrorPages/NotFound'));

// Loading component using MUI
const LoadingComponent = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <CircularProgress color="primary" size={50} thickness={4} />
  </Box>
);

// Wrapper component for lazy loading
const LazyLoad = ({ component: Component }) => (
  <Suspense fallback={<LoadingComponent />}>
    <Component />
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<NotLoginLayout />}>
        <Route path="/" element={<LazyLoad component={Home} />} />
        <Route path="/home" element={<LazyLoad component={Home} />} />
        <Route path="/docs" element={<LazyLoad component={Docs} />} />
        <Route path="/deposit-and-earn" element={<LazyLoad component={DepositAndEarn} />} />
        <Route path="/about" element={<LazyLoad component={About} />} />
      </Route>

      <Route element={<LoginLayout />}>
        <Route path="/profile" element={<LazyLoad component={Profile} />} />
        <Route path="/settings" element={<LazyLoad component={Settings} />} />
      </Route>

      <Route path="*" element={<LazyLoad component={NotFound} />} />
    </Routes>
  );
};

export default AppRoutes;
