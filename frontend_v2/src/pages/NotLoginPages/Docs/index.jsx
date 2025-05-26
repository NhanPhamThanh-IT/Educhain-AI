// filepath: c:\\Users\\NhanPham\\Desktop\\Educhain-AI\\frontend\\src\\pages\\IntroPages\\DocsPage\\index.jsx
import { Container, Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Fade } from '@mui/material'; // Added Fade
import { features } from './constants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArticleIcon from '@mui/icons-material/Article'; // Added for a more "docs" feel
import { motion } from 'framer-motion'; // Import framer-motion

const DocsPage = () => {
    return (
        <Box sx={{
            background: 'linear-gradient(180deg, #f0f2f5 0%, #ffffff 30%)', // Subtle gradient background
            minHeight: '100vh',
            pt: { xs: 10, md: 12 }, // Adjusted padding top
            pb: 8,
            mt: { xs: 0, md: 6 }
        }}>
            <Container maxWidth="lg">
                <Fade in={true} timeout={800}>
                    <Box> {/* This Box is the direct child of Fade for the animation to apply correctly */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 8 }}>
                                <ArticleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                                    Educhain AI Documentation
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ color: 'text.secondary', maxWidth: '700px', margin: '0 auto' }}>
                                    Explore the comprehensive features of the Educhain AI platform. Our documentation provides detailed insights into how each component works to deliver a seamless and intelligent learning experience.
                                </Typography>
                            </Box>
                        </motion.div>
                        <Grid container spacing={5}>
                            {features.map((feature, index) => (
                                <Grid size={{ xs: 12, md: 6 }} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                                        style={{ height: '100%' }} // Ensure motion.div takes full height for Card
                                    >
                                        <Card sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 3,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            border: '2px dashed #1565c0',
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-6px)',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                            }
                                        }}>
                                            <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, md: 3.5 } }}>
                                                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: '600', color: 'primary.main', mb: 3, borderBottom: '2px solid', borderColor: 'primary.light', pb: 1 }}>
                                                    {feature.title}
                                                </Typography>
                                                {feature.items.map((item, itemIndex) => (
                                                    <Box key={itemIndex} sx={{ mb: 3 }}>
                                                        <Typography variant="h6" component="h3" sx={{ fontWeight: '500', color: 'text.primary', mb: 1.5, display: 'flex', alignItems: 'center' }}>
                                                            {item.name}
                                                        </Typography>
                                                        <List dense sx={{ pl: 1 }}>
                                                            {item.description.map((desc, descIndex) => (
                                                                <ListItem key={descIndex} sx={{ py: 0.3, alignItems: 'flex-start' }}>
                                                                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1.2, mt: 0.5, color: 'success.dark' }}>
                                                                        <CheckCircleOutlineIcon fontSize="small" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={desc}
                                                                        primaryTypographyProps={{ variant: 'body1', color: 'text.secondary', lineHeight: 1.6 }}
                                                                    />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </Box>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Fade>
            </Container>
        </Box>
    )
};

export default DocsPage;