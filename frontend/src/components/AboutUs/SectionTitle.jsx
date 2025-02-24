// Desc: Section title component for AboutUs page

// Importing MUI components
import { Box, Typography } from '@mui/material';

// Impoting motion from framer-motion
import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const SectionTitle = ({ title }) => (
    <Box textAlign="center" sx={{ my: 4 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Typography variant="h3" fontWeight="bold" sx={{ color: '#facc15', textTransform: 'capitalize' }}>
                {title}
            </Typography>
        </motion.div>
    </Box>
);

export default SectionTitle;