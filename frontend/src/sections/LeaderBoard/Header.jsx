import { Box, Button, Grid, Typography } from "@mui/material";
import { Stars } from "@mui/icons-material";
import { Rocket, Target } from "lucide-react";
import { motion } from "framer-motion";
import creditcard from "/creditcard.png";

const headerStyles = {
    container: {
        background: "linear-gradient(135deg, #E3EAFD, #F8F9FF)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 4,
        py: 4,
    },
    title: {
        background: "linear-gradient(to right, #365ACA, #567EDC)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: { xs: "2rem", md: "3rem" },
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    description: {
        color: "#333",
        fontSize: "1.2rem",
        lineHeight: "1.6",
        maxWidth: "90%",
        textAlign: "justify",
    },
    button: {
        color: "#365ACA",
        borderColor: "#365ACA",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "1rem",
        boxShadow: "0px 4px 8px rgba(54, 90, 202, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": { backgroundColor: "#365ACA", color: "#fff" },
    },
};

const LeaderboardHeader = () => (
    <Box sx={headerStyles.container}>
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={headerStyles.title}>
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <Stars sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, color: "#FFC107" }} />
                    </motion.div>
                    Be The Best<br />Get Rewarded!
                </Typography>
                <Typography variant="body1" sx={headerStyles.description}>
                    Compete with others, showcase your skills, and win valuable Educhain Token rewards. Prove your talent and rise to the top!
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    <Button variant="outlined" startIcon={<Rocket size={20} />} sx={headerStyles.button}>
                        <Typography textTransform="capitalize">Learn More</Typography>
                    </Button>
                    <Typography variant="body2" sx={{ color: "#333", fontSize: "1rem", lineHeight: "1.6" }}>or</Typography>
                    <Button variant="outlined" startIcon={<Target size={20} />} sx={headerStyles.button}>
                        <Typography textTransform="capitalize">Complete Missions</Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
                <Box component="img" src={creditcard} alt="Reward Card" sx={{ width: "75%" }} />
            </Grid>
        </Grid>
    </Box>
);

export default LeaderboardHeader;
