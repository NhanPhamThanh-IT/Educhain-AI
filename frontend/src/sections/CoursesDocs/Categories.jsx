import React from "react";
import { Container, Grid, Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedHeading from "../../components/AnimateHeading";

const categories = [
    { title: "Business Management", color: "#EAF6FF", icon: "/CoursesDocs/Category1.png" },
    { title: "Arts & Design", color: "#FEF2F4", icon: "/CoursesDocs/Category2.png" },
    { title: "Personal Development", color: "#EEFBF5", icon: "/CoursesDocs/Category3.png" },
    { title: "UI/UX Design", color: "#FFFAEF", icon: "/CoursesDocs/Category4.png" },
    { title: "Graphic Design", color: "#F7F3FF", icon: "/CoursesDocs/Category5.png" },
    { title: "Digital Marketing", color: "#FFF0F8", icon: "/CoursesDocs/Category6.png" },
    { title: "Exclusive Man", color: "#F3F4FE", icon: "/CoursesDocs/Category7.png" },
    { title: "Product Design", color: "#FFF7EF", icon: "/CoursesDocs/Category8.png" },
    { title: "Video & Photography", color: "#F1FBFF", icon: "/CoursesDocs/Category9.png" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
};

const CategorySection = () => (
    <Container sx={{ py: 5 }}>
        <AnimatedHeading
            title="📌 Browse By Categories"
            description="Explore a diverse range of categories powered by blockchain and AI, ensuring a personalized and innovative learning journey."
            titleAnimation={{ initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1 } }}
            descriptionAnimation={{ initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1 } }}
        />
        <Grid container spacing={3} sx={{ p: 1, justifyContent: "center" }}>
            {categories.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        variants={cardVariants}
                    >
                        <Card sx={{
                            backgroundColor: item.color,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            transition: "all 0.3s ease-in-out"
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 80 }}>
                                <img src={item.icon} alt={item.title} style={{ width: 60, height: 60 }} />
                            </Box>
                            <Typography fontWeight="bold" sx={{ ml: 3, color: "#0E2A46" }}>{item.title}</Typography>
                        </Card>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    </Container>
);

export default CategorySection;
