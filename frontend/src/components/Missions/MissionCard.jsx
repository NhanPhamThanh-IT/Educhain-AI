import { Box, Button, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { HiBadgeCheck } from "react-icons/hi";
import ecoin from "/ecoin.png";

// Mission Card Component
const MissionCard = ({ mission, isCompleted, handleClaim }) => (
    <Card sx={{
        color: "#333",
        p: 3,
        borderRadius: 3,
        background: "#ffffff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
    }}>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {/* Title and Status Icon */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600} color="#333">{mission.title}</Typography>
                {isCompleted && <HiBadgeCheck size={30} color="#4caf50" />}
            </Box>

            {/* Points Display */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <img src={ecoin} alt="ecoin" width={20} height={20} />
                <Typography sx={{ fontWeight: "bold", ml: 1 }}>{mission.points}</Typography>
            </Box>

            {/* Progress Bar */}
            <LinearProgress
                variant="determinate"
                value={(mission.progress / mission.total) * 100}
                sx={{ height: 8, borderRadius: 5, bgcolor: "#ddd", mt: 2 }}
            />
            <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                {mission.progress}/{mission.total}
            </Typography>

            {/* Claim Button */}
            {isCompleted && (
                <Box sx={{ mt: "auto" }}>
                    <Button
                        variant="contained"
                        onClick={() => handleClaim(mission.id)}
                        sx={{ bgcolor: mission.claimed ? "#bbb" : "#4caf50", color: "white", width: "100%", borderRadius: 2, textTransform: "none" }}
                        disabled={mission.claimed}
                    >
                        {mission.claimed ? "Claimed" : "Claim"}
                    </Button>
                </Box>
            )}
        </CardContent>
    </Card>
);

export default MissionCard;