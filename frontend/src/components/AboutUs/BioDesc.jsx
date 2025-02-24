// Desc: BioDesc component of AboutUs page

// Import necessary MUI libraries
import { Typography } from '@mui/material';

// Import framer-motion for animation
import { motion } from 'framer-motion';

// BioDesc component
const BioDesc = ({ desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
        <Typography
            variant="body1"
            sx={{ color: '#333', maxWidth: 900, textAlign: 'justify' }}
        >
            {desc}
        </Typography>
    </motion.div>
);

// Export BioDesc component
export default BioDesc;
