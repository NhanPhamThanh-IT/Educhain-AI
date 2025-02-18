// components
import Page from "../components/Page";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Tab,
  Tabs,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ecoin from "/ecoin.png";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import creditcard from "/creditcard.png";
// ----------------------------------------------------------------------

// Dữ liệu giả lập top 20 người học
const leaderboardData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  location: "City, Country",
  avatar: `https://i.pravatar.cc/40?img=${index + 1}`,
  points: Math.floor(Math.random() * 5000) + 5000, // Điểm ngẫu nhiên từ 5000 - 10000
  achievements: ["🏅", "🔑", "🔗", "👑"],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  "&:nth-of-type(1)": {
    background: "rgba(255, 215, 0, 0.3)", // Top 1 có màu vàng nhạt
  },
  "&:nth-of-type(2), &:nth-of-type(3)": {
    background: "rgba(192, 192, 192, 0.3)", // Top 2 & 3 có màu bạc nhạt
  },
}));

export default function LeaderBoard() {
  const [tab, setTab] = useState(0);
  return (
    <Page title="Leader Board">
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
          padding: { xs: "80px 20px", md: "120px 80px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Be the Best <br /> Get Rewarded!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Compete with others, showcase your skills, and earn Educhain Token
              prizes. The higher you climb, the bigger the reward!
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              More
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: "center",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box component="img" src={creditcard} alt="Reward Card" />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "90%",
            maxWidth: "800px",
            padding: 3,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Top Learner
          </Typography>

          {/* Tabs Monthly / Quarterly */}
          <Box
            sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
          >
            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              variant="scrollable"
              scrollButtons={false}
              sx={{ color: "white" }}
            >
              <Tab label="Monthly" />
              <Tab label="Quarterly" />
            </Tabs>
          </Box>
          {/* Bảng Leaderboard */}
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
                      {index === 0 ? (
                        <EmojiEventsIcon sx={{ color: "gold", fontSize: 24 }} />
                      ) : index === 1 ? (
                        <EmojiEventsIcon
                          sx={{ color: "silver", fontSize: 24 }}
                        />
                      ) : index === 2 ? (
                        <EmojiEventsIcon
                          sx={{ color: "#cd7f32", fontSize: 24 }}
                        />
                      ) : (
                        index + 1
                      )}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar src={user.avatar} />
                        <Box>
                          <Typography fontWeight="bold">{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.location}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {user.achievements.map((icon, i) => (
                        <Typography key={i} component="span" sx={{ mx: 0.5 }}>
                          {icon}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.2)", // Nền kính mờ
                            boxShadow:
                              "0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(21, 163, 68, 0.8)", // Hiệu ứng phát sáng trắng và vàng
                            border: "1px solid rgba(255, 255, 255, 0.3)", // Viền trắng mờ nhẹ
                          }}
                        >
                          <Box
                            component="img"
                            src={ecoin}
                            alt="Reward Icon"
                            sx={{ width: 30, height: 30 }}
                          />
                        </Box>

                        <Typography
                          fontWeight="bold"
                          sx={{ fontSize: "1rem", color: "#333" }}
                        >
                          {user.points}
                        </Typography>
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" sx={{ mt: 2 }}>
            More
          </Button>
        </Paper>
      </Box>
    </Page>
  );
}
