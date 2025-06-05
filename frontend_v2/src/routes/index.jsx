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
import { MAIN_ROUTES } from '@constants/routesPath';

// Layouts
import LoginLayout from '@components/layouts/LoginLayout';
import NotLoginLayout from '@components/layouts/NotLoginLayout';

// Not Login pages
const Home = lazy(() => import('@pages/NotLoginPages/Home/index'));
const Docs = lazy(() => import('@pages/NotLoginPages/Docs/index'));
const DepositAndEarn = lazy(() => import('@pages/NotLoginPages/DepositAndEarn/index'));
const About = lazy(() => import('@pages/NotLoginPages/AboutUs/index'));

// Login pages
const MyCourses = lazy(() => import('@pages/LoginPages/MyCourses'));
const CreateCourse = lazy(() => import('@pages/LoginPages/CreateCourse'));
const Market = lazy(() => import('@pages/LoginPages/Market'));
const Missions = lazy(() => import('@pages/LoginPages/Missions'));
const Leaderboard = lazy(() => import('@pages/LoginPages/Leaderboard'));
const ExchangeCoin = lazy(() => import('@pages/LoginPages/ExchangeCoin'));
const Profile = lazy(() => import('@pages/LoginPages/Profile'));
const Settings = lazy(() => import('@pages/LoginPages/Settings'));

// Error page
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
        <Route path={MAIN_ROUTES.root} element={<LazyLoad component={Home} />} />
        <Route path={MAIN_ROUTES.home} element={<LazyLoad component={Home} />} />
        <Route path={MAIN_ROUTES.docs} element={<LazyLoad component={Docs} />} />
        <Route path={MAIN_ROUTES.depositAndEarn} element={<LazyLoad component={DepositAndEarn} />} />
        <Route path={MAIN_ROUTES.about} element={<LazyLoad component={About} />} />
      </Route>

      <Route element={<LoginLayout />}>
        <Route path={MAIN_ROUTES.myCourses} element={<LazyLoad component={MyCourses} />} />
        <Route path={MAIN_ROUTES.createCourse} element={<LazyLoad component={CreateCourse} />} />
        <Route path={MAIN_ROUTES.market} element={<LazyLoad component={Market} />} />
        <Route path={MAIN_ROUTES.missions} element={<LazyLoad component={Missions} />} />
        <Route path={MAIN_ROUTES.leaderboard} element={<LazyLoad component={Leaderboard} />} />
        <Route path={MAIN_ROUTES.exchangeCoin} element={<LazyLoad component={ExchangeCoin} />} />
        <Route path={MAIN_ROUTES.profile} element={<LazyLoad component={Profile} />} />
        <Route path={MAIN_ROUTES.settings} element={<LazyLoad component={Settings} />} />
      </Route>

      <Route path={MAIN_ROUTES.notFound} element={<LazyLoad component={NotFound} />} />
    </Routes>
  );
};

export default AppRoutes;
