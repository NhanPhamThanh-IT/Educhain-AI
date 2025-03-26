import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ShieldCheck, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Main = () => {
    const { ref, inView } = useInView({ triggerOnce: false });
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    useEffect(() => {
        setTriggerAnimation(inView);
    }, [inView]);

    return (
        <Grid container spacing={3} ref={ref} alignItems="stretch">
            {features.map((feature, index) => (
                <Grid item xs={12} md={index === 0 ? 4 : 8} key={`feature-${index}`} display="flex">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={triggerAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        style={{ flex: 1, display: "flex" }}
                    >
                        <Card
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                bgcolor: "wh",
                                boxShadow: 2,
                                borderColor: "rgb(231, 231, 231)",
                                display: "flex",
                                flexDirection: "row",
                                height: "100%",
                                flex: 1
                            }}
                        >
                            {feature.left_column_img && (
                                <Box
                                    component="img"
                                    src={feature.left_column_img}
                                    alt={feature.title}
                                    sx={{ width: "50%", height: "auto", borderRadius: 2, border: "1px solid rgb(231, 231, 231)" }}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1, width: "50%" }}>
                                <Box mb={2}>{feature.icon}</Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ userSelect: "none" }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="rgb(109, 109, 109)" sx={{ userSelect: "none" }}>
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
        icon: <ShieldCheck size={24} />,
        title: "Secure and Transparent Transactions",
        description: "Blockchain technology ensures every transaction is fast, safe, and reliable."
    },
    {
        icon: <Bot size={24} />,
        title: "AI Chatbot Assistance",
        description: "Get real-time learning support and answers tailored to your educational needs.",
        left_column_img: "/Homepage/CHAT_BOT.png"
    }
];

export default Main;