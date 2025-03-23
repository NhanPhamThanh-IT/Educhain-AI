import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Upload, TestTube2, Library } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const main = () => {
    const { ref, inView } = useInView({ triggerOnce: false });
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    useEffect(() => {
        if (inView) {
            setTriggerAnimation(true);
        } else {
            setTriggerAnimation(false);
        }
    }, [inView]);

    return (
        <Grid container spacing={3} ref={ref} alignItems="stretch">
            {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index} display="flex">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={triggerAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        style={{ flex: 1, display: "flex" }}
                    >
                        <Card
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                bgcolor: "rgb(246, 246, 246)",
                                boxShadow: 2,
                                borderColor: "rgb(231, 231, 231)",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                flex: 1
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box mb={2}>{feature.icon}</Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="rgb(109, 109, 109)">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    );
};

const features = [
    {
        icon: <Upload size={24} />, 
        title: "Upload any content",
        description: "From PDFs and YouTube videos to slides and even recorded lectures, learn everything your way."
    },
    {
        icon: <TestTube2 size={24} />, 
        title: "Test your knowledge",
        description: "Create and customize flashcards: edit, delete, star, view sources, and more."
    },
    {
        icon: <Library size={24} />, 
        title: "Sources Included",
        description: "Retrieve accurate and contextual information from your content."
    }
];

export default main;
