import { useState } from "react";
import { Box, IconButton, Tooltip, Button, Typography, Paper } from "@mui/material";
import { Refresh as RefreshIcon, MoreVert as MoreVertIcon, Widgets as WidgetsIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const WidgetContent = () => {
    const navigate = useNavigate();

    const NAV_ITEMS = [
        { label: "Your Courses", path: "/mylearning" },
        { label: "Market", path: "/market" },
        { label: "Missions", path: "/learning/mission" },
        { label: "Leaderboard", path: "/learning/leaderboard" },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                whiteSpace: "nowrap",
                gap: 1,
                borderRadius: 50,
                bgcolor: "transparent",
            }}
        >
            {NAV_ITEMS.map((item, index) => (
                <Button
                    key={index}
                    color="inherit"
                    sx={{ textTransform: "none", fontWeight: 600, fontSize: 16 }}
                    onClick={() => navigate(item.path)}
                >
                    {item.label}
                </Button>
            ))}
        </Box>

    );
};

const TopBar = ({ isSidebarOpen, sections, selectedSection, selectedHistory }) => {
    const [isWidgetOpen, setWidgetOpen] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e0e0e0",
                px: 3,
                py: 2,
                backgroundColor: "#f0f0f0",
                position: "fixed",
                zIndex: 1100,
                width: isSidebarOpen ? "calc(100% - 300px)" : "calc(100% - 60px)",
                top: 0,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {sections.find(
                    (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
                )?.icon}
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 500 }}>
                    {selectedHistory || selectedSection || "Dashboard"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
                {/* Nút Widget */}
                <Tooltip title="Widget">
                    <IconButton size="small" onClick={() => setWidgetOpen(!isWidgetOpen)}>
                        <WidgetsIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Hộp Widget (hiển thị ngang hàng với icon) */}
                {isWidgetOpen && (
                    <Paper
                        elevation={3}
                        sx={{
                            position: "absolute",
                            right: "110%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            px: 2,
                            borderRadius: 50,
                            boxShadow: 3,
                            minWidth: 200,
                        }}
                    >
                        <WidgetContent />
                    </Paper>
                )}

                {/* Các nút khác */}
                <Tooltip title="Refresh">
                    <IconButton size="small">
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="More options">
                    <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default TopBar;
