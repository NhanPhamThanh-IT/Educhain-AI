// Desc: Section title component for AboutUs page

// Importing MUI components
import { Box, Typography } from '@mui/material';

// Importing motion from framer-motion
import { motion } from 'framer-motion';

// Section title component with fade-in effect
const SectionTitle = ({ title }) => (
    <Box textAlign="center" sx={{ my: 4 }}>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <Typography variant="h3" fontWeight="bold" sx={{ color: '#1E3A8A', textTransform: 'capitalize' }}>
                {title}
            </Typography>
        </motion.div>
    </Box>
);

// Exporting SectionTitle component
export default SectionTitle;
