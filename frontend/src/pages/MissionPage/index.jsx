import React, { useState, useContext } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Button } from "@mui/material";
import { HiBadgeCheck } from "react-icons/hi";
import Page from "../../components/Page";
import ecoin from "@assets/ecoin.png";
import { initialMissions } from "./data";
import styles from "./styles";
import { RouterContext } from "../../routes/index";

const MissionSection = () => {
  const {
    account,
    totalClaimed,
    setTotalClaimed,
    missionClaims,
    setMissionClaims,
    notifySuccess,
    notifyError
  } = useContext(RouterContext);

  const [missions, setMissions] = useState(initialMissions);
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async (missionId) => {
    try {
      if (!account) {
        notifyError("Please connect your wallet first");
        return;
      }

      if (missionClaims[missionId]) {
        notifyError("Mission already claimed!");
        return;
      }

      const mission = missions.find(m => m.id === missionId);
      if (!mission) return;

      setMissionClaims(prev => ({
        ...prev,
        [missionId]: true
      }));

      setTotalClaimed(prev => prev + mission.points);

      notifySuccess(`Claimed ${mission.points} EDT!`);

    } catch (error) {
      console.error("Claim failed:", error);
      notifyError("Failed to claim reward");
    }
  };

  return (
    <Page title="Mission Page">
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.titleWrapper}>
          <Typography sx={styles.title}>🎯 Today Missions 🎯</Typography>
        </Box>
        <Grid container spacing={5} rowSpacing={4} paddingX={5}>
          {missions.map((mission) => {
            const isCompleted = mission.progress >= mission.total;
            return (
              <Grid item xs={12} sm={6} md={4} key={mission.id} sx={{ display: "flex", gap: 2 }}>
                <Card sx={styles.card}>
                  <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardHeader}>
                      <Typography variant="body1" fontWeight={600} sx={styles.card_title}>{mission.title}</Typography>
                      {isCompleted && <HiBadgeCheck size={30} color="#FDE047" />}
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(mission.progress / mission.total) * 100}
                      sx={styles.progressBar}
                    />
                    <Typography variant="body2" sx={styles.progressText}>
                      {mission.progress}/{mission.total}
                    </Typography>
                    <Box sx={styles.buttonWrapper}>
                      <Box sx={styles.pointsWrapper}>
                        <img src={ecoin} alt="ecoin" width={20} height={20} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>{mission.points}</Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleClaim(mission.id)}
                        sx={{ ...styles.claimButton, visibility: isCompleted ? "visible" : "hidden" }}
                        disabled={claiming || missionClaims[mission.id]}
                      >
                        {claiming ? "Claiming..." : missionClaims[mission.id] ? "Claimed" : "Claim"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Page>
  );
};

export default MissionSection;