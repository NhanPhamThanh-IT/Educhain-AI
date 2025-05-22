import { Tabs, Tab, Hidden, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll"; // Import scroller từ react-scroll
import { tabData } from "./constants";

const DesktopNavigation = () => {
    const navigate = useNavigate();

    const handleScroll = (section_id) => {
        scroller.scrollTo(section_id, {
            duration: 500,
            smooth: true,
        });
    };

    return (
        <Hidden mdDown>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Tabs
                    value={false}
                    sx={{
                        minHeight: "70px",
                        "& .MuiTabs-indicator": {
                            height: "3px",
                            background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                            borderRadius: "3px 3px 0 0"
                        }
                    }}
                >
                    {tabData.map(({ label, link, section_id }) => (
                        <Tab
                            key={label}
                            label={label}
                            onClick={() => {
                                if (link === null) {
                                    if (window.location.pathname !== '/homepage') {
                                        navigate('/homepage');
                                        setTimeout(() => {
                                            handleScroll(section_id);
                                        }, 100);
                                    } else {
                                        handleScroll(section_id);
                                    }
                                } else {
                                    navigate(link);
                                }
                            }}
                            sx={{
                                textTransform: "none",
                                color: "#fff",
                                fontWeight: 500,
                                fontSize: "0.95rem",
                                minHeight: "70px",
                                px: 2,
                                transition: "all 0.3s ease",
                                position: "relative",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    left: "50%",
                                    width: 0,
                                    height: "2px",
                                    background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                                    transition: "all 0.3s ease",
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
                                    "&::after": {
                                        width: "80%"
                                    }
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
