import React, { useState, useContext } from "react"; // Import useContext
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Button } from "@mui/material";
import { HiBadgeCheck } from "react-icons/hi";
import Page from "../../components/Page";
import ecoin from "@assets/ecoin.png";
import { initialMissions } from "./data";
import styles from "./styles";
import { RouterContext } from "../../routes/index.jsx"; // Import RouterContext

const MissionSection = () => {
  const { setTotalClaimed, missionClaims, setMissionClaims } = useContext(RouterContext); // Get context values
  const [loadingMissions, setLoadingMissions] = useState(new Set()); // State to track loading missions as a Set

  // Initialize missions state by filtering out already claimed missions from context
  const [missions, setMissions] = useState(() =>
    initialMissions.filter(mission => !missionClaims[mission.id])
  );

  const handleClaim = (missionId) => {
    const missionToClaim = missions.find(m => m.id === missionId);

    if (missionToClaim && missionToClaim.progress >= missionToClaim.total && !loadingMissions.has(missionId)) { // Check if not already loading
      setLoadingMissions(prev => new Set(prev).add(missionId)); // Add missionId to the Set

      setTimeout(() => {
        // Update total claimed points in context
        setTotalClaimed(prevTotal => prevTotal + missionToClaim.points);
        // Mark mission as claimed in context
        setMissionClaims(prevClaims => ({ ...prevClaims, [missionId]: true }));

        // Filter out the claimed and completed mission from local state to update UI
        setMissions(prevMissions => prevMissions.filter(m => m.id !== missionId));
        setLoadingMissions(prev => {
          const newSet = new Set(prev);
          newSet.delete(missionId);
          return newSet;
        }); // Remove missionId from the Set
      }, 5000); // 5-second delay
    } else if (loadingMissions.has(missionId)) {
    } else if (missionToClaim) {
    } else {
    }
  };

  return (
    <Page title="Mission Page">
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.titleWrapper}>
          <Typography sx={styles.title}>🎯 Today Missions 🎯</Typography>
        </Box>
        <Grid container spacing={5} rowSpacing={4} paddingX={5}>
          {missions.map((mission) => { // Use the state variable 'missions' here
            const isCompleted = mission.progress >= mission.total;
            const isLoading = loadingMissions.has(mission.id); // Check if mission.id is in the Set
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
                        disabled={isLoading} // Disable button when loading
                      >
                        {isLoading ? "Claiming..." : "Claim"} {/* Change text when loading */}
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