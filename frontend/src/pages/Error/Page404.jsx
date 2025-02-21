import { motion } from 'framer-motion';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Hiệu ứng cho toàn trang: fade-in & scale
const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: 'easeIn' } },
};

// Hiệu ứng nền gradient chuyển động mượt mà
const backgroundVariants = {
    animate: {
        background: [
            "linear-gradient(45deg, #FE6B8B, #FF8E53)",
            "linear-gradient(45deg, #2196F3, #21CBF3)",
            "linear-gradient(45deg, #66BB6A, #43A047)"
        ],
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
        },
    },
};

// Hiệu ứng xoay và scale cho icon
const iconVariants = {
    animate: {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        transition: {
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        },
    },
};

export default function Artistic404() {
    return (
        <Page title="Page Not Found">
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {/* Nền gradient động */}
                <motion.div
                    variants={backgroundVariants}
                    animate="animate"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                    }}
                />
                <Box textAlign="center" sx={{ px: 3 }}>
                    {/* Icon với hiệu ứng xoay và scale */}
                    <motion.div variants={iconVariants} animate="animate">
                        <ErrorOutlineIcon sx={{ fontSize: { xs: 80, md: 120 }, color: 'white' }} />
                    </motion.div>
                    <Typography variant="h2" sx={{ mt: 3, fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
                        404
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white', mt: 1, mb: 4, textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                        Oops! Page Not Found.
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'white',
                            color: 'black',
                            '&:hover': { bgcolor: '#f0f0f0' },
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </motion.div>
        </Page>
    );
}
