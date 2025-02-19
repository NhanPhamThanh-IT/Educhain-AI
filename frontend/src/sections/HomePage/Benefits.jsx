import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedHeading from "../../components/AnimateHeading";
import benefits from "../../constants/HomePage/benefits";

const BenefitsSection = () => {
    return (
        <Container sx={{ py: 5 }}>
            <AnimatedHeading
                title="Benefits of Educhain"
                description="Our platform merges blockchain and AI to create a revolutionary learning experience."
                titleAnimation={{ initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1 } }}
                descriptionAnimation={{ initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1.2 } }}
            />
            <Grid container spacing={3}>
                {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} md={4} key={benefit.id}>
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }}>
                            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "0.4s", background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", "&:hover": { transform: "translateY(-10px)", boxShadow: "0px 10px 20px rgba(64, 101, 233, 0.3)", background: "linear-gradient(135deg, #4065E9, #c3cfe2)" } }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.3 }}>
                                        <Typography textAlign="right" variant="h3" fontWeight={600} color="text.secondary" sx={{ transition: "0.3s", "&:hover": { color: "#4065E9", textShadow: "0px 0px 10px rgba(64, 101, 233, 0.5)" } }}>{benefit.id}</Typography>
                                    </motion.div>
                                    <Typography variant="h6" fontWeight={600} mt={2} gutterBottom>{benefit.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{benefit.description}</Typography>
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
