import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
    const navigate = useNavigate();
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
    const [animationKey, setAnimationKey] = useState(0);

    // Reset animation khi component vào lại màn hình
    React.useEffect(() => {
        if (inView) {
            setAnimationKey((prev) => prev + 1);
        }
    }, [inView]);

    const handleNavigate = () => {
        navigate("/learning/course");
    }

    return (
        <Container maxWidth="lg">
            <div ref={ref}>
                <motion.div
                    key={animationKey}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            bgcolor: "white",
                            borderRadius: "20px",
                            margin: "auto",
                            mt: 25,
                            py: 10,
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            border: "1px solid rgb(231, 231, 231)",
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom mb={3.5} sx={{ userSelect: "none" }}>
                            Learn smarter, faster, easier.
                        </Typography>
                        <Typography variant="body1" color="gray" gutterBottom mb={2.5} sx={{ userSelect: "none"}}>
                            Upload your content, and start your learning journey.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "30px",
                                textTransform: "none",
                                fontSize: "16px",
                                ":hover": { backgroundColor: "#333" },
                                userSelect: "none"
                            }}
                            onClick={() => handleNavigate()}
                        >
                            Start Learning
                        </Button>
                    </Box>
                </motion.div>
            </div>
        </Container>
    );
};

export default HeroSection;
