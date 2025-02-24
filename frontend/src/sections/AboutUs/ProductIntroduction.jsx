// Desc: Product Introduction section of the AboutUs page.

// Importing necessary MUI libraries
import { Box } from "@mui/material";

// Importing necessary components from MUI
import { motion } from "framer-motion";

// Importing custom components
import SectionTitle from "../../components/AboutUs/SectionTitle";
import BioDesc from "../../components/AboutUs/BioDesc";
import FeaturesIntroduction from "./FeaturesIntroduction";

// General Introduction component
const GeneralIntroduction = () => {
    return (
        <Box sx={{ mb: 8 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <SectionTitle title="Why Educhain?" />
                    <BioDesc desc="EduchainAI is a friendly learning platform that creates a safe and modern space for everyone. Here, you can share courses and exchange ideas while earning rewards with our unique virtual currency through tests, assignments, and fun challenges. With our helpful AI assistant, you'll easily create tests, solve exercises, and access useful learning materials. We also offer a wide range of courses on topics like IT, medicine, chemistry, and more, making learning simple and enjoyable for all." />
                </Box>
            </motion.div>
        </Box>
    )
};

// Product Introduction component
const ProductIntroduction = () => {
    return (
        <Box sx={{ py: 8, px: 4, textAlign: "center" }}>

            {/* General Introduction */}
            <GeneralIntroduction />

            {/* Features Introduction */}
            <FeaturesIntroduction />

        </Box>
    );
};

export default ProductIntroduction;
