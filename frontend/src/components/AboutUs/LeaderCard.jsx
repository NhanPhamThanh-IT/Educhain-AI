// Importing necessary react libraries
import React from "react";

// Importing necessary MUI components
import { Avatar, Box, Paper, Typography } from "@mui/material";

// Importing necessary framer-motion components
import { motion } from "framer-motion";

// Card variants for initial fade-in animation
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// LeaderCard component: Display information of a leader
const LeaderCard = ({ leader }) => (
    <motion.div initial="hidden" whileInView="visible" variants={cardVariants}>
        <Box sx={{ display: "flex", justifyContent: "center", perspective: "1200px" }}>
            <motion.div
                whileHover={{
                    rotateY: 180,
                    scale: 1.05,
                    transition: { duration: 1, ease: "easeInOut" }
                }}
                style={{
                    position: "relative",
                    width: "250px",
                    height: "325px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Front side: Display avatar and name */}
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        p: 4,
                        bgcolor: "#1e293b",
                        color: "white",
                        borderRadius: 3,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        src={leader.image}
                        alt={leader.name}
                        sx={{ width: 200, height: 200, mb: 2, border: "4px solid #facc15" }}
                    />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#facc15" }}>
                        {leader.name}
                    </Typography>
                </Paper>

                {/* Back side: Display other informations */}
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        p: 4,
                        bgcolor: "#1e293b",
                        color: "white",
                        borderRadius: 3,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography variant="body1" sx={{ fontStyle: "italic", color: "#94a3b8", mb: 1 }}>
                        {leader.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                        {leader.experience}
                    </Typography>
                </Paper>
            </motion.div>
        </Box>
    </motion.div>
);

export default LeaderCard;
