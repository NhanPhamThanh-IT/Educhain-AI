import { lazy, Suspense } from 'react';
import { Box, useTheme, CircularProgress } from '@mui/material';

const HeroSection = lazy(() => import('./HeroSection'));
const PricingSection = lazy(() => import('./PricingSection'));

const Main = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            minHeight: '100vh',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: 'radial-gradient(circle at top right, rgba(25, 118, 210, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }
        }}>
            {/* Hero Section */}
            <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <CircularProgress />
                </Box>
            }>
                <HeroSection />
            </Suspense>

            {/* Pricing Tabs Section */}
            <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <CircularProgress />
                </Box>
            }>
                <PricingSection />
            </Suspense>
        </Box>
    );
};

export default Main;
