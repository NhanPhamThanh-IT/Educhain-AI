import React, { Suspense } from 'react';
import { Box, Container, Grid, Typography, Paper, useTheme, CircularProgress } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, School } from 'lucide-react';

const HeroSection = () => {
    const theme = useTheme();
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        }>
            <Box ref={ref} sx={{
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
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
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
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
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
                                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                                >
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: 3,
                                                            borderRadius: 2,
                                                            background: 'rgba(255, 255, 255, 0.9)',
                                                            backdropFilter: 'blur(10px)',
                                                            position: 'relative',
                                                            '&::before': {
                                                                content: '""',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                borderRadius: 2,
                                                                padding: '1px',
                                                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                                WebkitMaskComposite: 'xor',
                                                                maskComposite: 'exclude',
                                                                pointerEvents: 'none'
                                                            },
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
        </Suspense>
    )
}

export default HeroSection;