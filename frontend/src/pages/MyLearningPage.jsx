// Import dependencies
import React, { useState } from "react";
import {
    Grid, Typography, Box, Tabs, Tab, Divider, Paper, Button, useTheme, useMediaQuery
} from "@mui/material";
import { ListAlt, CheckCircle, Cancel, Redeem } from "@mui/icons-material";
import Page from "../components/Page";
import TabsSection from "../sections/Missions/TabSection";

import MissionCard from "../components/Missions/MissionCard";

// Initial mission data
const initialMissions = [
    { id: 1, title: "Watch video 30 minutes", points: 30, progress: 30, total: 30, claimed: false },
    { id: 2, title: "Score at least 80% in a quiz", points: 75, progress: 75, total: 80, claimed: false },
    { id: 3, title: "Prompt chat 5 times", points: 100, progress: 5, total: 5, claimed: false },
    { id: 4, title: "Upload a file or video", points: 25, progress: 1, total: 1, claimed: false },
    { id: 5, title: "Join a study group", points: 50, progress: 45, total: 45, claimed: false },
];

const MissionListSection = ({ filteredMissions, handleClaim, handleClaimAll, claimableMissions, tabIndex }) => (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ color: "#3F51B5" }}>Total Tasks: {filteredMissions.length}</Typography>
            {(tabIndex === 0 || tabIndex === 1) && (
                <Button
                    variant="contained"
                    startIcon={<Redeem />}
                    onClick={handleClaimAll}
                    disabled={claimableMissions.length === 0}
                    sx={{ bgcolor: "#3F51B5", color: "#FFFFFF" }}
                >
                    Claim All
                </Button>
            )}
        </Box>
        <Grid container spacing={3}>
            {filteredMissions.map(mission => (
                <Grid item xs={12} sm={6} md={4} key={mission.id}>
                    <MissionCard
                        mission={mission}
                        isCompleted={mission.progress >= mission.total}
                        handleClaim={handleClaim}
                    />
                </Grid>
            ))}
        </Grid>
    </>
);

const MissionSection = () => {
    const [missions, setMissions] = useState(initialMissions);
    const [tabIndex, setTabIndex] = useState(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClaim = (id) => {
        setMissions((prevMissions) =>
            prevMissions.map(mission =>
                mission.id === id ? { ...mission, claimed: true } : mission
            )
        );
    };

    const handleClaimAll = () => {
        setMissions((prevMissions) =>
            prevMissions.map(mission =>
                mission.progress >= mission.total && !mission.claimed ? { ...mission, claimed: true } : mission
            )
        );
    };

    const filterMissions = () => {
        switch (tabIndex) {
            case 1: return missions.filter(mission => mission.progress >= mission.total);
            case 2: return missions.filter(mission => mission.progress < mission.total);
            default: return missions;
        }
    };

    const filteredMissions = filterMissions();
    const claimableMissions = filteredMissions.filter(mission => mission.progress >= mission.total && !mission.claimed);

    return (
        <Page title="Mission Page">
            <Box sx={{ pt: 15, pb: 5, mx: "auto", px: 2 }}>
                <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom sx={{ color: "#3F51B5" }}>
                    🎯 Today Missions 🎯
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    {/* Tabs Section */}
                    <Grid item xs={12} sm={4} md={3} lg={2} sx={{ position: "sticky", top: 100, alignSelf: "flex-start" }}>
                        <TabsSection tabIndex={tabIndex} setTabIndex={setTabIndex} isSmallScreen={isSmallScreen} />
                    </Grid>

                    {/* Mission List Section */}
                    <Grid item xs={12} sm={8} md={9} lg={10}>
                        <MissionListSection
                            filteredMissions={filteredMissions}
                            handleClaim={handleClaim}
                            handleClaimAll={handleClaimAll}
                            claimableMissions={claimableMissions}
                            tabIndex={tabIndex}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Page>
    );
};

export default MissionSection;
