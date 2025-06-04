import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Tab,
    Tabs,
    Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ShowChartIcon from "@mui/icons-material/ShowChart";

// Importing custom components
import LeaderboardHeader from "./Header";
import LeaderboardTable from "./Table";

const LeaderboardTabs = ({ tab, setTab }) => (
    <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
    >
        <Tab icon={<EmojiEventsIcon />} label="Monthly" iconPosition="start" />
        <Tab icon={<ShowChartIcon />} label="Quarterly" iconPosition="start" />
    </Tabs>
);

export default function LeaderBoard() {
    const [tab, setTab] = useState(0);
    return (
        <Box sx={{ width: "100%" }}>
            <LeaderboardHeader />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                <Paper elevation={3} sx={{ width: "90%", maxWidth: "900px", textAlign: "center", border: "2px solid #365ACA", borderRadius: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 2,
                            px: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 5
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            textAlign="center"
                            sx={{
                                background: "linear-gradient(to right, #365ACA, #567EDC)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            Top Learners
                        </Typography>

                        <LeaderboardTabs tab={tab} setTab={setTab} />
                    </Box>

                    <Divider sx={{ mx: 2, borderWidth: 1 }} />

                    <LeaderboardTable />
                </Paper>
            </Box>
        </Box>
    );
}
