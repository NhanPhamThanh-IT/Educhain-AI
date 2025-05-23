import { Tabs, Tab, Hidden, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll"; // Import scroller từ react-scroll
import { tabData } from "./constants";
import { useState, useEffect } from "react";

const DesktopNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentTabIndex = tabData.findIndex(tab => tab.link === currentPath);
        if (currentTabIndex !== -1) {
            setSelectedTab(currentTabIndex);
        }
    }, [location]);

    const handleScroll = (section_id) => {
        scroller.scrollTo(section_id, {
            duration: 500,
            smooth: true,
        });
    };

    const handleTabClick = (index, link, section_id) => {
        setSelectedTab(index);

        if (link === null) {
            if (window.location.pathname !== '/homepage') {
                navigate('/homepage');
                handleScroll(section_id);
            } else {
                handleScroll(section_id);
            }
        } else {
            navigate(link);
        }
    };

    return (
        <Hidden mdDown>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => setSelectedTab(newValue)}
                    sx={{
                        minHeight: "70px",
                        "& .MuiTabs-indicator": {
                            height: "3px",
                            background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                            borderRadius: "3px 3px 0 0"
                        }
                    }}
                >
                    {tabData.map(({ label, link, section_id }, index) => (
                        <Tab
                            key={label}
                            label={label}
                            onClick={() => handleTabClick(index, link, section_id)}
                            sx={{
                                textTransform: "none",
                                color: "#fff",
                                fontWeight: 500,
                                fontSize: "1.1rem",
                                minHeight: "70px",
                                px: 2,
                                position: "relative",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    left: "50%",
                                    width: 0,
                                    height: "2px",
                                    background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                                    transform: "translateX(-50%)"
                                },
                                "&:hover": {
                                    color: "#2196F3",
                                    "&::after": {
                                        width: "80%"
                                    }
                                },
                                "&.Mui-selected": {
                                    color: "#2196F3",
                                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                                    "&::after": {
                                        width: "80%"
                                    }
                                },
                                "&:not(.Mui-selected)": {
                                    backgroundColor: "transparent"
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
        </Hidden>
    );
};

export default DesktopNavigation;
