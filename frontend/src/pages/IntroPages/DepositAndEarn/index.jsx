import { useState, lazy, Suspense } from 'react';
import { Container, Box, Tabs, Tab, useTheme, Paper, CircularProgress } from '@mui/material';
import PricingTable from './table-components/index';
import { deposits, earns } from './constants';
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = lazy(() => import('./HeroSection'));

const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const Main = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const theme = useTheme();

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

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
            <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'transparent' }}>
                <Container maxWidth="lg">
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Tabs
                            value={currentTab}
                            onChange={handleTabChange}
                            centered
                            indicatorColor="transparent"
                            sx={{
                                mb: 4,
                                "& .MuiTab-root": {
                                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                                    fontWeight: 600,
                                    textTransform: "none",
                                    minWidth: { xs: 100, md: 120 },
                                    border: "2px solid",
                                    borderColor: 'primary.main',
                                    borderRadius: 50,
                                    transition: "all 0.3s ease",
                                    color: 'primary.main',
                                    marginRight: 2,
                                    px: 3,
                                    py: 1.5,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    "&:last-child": {
                                        marginRight: 0,
                                    },
                                    "&:hover": {
                                        bgcolor: 'primary.light',
                                        color: 'white',
                                        borderColor: 'primary.light',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    }
                                },
                                "& .MuiTabs-indicator": {
                                    display: "none",
                                },
                                "& .Mui-selected": {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    borderColor: 'primary.main',
                                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                                },
                            }}
                        >
                            <Tab label="Investment Plans" />
                            <Tab label="Scholarship Options" />
                        </Tabs>

                        <AnimatePresence mode="wait">
                            {currentTab === 0 && (
                                <motion.div
                                    key="tab-0"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={tabVariants}
                                >
                                    <PricingTable {...deposits} />
                                </motion.div>
                            )}
                            {currentTab === 1 && (
                                <motion.div
                                    key="tab-1"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={tabVariants}
                                >
                                    <PricingTable {...earns} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default Main;
