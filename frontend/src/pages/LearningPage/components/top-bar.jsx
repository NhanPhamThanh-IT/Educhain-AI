import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Refresh as RefreshIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";

const TopBar = ({ isSidebarOpen, sections, selectedSection, selectedHistory }) => {
    return (<Box
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
            {/* Section icon */}
            {
                sections.find(
                    (s) =>
                        s.key === selectedSection &&
                        s.history?.includes(selectedHistory)
                )?.icon
            }

            <Typography variant="h6" sx={{ ml: 1, fontWeight: 500 }}>
                {selectedHistory || selectedSection || "Dashboard"}
            </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
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
    )
};

export default TopBar;