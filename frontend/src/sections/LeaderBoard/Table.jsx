import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ecoin from "/ecoin.png";


// Dữ liệu giả lập top 20 người học
const leaderboardData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    location: "City, Country",
    avatar: `https://i.pravatar.cc/40?img=${index + 1}`,
    points: Math.floor(Math.random() * 5000) + 5000,
    achievements: ["🏅", "🔑", "🔗", "👑"],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.1)",
    "&:nth-of-type(1)": { background: "rgba(255, 215, 0, 0.3)" },
    "&:nth-of-type(2), &:nth-of-type(3)": { background: "rgba(192, 192, 192, 0.3)" },
}));

const LeaderboardTable = () => (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Profile</TableCell>
                    <TableCell>Achievements</TableCell>
                    <TableCell align="right">Points</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {leaderboardData.map((user, index) => (
                    <StyledTableRow key={user.id}>
                        <TableCell>
                            {index < 3 ? (
                                <EmojiEventsIcon sx={{ color: index === 0 ? "gold" : index === 1 ? "silver" : "#cd7f32", fontSize: 24 }} />
                            ) : (
                                index + 1
                            )}
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar src={user.avatar} />
                                <Box>
                                    <Typography fontWeight="bold">{user.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{user.location}</Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            {user.achievements.map((icon, i) => (
                                <Typography key={i} component="span" sx={{ mx: 0.5 }}>{icon}</Typography>
                            ))}
                        </TableCell>
                        <TableCell align="right">
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)", boxShadow: "0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(21, 163, 68, 0.8)", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                                    <Box component="img" src={ecoin} alt="Reward Icon" sx={{ width: 30, height: 30 }} />
                                </Box>
                                <Typography fontWeight="bold" sx={{ fontSize: "1rem", color: "#333" }}>{user.points}</Typography>
                            </Box>
                        </TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default LeaderboardTable;