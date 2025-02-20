import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedHeading from "../../components/AnimateHeading";
import benefits from "../../constants/HomePage/benefits";

const BenefitsSection = () => {
    return (
        <Container sx={{ py: 10 }}>
            <AnimatedHeading
                title="👍Benefits of Educhain👍"
                description="Our platform merges blockchain and AI to create a revolutionary learning experience."
                titleAnimation={{ initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1 } }}
                descriptionAnimation={{ initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1.2 } }}
            />
            <Grid container spacing={3}>
                {benefits.map(({ id, title, description }, index) => (
                    <Grid item xs={12} sm={6} md={4} key={id} sx={{ display: "flex" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            style={{ width: "100%", display: "flex", flexDirection: "column" }}
                        >
                            <Card
                                sx={{
                                    p: 3,
                                    boxShadow: 3,
                                    borderRadius: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    flexGrow: 1,
                                    background: "linear-gradient(135deg, #f5f7fa, #e3eaf7)",
                                    transition: "0.4s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0px 10px 20px rgba(64, 101, 233, 0.3)",
                                        background: "linear-gradient(135deg, #4A73E8, #e3eaf7)",
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography
                                        textAlign="right"
                                        variant="h4"
                                        fontWeight={600}
                                        color="text.secondary"
                                        sx={{
                                            transition: "0.3s",
                                            "&:hover": {
                                                color: "#4A73E8",
                                                textShadow: "0px 0px 10px rgba(64, 101, 233, 0.5)",
                                            },
                                        }}
                                    >
                                        {id}
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600} mt={2} gutterBottom>
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                                        {description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BenefitsSection;
