import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { BrainCircuit, PencilRuler, DollarSign } from "lucide-react";
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
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ userSelect: "none" }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="rgb(109, 109, 109)" sx={{ userSelect: "none"}}>
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
        icon: <BrainCircuit size={24} />, 
        title: "AI-Powered Course Creation",
        description: "Effortlessly transform your PDFs, videos into interactive courses using advanced AI tools."
    },
    {
        icon: <PencilRuler size={24} />, 
        title: "Comprehensive Learning Tools",
        description: "Engage with exams, quizzes, and other resources to enhance understanding."
    },
    {
        icon: <DollarSign size={24} />, 
        title: "Monetize Your Knowledge",
        description: "Sell your courses to a global audience with secure blockchain-backed transactions."
    }
];

export default main;
