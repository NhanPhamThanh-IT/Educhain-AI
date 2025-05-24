import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Button,
    useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import image1 from "@assets/homepage-hero-section-1.jpg"
import image2 from "@assets/homepage-hero-section-2.jpg"
import image3 from "@assets/homepage-hero-section-3.jpg"
import image4 from "@assets/homepage-hero-section-4.jpg"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const StyledBox = styled(Box)(() => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

const GradientText = styled(Typography)(() => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
}));

const Introduction = () => {
    const theme = useTheme();
    const [leftRef, leftInView] = useInView({ threshold: 0.1, triggerOnce: false });
    const [middleRef, middleInView] = useInView({ threshold: 0.1, triggerOnce: false });
    const [rightRef, rightInView] = useInView({ threshold: 0.1, triggerOnce: false });
    const navigate = useNavigate();
    const singleToastId = 'user-auth-toast'; // Define a consistent ID for the toast

    const handleGetStartedClick = () => {
        navigate("/learning/course");
        // if (localStorage.getItem('address')) {
        //     navigate("/learning/course");
        // } 
        // else {
        //     toast.error('Please connect wallet to continue!', {
        //         id: singleToastId,
        //         style: {
        //             borderRadius: '10px',
        //             background: '#333',
        //             color: '#fff',
        //         },
        //     });
        // }
    }

    const handleLearnMoreClick = () => {
        navigate("/docs");
    }
    return (
        <StyledBox>
            <Toaster />
            <Container maxWidth="xl">
                <Grid container spacing={4} alignItems="center">
                    {/* Left Column - Images */}
                    <Grid item xs={12} md={3} ref={leftRef}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            p: 2
                        }}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image1}
                                        alt="EduChain AI Platform"
                                        loading="lazy"
                                        decoding="async"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '35vh',
                                            maxWidth: '100%',
                                            borderRadius: '16px',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                            border: '4px solid transparent',
                                            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196F3 30%, #03A9F4 90%) border-box',
                                            backgroundClip: 'padding-box, border-box',
                                            backgroundOrigin: 'padding-box, border-box',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 12px 48px rgba(33, 150, 243, 0.2)',
                                            }
                                        }}
                                    />
                                </Box>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image2}
                                        alt="EduChain AI Platform"
                                        loading="lazy"
                                        decoding="async"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '35vh',
                                            maxWidth: '100%',
                                            borderRadius: '16px',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                            border: '4px solid transparent',
                                            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #00BCD4 30%, #4DD0E1 90%) border-box',
                                            backgroundClip: 'padding-box, border-box',
                                            backgroundOrigin: 'padding-box, border-box',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 12px 48px rgba(0, 188, 212, 0.2)',
                                            }
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Box>
                    </Grid>

                    {/* Middle Column - Content */}
                    <Grid item xs={12} md={6} ref={middleRef}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={middleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: 2
                            }}>
                                <GradientText variant="h1" gutterBottom>
                                    EduChain AI
                                </GradientText>
                                <Typography variant="h4" color="text.secondary" paragraph>
                                    Revolutionizing Education with Blockchain Technology
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: '80%' }}>
                                    Experience the future of education with our decentralized learning platform.
                                    Secure, transparent, and powered by cutting-edge AI technology.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white',
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                                            },
                                        }}
                                         onClick={handleGetStartedClick}
                                    >
                                        Get Started
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            textTransform: 'none',
                                            borderColor: theme.palette.primary.main,
                                            color: theme.palette.primary.main,
                                        }}
                                          onClick={handleLearnMoreClick}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Right Column - Images */}
                    <Grid item xs={12} md={3} ref={rightRef}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            p: 2
                        }}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image3}
                                        alt="EduChain AI Platform"
                                        loading="lazy"
                                        decoding="async"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '35vh',
                                            maxWidth: '100%',
                                            borderRadius: '16px',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                            border: '4px solid transparent',
                                            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #3F51B5 30%, #5C6BC0 90%) border-box',
                                            backgroundClip: 'padding-box, border-box',
                                            backgroundOrigin: 'padding-box, border-box',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 12px 48px rgba(63, 81, 181, 0.2)',
                                            }
                                        }}
                                    />
                                </Box>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={image4}
                                        alt="EduChain AI Platform"
                                        loading="lazy"
                                        decoding="async"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '35vh',
                                            maxWidth: '100%',
                                            borderRadius: '16px',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                            border: '4px solid transparent',
                                            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #009688 30%, #4DB6AC 90%) border-box',
                                            backgroundClip: 'padding-box, border-box',
                                            backgroundOrigin: 'padding-box, border-box',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                boxShadow: '0 12px 48px rgba(0, 150, 136, 0.2)',
                                            }
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </StyledBox>
    );
};

export default Introduction;