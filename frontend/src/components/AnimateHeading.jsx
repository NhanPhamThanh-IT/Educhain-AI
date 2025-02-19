import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const AnimatedHeading = ({
    title,
    description,
    titleAnimation = { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } },
    descriptionAnimation = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 } }
}) => {
    return (
        <>
            <motion.div {...titleAnimation}>
                <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                    {title}
                </Typography>
            </motion.div>
            <motion.div {...descriptionAnimation}>
                <Typography variant="body1" mb={4} textAlign="center" color="text.secondary">
                    {description}
                </Typography>
            </motion.div>
        </>
    );
};

export default AnimatedHeading;
