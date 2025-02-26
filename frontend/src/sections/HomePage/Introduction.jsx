import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { School as SchoolIcon, MonetizationOn as MonetizationOnIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const IntroSection = () => {
    const navigate = useNavigate();

    const backgroundStyles = {
        position: "relative",
        textAlign: "center",
        color: "white",
        py: 19.5,
        backgroundImage: "url('HomePage/IntroBanner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        }
    };

    const buttonData = [
        {
            label: "Create Courses",
            icon: <SchoolIcon />,
            variant: "contained",
            bg: "#4F46E5",
            hoverBg: "#4338CA",
            link: "/mylearning/createcourse"
        },
        {
            label: "Credit Exchange",
            icon: <MonetizationOnIcon />,
            variant: "outlined",
            bg: "#f9f9f9",
            hoverBg: "rgba(255, 255, 255, 0.1)",
            color: "black",
            link: "/learning/exchange"
        }
    ];

    return (
        <Box sx={backgroundStyles}>
            <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        <img src="/HomePage/IntroIcon.png" alt="Not found" height="60" /> Unlock Your Creative Potential
                    </Typography>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Empower Learning, Revolutionize Knowledge, Earn while learning!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Learn from community and Enhance Your Skills.
                    </Typography>
                </motion.div>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    {buttonData.map((btn, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={() => navigate(btn.link)}
                                variant={btn.variant}
                                startIcon={btn.icon}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    fontWeight: 'bold',
                                    backgroundColor: btn.bg,
                                    color: btn.color || "inherit",
                                    textTransform: "none",
                                    ":hover": {
                                        backgroundColor: btn.hoverBg,
                                        boxShadow: "0px 0px 10px rgba(79, 70, 229, 0.7)"
                                    }
                                }}
                            >
                                {btn.label}
                            </Button>
                        </motion.div>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default IntroSection;
