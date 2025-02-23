// Desc: LeaderCard component of AboutUs page

// Importing necessary libraries and tools
import { Avatar, Box, CardContent, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Card variants for animation
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// LeaderCard component to display information about a team leader
const LeaderCard = ({ leader }) => (
    <motion.div initial="hidden" whileInView="visible" variants={cardVariants}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper elevation={6} sx={{
                width: 300,
                textAlign: "center",
                p: 4,
                bgcolor: "#1e293b",
                color: "white",
                borderRadius: 3,
                transition: "transform 0.3s",
                '&:hover': { transform: "scale(1.05)", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }
            }}>
                <Avatar
                    src={leader.image}
                    alt={leader.name}
                    sx={{ width: 200, height: 200, mx: "auto", mb: 2, border: "4px solid #facc15" }}
                />
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#facc15" }}>
                        {leader.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontStyle: "italic", color: "#94a3b8" }}>
                        {leader.role}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: "#e2e8f0" }}>
                        {leader.experience}
                    </Typography>
                </CardContent>
            </Paper>
        </Box>
    </motion.div>
);

export default LeaderCard;