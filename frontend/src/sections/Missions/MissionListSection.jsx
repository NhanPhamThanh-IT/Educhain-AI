import { Box, Button, Grid, Typography } from "@mui/material";
import { Redeem } from "@mui/icons-material";
import MissionCard from "../../components/Missions/MissionCard";

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

export default MissionListSection;