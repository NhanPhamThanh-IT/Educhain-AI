import { Paper, Tab, Tabs } from "@mui/material";
import { List, CheckCircle, XCircle } from "lucide-react";

const tabData = [
    { label: "All Missions", icon: <List size={20} />, color: "#1E88E5" },
    { label: "Completed", icon: <CheckCircle size={20} />, color: "#4CAF50" },
    { label: "Incomplete", icon: <XCircle size={20} />, color: "#E53935" }
];

const TabsSection = ({ tabIndex, setTabIndex, isSmallScreen }) => (
    <Paper elevation={0} sx={{ overflow: "hidden", boxShadow: "none" }}>
        <Tabs
            value={tabIndex}
            onChange={(e, newIndex) => setTabIndex(newIndex)}
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            variant="scrollable"
            sx={{
                borderRight: isSmallScreen ? 0 : 1,
                borderColor: "transparent",
                alignItems: "flex-start",
                boxShadow: "none" // Tắt box-shadow
            }}
        >
            {tabData.map((tab, index) => (
                <Tab
                    key={index}
                    icon={tab.icon}
                    iconPosition="start"
                    label={tab.label}
                    sx={{
                        justifyContent: "flex-start",
                        color: tab.color,
                        fontWeight: tabIndex === index ? "bold" : "normal",
                        "&.Mui-selected": {
                            color: tab.color
                        }
                    }}
                />
            ))}
        </Tabs>
    </Paper>
);

export default TabsSection;
