import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedHeading from "../../components/Intro/AnimateHeading";
import benefits from "../../constants/Intro/benefits";
import { HiBadgeCheck } from "react-icons/hi";

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hover: { scale: 1.05, rotate: 1, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.98 }
};

const BenefitsSection = () => {
    return (
        <Container sx={{ py: 8 }}>
            <AnimatedHeading title="🚀 Benefits of Educhain 🚀" description="Harnessing blockchain and AI for an unparalleled learning experience."
                titleAnimation={{ initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8 } }}
                descriptionAnimation={{ initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1 } }}
            />
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Grid container spacing={3}>
                    {benefits.map(({ id, title, description }) => (
                        <Grid item xs={12} sm={6} md={4} key={id} sx={{ display: "flex" }}>
                            <motion.div variants={cardVariants} whileHover="hover" whileTap="tap" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                <Card sx={{ color: "white", p: 3, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", borderRadius: 3, display: "flex", flexDirection: "column", flexGrow: 1, background: "linear-gradient(135deg, #4F46E5, #6366F1)", transition: "background 0.4s", "&:hover": { background: "linear-gradient(135deg, #6366F1, #4F46E5)" } }}>
                                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="h6" fontWeight={600} color="white">{title}</Typography>
                                            <HiBadgeCheck size={30} color="#FDE047" />
                                        </Box>
                                        <Typography variant="body2" sx={{ flexGrow: 1, mt: 1, opacity: 0.95, color: "white" }}>{description}</Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Container>
    );
};

export default BenefitsSection;