import React, { useEffect, useState, Suspense, lazy } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MessageSquare, BrainCircuit, PencilRuler, DollarSign, ShieldCheck, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Lazy load components
const TitleSection = lazy(() => Promise.resolve({
    default: () => (
        <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textTransform: "none", userSelect: "none" }}>
                Save hours, learn smarter
            </Typography>
            <Typography color="text.secondary" sx={{ userSelect: "none" }}>
                From key takeaways to specific questions, we've got you covered.
            </Typography>
        </Box>
    )
}));

const MainFeature = lazy(() => Promise.resolve({
    default: () => (
        <Card sx={{ p: 4, borderRadius: 4, borderColor: "rgb(231, 231, 231)", boxShadow: 2, }}>
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={4}>
                <Box>
                    <Box mb={2}><MessageSquare size={24} /></Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ userSelect: "none" }}>
                        Earn and Learn with Educhain Token
                    </Typography>
                    <Typography variant="body2" color="rgb(109, 109, 109)" sx={{ userSelect: "none" }}>
                        Exchange cryptocurrency for Educhain Token to access and sell courses, creating a rewarding ecosystem.
                    </Typography>
                </Box>
                <Box>
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                        alt="Students collaborating"
                        sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
                    />
                </Box>
            </Box>
        </Card>
    )
}));

const OtherFeatures = () => {
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
                <Grid size={{ xs: 12, md: 4 }} key={index} display="flex">
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

const BonusFeatures = () => {
    const { ref, inView } = useInView({ triggerOnce: false });
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    useEffect(() => {
        setTriggerAnimation(inView);
    }, [inView]);

    return (
        <Grid container spacing={3} ref={ref} alignItems="stretch">
            {bonusFeatures.map((feature, index) => (
                <Grid size={{ xs: 12, md: index === 0 ? 4 : 8 }} key={`feature-${index}`} display="flex">
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

const bonusFeatures = [
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

const Features = () => {
    return (
        <Box maxWidth="md" mx="auto" p={3} pt={8} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Suspense fallback={<Box>Loading...</Box>}>
                <TitleSection />
            </Suspense>
            <Suspense fallback={<Box>Loading...</Box>}>
                <MainFeature />
            </Suspense>
            <OtherFeatures />
            <BonusFeatures />
        </Box>
    );
};

export default Features;
