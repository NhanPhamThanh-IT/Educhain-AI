import React from 'react';
import { Box, Grid, Stack, Container, Typography, useTheme, Card, CardContent, IconButton, Avatar, Chip } from '@mui/material';
import { Facebook, GitHub, LinkedIn } from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import teamMembers from './teamMembers';

// Không cần hàm xử lý đường dẫn hình ảnh nữa vì chúng ta đã import trực tiếp trong teamMembers.js

// Hàm để xử lý đường dẫn hình ảnh
const getImagePath = (imagePath) => {
    if (!imagePath) return '';

    // Nếu đường dẫn bắt đầu với @assets, thay thế bằng định dạng import động
    if (imagePath.startsWith('@assets/')) {
        try {
            // Sử dụng import.meta.url để xử lý đúng đường dẫn trong Vite
            const path = imagePath.replace('@assets/', '/src/assets/');
            return new URL(path, import.meta.url).href;
        } catch (error) {
            console.error('Error loading image:', error);
            return '';
        }
    }

    return imagePath;
};

// Defining the MemberCard component
const MemberCard = ({ member }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
        >
            <Card
                sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    background: "#ffffff",
                    border: "2px solid transparent",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "inherit",
                        padding: "2px",
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none",
                    },
                    "&:hover": {
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        borderRadius: "20px",
                    },
                }}
            >
                <CardContent sx={{ position: "relative", zIndex: 2, p: 3 }}>
                    {/* Member Image */}
                    <Box
                        sx={{
                            position: "relative",
                            width: 150,
                            height: 150,
                            mx: "auto",
                            mb: 2,
                        }}
                    >                        <Avatar
                            src={member.image}
                            alt={member.name}
                            sx={{
                                width: "100%",
                                height: "100%",
                                border: "4px solid #fff",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            }}
                        />
                    </Box>

                    {/* Member Info */}
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                mb: 1,
                            }}
                        >
                            {member.name}
                        </Typography>
                        <Chip
                            label={member.role}
                            sx={{
                                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                                color: "#fff",
                                fontWeight: 600,
                                mb: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                mt: 1,
                                lineHeight: 1.6,
                            }}
                        >
                            {member.experience}
                        </Typography>
                    </Box>

                    {/* Social Links */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        {member.facebook && (
                            <IconButton
                                href={member.facebook}
                                target="_blank"
                                sx={{
                                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                                    color: "#fff",
                                    "&:hover": {
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                <Facebook />
                            </IconButton>
                        )}
                        {member.github && (
                            <IconButton
                                href={member.github}
                                target="_blank"
                                sx={{
                                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                                    color: "#fff",
                                    "&:hover": {
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                <GitHub />
                            </IconButton>
                        )}
                        {member.linkedin && (
                            <IconButton
                                href={member.linkedin}
                                target="_blank"
                                sx={{
                                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                                    color: "#fff",
                                    "&:hover": {
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                <LinkedIn />
                            </IconButton>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const TeamIntroduction = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const theme = useTheme();

    return (
        <Box
            ref={ref}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                py: 8,
                background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `radial-gradient(circle at top right, ${theme.palette.primary.main}08 0%, transparent 70%)`,
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    alignItems="center"
                    textAlign="center"
                    spacing={4}
                    sx={{ mb: 8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                mb: 2,
                                lineHeight: 1.2,
                            }}
                        >
                            Our Team
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.secondary',
                                maxWidth: '800px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontWeight: 400,
                            }}
                        >
                            We are a team of passionate developers and AI enthusiasts from the University of Science,
                            Vietnam National University, Ho Chi Minh City. Our diverse expertise in Software Engineering
                            and Artificial Intelligence drives us to create innovative solutions that make a difference.
                        </Typography>
                    </motion.div>
                </Stack>

                <Grid container spacing={4} justifyContent="center">
                    {teamMembers.map((member, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <MemberCard member={member} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TeamIntroduction;
