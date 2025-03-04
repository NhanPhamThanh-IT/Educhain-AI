import { Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { HiBadgeCheck } from "react-icons/hi";
import { FaHourglassHalf } from "react-icons/fa";
import ecoin from "/ecoin.png";

// Mission Card Component
const MissionCard = ({ mission, isCompleted, handleClaim }) => (
    <Card sx={{
        color: "#333",
        borderRadius: 4,
        background: "#ffffff",
        border: "2px solid #3F51B5",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
    }}>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", pb: 2 }}>
            {/* Title and Status Icon */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1" fontWeight={600} color="#666">{mission.title}</Typography>
                {isCompleted && (
                    <HiBadgeCheck
                        size={30}
                        color={mission.claimed ? "#bbb" : "#4caf50"}
                        style={{ cursor: mission.claimed ? "default" : "pointer" }}
                        onClick={() => !mission.claimed && handleClaim(mission.id)}
                    />
                )}
                {!isCompleted && (
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            color: "#ff5733",
                            backgroundColor: "rgba(255, 165, 0, 0.2)",
                        }}
                    >
                        <FaHourglassHalf sx={{ fontSize: 30, color: "#ff5733" }} />
                    </Box>
                )}
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
        </CardContent>
    </Card>
);

export default MissionCard;
