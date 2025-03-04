import React, { useState, useContext } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Button } from "@mui/material";
import { motion } from "framer-motion";
import { HiBadgeCheck } from "react-icons/hi";
import Page from "../components/Page";
import ecoin from "/ecoin.png"; // Import icon coin
import { TOKEN_ICO_Context } from "../context/index";

const initialMissions = [
  { id: 1, title: "Watch video 30 minutes", points: 30, progress: 30, total: 30 },
  { id: 2, title: "Score at least 80% in a quiz", points: 75, progress: 75, total: 80 },
  { id: 3, title: "Prompt chat 5 times", points: 100, progress: 5, total: 5 },
  { id: 4, title: "Upload a file or video", points: 25, progress: 1, total: 1 },
  { id: 5, title: "Join a study group", points: 50, progress: 45, total: 45 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
  hover: { scale: 1.05, rotate: 1, transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.98 }
};

const MissionSection = () => {
  const { CONNECT_WALLET, account, addClaimedTokens } = useContext(TOKEN_ICO_Context);
  const [missions, setMissions] = useState(initialMissions);
  const [claiming, setClaiming] = useState(false); // Simulate loader

  const handleClaim = (id) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission || mission.progress < mission.total) return; // Ensure mission is completed

    if (!account) {
      CONNECT_WALLET();
      return;
    }

    // Simulate claiming process visually
    setClaiming(true);
    setTimeout(() => {
      addClaimedTokens(mission.points); // Increment claimed tokens
      setMissions((prevMissions) => prevMissions.filter((mission) => mission.id !== id)); // Remove mission
      setClaiming(false);
    }, 1000); // Simulate delay
  };

  return (
    <Page title="Mission Page">
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          🎯 Today Missions 🎯
        </Typography>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {missions.map((mission) => {
              const isCompleted = mission.progress >= mission.total;
              return (
                <Grid item xs={12} sm={6} md={4} key={mission.id} sx={{ display: "flex" }}>
                  <motion.div variants={cardVariants} whileHover="hover" whileTap="tap" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <Card
                      sx={{
                        color: "white",
                        p: 3,
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                        borderRadius: 3,
                        flexGrow: 1,
                        background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                        transition: "background 0.4s",
                        "&:hover": { background: "linear-gradient(135deg, #6366F1, #4F46E5)" },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="h6" fontWeight={600} color="white">{mission.title}</Typography>
                          {mission.progress === mission.total && <HiBadgeCheck size={30} color="#FDE047" />}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                          <img src={ecoin} alt="ecoin" width={20} height={20} />
                          <Typography sx={{ fontWeight: "bold", ml: 1 }}>{mission.points}</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(mission.progress / mission.total) * 100}
                          sx={{ height: 8, borderRadius: 5, bgcolor: "#e0e0e0", mt: 2 }}
                        />
                        <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                          {mission.progress}/{mission.total}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            onClick={() => handleClaim(mission.id)}
                            sx={{
                              bgcolor: "#FDE047",
                              color: "black",
                              width: "100%",
                              borderRadius: 2,
                              textTransform: "none",
                              "&:hover": { bgcolor: "#FACC15" },
                              visibility: isCompleted ? "visible" : "hidden",
                            }}
                            disabled={claiming}
                          >
                            {claiming ? "Claiming..." : "Claim"}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Container>
    </Page>
  );
};

export default MissionSection;