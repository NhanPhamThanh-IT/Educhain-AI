import React, { useState } from "react";
import { Box, Card, Typography, LinearProgress, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ecoin from "/ecoin.png"; // Import icon coin
import Page from "../components/Page";

const initialMissions = [
  { id: 1, title: "Watch video 30 minutes", points: 30, progress: 30, total: 30 },
  { id: 2, title: "Score at least 80% in a quiz", points: 75, progress: 75, total: 80 },
  { id: 3, title: "Prompt chat 5 times", points: 100, progress: 5, total: 5 },
  { id: 4, title: "Upload a file or video", points: 25, progress: 1, total: 1 },
  { id: 5, title: "Join a study group", points: 50, progress: 45, total: 45 },
];

const MissionSection = () => {
  const [missions, setMissions] = useState(initialMissions);

  const handleClaim = (id) => {
    setMissions((prevMissions) => prevMissions.filter((mission) => mission.id !== id));
  };

  return (
    <Page title="Mission Page">
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Today Missions
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // Tối đa 3 mission trên 1 hàng
          gap: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: "white",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          "@media (max-width: 900px)": { gridTemplateColumns: "repeat(2, 1fr)" },
          "@media (max-width: 600px)": { gridTemplateColumns: "repeat(1, 1fr)" },
        }}
      >
        <AnimatePresence>
          {missions.map((mission) => {
            const isCompleted = mission.progress >= mission.total;
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              >
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: "linear-gradient(to bottom, #ffffff, #afc2ff)",
                    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
                    position: "relative",
                    minHeight: 140, // Đảm bảo mọi ô mission có chiều cao đồng đều
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight="bold">{mission.title}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <img src={ecoin} alt="ecoin" width={20} height={20} />
                    <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                      {mission.points}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(mission.progress / mission.total) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: "#e0e0e0",
                      mt: 1,
                      "& .MuiLinearProgress-bar": { bgcolor: "#4CAF50" },
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                    {mission.progress}/{mission.total}
                  </Typography>
                  <Box sx={{ mt: 1.5, height: 36 }}> {/* Giữ không gian cho nút */}
                    <Button
                      variant="contained"
                      onClick={() => handleClaim(mission.id)}
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "white",
                        width: "100%",
                        borderRadius: 2,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#303f9f" },
                        visibility: isCompleted ? "visible" : "hidden", // Ẩn nhưng vẫn chiếm chỗ
                      }}
                    >
                      Claim
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>
    </Box>
    </Page>
  );
};

export default MissionSection;
