import { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, useTheme, Grid, Paper } from '@mui/material';
import PricingTable from './table-components/index';
import { deposits, earns } from './constants';
import { GraduationCap, BookOpen, School, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            <Box sx={{
                mt: 4,
                pt: { xs: 8, md: 12 },
                pb: { xs: 6, md: 8 },
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 800,
                                        background: `linear-gradient(45deg, #1976d2, #42a5f5)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        mb: 2,
                                        lineHeight: 1.2
                                    }}
                                >
                                    Invest in Your Educational Future
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 4,
                                        lineHeight: 1.6,
                                        fontWeight: 400
                                    }}
                                >
                                    Choose the perfect investment plan to support your educational journey. Our transparent pricing ensures you make informed decisions for your academic success.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <GraduationCap size={48} color={theme.palette.primary.main} />
                                    </motion.div>
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                        Start Your Educational Investment
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        background: 'transparent',
                                    }}
                                >
                                    <Grid container spacing={3}>
                                        {[
                                            {
                                                title: 'Academic Excellence',
                                                icon: <GraduationCap size={32} color={theme.palette.primary.main} />,
                                                description: 'Invest in programs designed to enhance your academic performance and future career prospects.'
                                            },
                                            {
                                                title: 'Flexible Learning',
                                                icon: <BookOpen size={32} color={theme.palette.primary.main} />,
                                                description: 'Access educational resources and support systems that adapt to your learning style and schedule.'
                                            },
                                            {
                                                title: 'Expert Guidance',
                                                icon: <School size={32} color={theme.palette.primary.main} />,
                                                description: 'Receive personalized mentorship and guidance from experienced educators and industry professionals.'
                                            }
                                        ].map((feature, index) => (
                                            <Grid item xs={12} key={index}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                                >
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: 3,
                                                            borderRadius: 2,
                                                            background: 'rgba(255, 255, 255, 0.9)',
                                                            backdropFilter: 'blur(10px)',
                                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                transform: 'translateY(-5px)',
                                                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                            {feature.icon}
                                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                {feature.title}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {feature.description}
                                                        </Typography>
                                                    </Paper>
                                                </motion.div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

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
