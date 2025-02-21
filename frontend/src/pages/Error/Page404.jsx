import { motion, useAnimation } from 'framer-motion';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect } from 'react';

/**
 * Variants for page transition animations.
 */
const pageVariants = {
    initial: { opacity: 0, scale: 0.8, rotateY: -20 },
    animate: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, rotateY: 20, transition: { duration: 0.5, ease: 'easeIn' } },
};

/**
 * Variants for the animated background gradient.
 */
const backgroundVariants = {
    animate: {
        background: [
            "linear-gradient(135deg, #2c3e50, #34495e)",
            "linear-gradient(135deg, #232526, #414345)",
            "linear-gradient(135deg, #2c3e50, #4ca1af)"
        ],
        transition: { duration: 30, repeat: Infinity, repeatType: 'mirror', ease: "linear" }
    }
};

/**
 * Variants for the animated radial gradient overlay.
 */
const radialVariants = {
    animate: {
        background: [
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3), transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4), transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3), transparent 70%)"
        ],
        transition: { duration: 25, repeat: Infinity, repeatType: 'mirror', ease: "linear" }
    }
};

/**
 * Variants for the container animation used to stagger child animations.
 */
const containerVariants = { animate: { transition: { staggerChildren: 0.3 } } };

/**
 * Variants for the animated error icon.
 */
const iconVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: -30, y: 0 },
    animate: {
        opacity: 1,
        scale: [1.1, 0.9, 1],
        rotate: [0, 360],
        y: [0, -5, 0],
        transition: { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
    }
};

/**
 * Variants for the button hover effect.
 */
const buttonVariants = {
    hover: {
        scale: 1.05,
        boxShadow: "0 0 15px rgba(255,255,255,0.5)",
        transition: { duration: 0.3 }
    }
};

/**
 * Particles component.
 *
 * Generates multiple animated particle divs.
 *
 * @returns {React.Fragment} A fragment containing particle elements.
 */
function Particles() {
    const particleCount = 25;
    const particles = Array.from({ length: particleCount }).map((_, index) => (
        <motion.div
            key={index}
            style={{
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
                width: 8 + Math.random() * 12,
                height: 8 + Math.random() * 12,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
            }}
            animate={{
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0]
            }}
            transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    ));
    return <>{particles}</>;
}

/**
 * GlitchText component.
 *
 * Applies a glitch effect to text by layering three animated copies.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Text content to display.
 * @param {object} props.style - Custom styles for the text.
 * @returns {JSX.Element} The glitch text element.
 */
function GlitchText({ children, style, ...props }) {
    return (
        <Box position="relative" display="inline-block" {...props}>
            {/* Top layer: clipped to display the top half with a slight left shift */}
            <motion.div
                style={{
                    ...style,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: '#7f8c8d',
                    clipPath: 'inset(0 0 50% 0)'
                }}
                animate={{ x: [0, -2, 0, 2, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
            {/* Bottom layer: clipped to display the bottom half with a slight right shift */}
            <motion.div
                style={{
                    ...style,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: '#95a5a6',
                    clipPath: 'inset(50% 0 0 0)'
                }}
                animate={{ x: [0, 2, 0, -2, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
            {/* Main layer: the original text with a slight scaling animation */}
            <motion.div
                style={style}
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
        </Box>
    );
}

/**
 * Sad404 component.
 *
 * Renders a custom 404 error page with animated background, particle effects,
 * glitch text, and a back-to-home button.
 *
 * @returns {JSX.Element} The 404 error page.
 */
export default function Sad404() {
    const controls = useAnimation();

    // Start the animations when the component mounts.
    useEffect(() => {
        controls.start("animate");
    }, [controls]);

    return (
        <Page title="404 Not Found">
            <motion.div
                variants={pageVariants}
                style={{
                    position: 'relative',
                    height: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: 1500
                }}
            >
                {/* Animated background layers */}
                <motion.div
                    variants={backgroundVariants}
                    animate="animate"
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '-10%',
                        width: '120%',
                        height: '120%',
                        filter: 'blur(12px)',
                        zIndex: -4
                    }}
                />
                <motion.div
                    variants={radialVariants}
                    animate="animate"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -3,
                        mixBlendMode: 'screen'
                    }}
                />
                <motion.div
                    variants={backgroundVariants}
                    animate="animate"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.4,
                        zIndex: -2
                    }}
                />

                {/* Particle effects */}
                <Particles />

                {/* Main content container */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: 600,
                        width: '90%',
                        textAlign: 'center',
                        mx: 'auto',
                        px: 2
                    }}
                >
                    <motion.div variants={containerVariants} initial="initial" animate="animate">
                        {/* Animated error icon */}
                        <Box mb={3}>
                            <motion.div variants={iconVariants} initial="initial" animate="animate">
                                <ErrorOutlineIcon
                                    sx={{
                                        fontSize: { xs: 90, md: 140 },
                                        color: 'white',
                                        opacity: 0.8
                                    }}
                                />
                            </motion.div>
                        </Box>
                        {/* Glitch effect title text */}
                        <Box mb={2}>
                            <GlitchText
                                style={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textShadow: '2px 2px 6px rgba(0,0,0,0.9)'
                                }}
                            >
                                404: Page Not Found
                            </GlitchText>
                        </Box>
                        {/* Description text */}
                        <Box mb={4}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'white',
                                    fontStyle: 'italic',
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
                                }}
                            >
                                We're sorry... the page you are looking for has vanished into the darkness.
                            </Typography>
                        </Box>
                        {/* Back to Home button with hover animation */}
                        <motion.div variants={buttonVariants} whileHover="hover" style={{ display: 'inline-block' }}>
                            <Button
                                component={Link}
                                to="/"
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: 'white',
                                    color: '#2c3e50',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                                    '&:hover': { bgcolor: '#95a5a6' }
                                }}
                            >
                                Back to Home
                            </Button>
                        </motion.div>
                    </motion.div>
                </Box>
            </motion.div>
        </Page>
    );
}
