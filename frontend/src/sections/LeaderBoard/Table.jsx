import { useState } from "react";
import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Shield, VpnKey, CheckCircleRounded, StarRounded } from "@mui/icons-material";
import ecoin from "/ecoin.png";
import { motion } from "framer-motion";

const getRowBackground = (index) => {
    if (index === 0) return "#E3F2FD";
    if (index < 3) return "#BBDEFB";
    if (index < 5) return "#90CAF9";
    return "#F0F8FF";
};

const StyledTableRow = styled(motion.tr)(({ index }) => ({
    color: typeof index === "number" && index < 5 ? "#000" : "#666",
    background: getRowBackground(index),
    transition: "background 0.3s ease, transform 0.2s ease-out",
    willChange: "transform, background",
    "&:hover": {
        background: "rgba(200, 230, 255, 0.4)",
        transform: "scale(1.01)",
    },
}));

const leaderboardData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    location: "City, Country",
    avatar: `https://i.pravatar.cc/40?img=${index + 1}`,
    points: Math.floor(Math.random() * 5000) + 5000,
    achievements: [Shield, VpnKey, CheckCircleRounded]
}));

const LeaderboardTable = () => {
    const [visibleCount, setVisibleCount] = useState(10);
    const showMore = () => setVisibleCount(leaderboardData.length);

    return (
        <Box sx={{ borderRadius: "12px", pt: 2, px: 2, maxWidth: "900px", mx: "auto", bgcolor: "white" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" fontWeight="bold">#</TableCell>
                            <TableCell>Profile</TableCell>
                            <TableCell align="center">Achievements</TableCell>
                            <TableCell align="right">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardData.slice(0, visibleCount).map((user, index) => (
                            <StyledTableRow
                                key={user.id}
                                index={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <TableCell align="center">
                                    {index < 5 ? (
                                        <Box sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "white" }}>
                                            <StarRounded sx={{ color: index === 0 ? "#64B5F6" : index < 3 ? "#42A5F5" : "#1E88E5", fontSize: 24 }} />
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" fontWeight="bold">{index + 1}</Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
                                        <Box>
                                            <Typography fontWeight="bold" sx={{ color: index < 5 ? "#000" : "#666" }}>{user.name}</Typography>
                                            <Typography variant="caption" sx={{ color: index < 5 ? "#000" : "#666" }}>{user.location}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {user.achievements.map((Icon, i) => (
                                        <Icon key={i} sx={{ mx: 0.5, fontSize: 24, color: ["#FFD700", "#81C784", "#FFB74D", "#FF8A65"][i] }} />
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                                        <Box component="img" src={ecoin} alt="Reward Icon" sx={{ width: 30, height: 30 }} />
                                        <Typography fontWeight="bold" sx={{ fontSize: "1rem", color: "#333" }}>{user.points}</Typography>
                                    </Box>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {visibleCount < leaderboardData.length && (
                <Button variant="contained" sx={{ m: 2 }} onClick={showMore}>More</Button>
            )}
        </Box>
    );
};

export default LeaderboardTable;
