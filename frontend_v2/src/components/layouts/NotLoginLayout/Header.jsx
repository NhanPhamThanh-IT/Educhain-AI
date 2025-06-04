import { AppBar, Toolbar, Box, Typography, Container, Tabs, Tab, Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MAIN_ROUTES } from '@/constants/routesPath';

// --- Constants ---
const tabData = [
    { label: "Home", link: MAIN_ROUTES.home },
    { label: "Docs", link: MAIN_ROUTES.docs },
    { label: "Deposit & Earn", link: MAIN_ROUTES.depositAndEarn },
    { label: "Our Team", link: MAIN_ROUTES.about },
];

const data = {
    logo: {
        src: "/logo.png",
        title: "Educhain",
    }
};

// --- DesktopNavigation (UI only) ---
function DesktopNavigation() {
    const location = useLocation();
    // Xác định tab đang active dựa vào pathname
    const currentTab = tabData.findIndex(tab => tab.link === location.pathname);
    return (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Tabs
                value={currentTab === -1 ? false : currentTab}
                sx={{
                    minHeight: "70px",
                    "& .MuiTabs-indicator": {
                        height: "3px",
                        background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                        borderRadius: "3px 3px 0 0"
                    }
                }}
            >
                {tabData.map(({ label, link }, index) => (
                    <Tab
                        key={label}
                        label={label}
                        component={Link}
                        to={link}
                        sx={{
                            textTransform: "none",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            minHeight: "70px",
                            px: 2,
                            position: "relative",
                            borderRadius: 2,
                            mx: 0.5,
                            transition: "all 0.2s",
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
                                background: "rgba(33,150,243,0.08)",
                                "&::after": {
                                    width: "80%"
                                }
                            },
                            "&.Mui-selected": {
                                color: "#2196F3",
                                backgroundColor: "rgba(33, 150, 243, 0.15)",
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
    );
}

// --- AppBarComponent (UI only) ---
function AppBarComponent() {
    return (
        <AppBar
            sx={{
                py: 2,
                background: "linear-gradient(90deg, #0A1929 60%, #1976d2 100%)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                position: "fixed",
                backdropFilter: "blur(8px)",
                px: 0,
                borderRadius: 0,
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                }
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minHeight: "70px",
                        px: 0,
                    }}
                    disableGutters
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            border: "none",
                            padding: 0,
                            transition: "transform 0.3s ease",
                            '&:hover': {
                                transform: "scale(1.05)"
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src={data.logo.src}
                            alt="Logo"
                            sx={{
                                width: 45,
                                height: "auto",
                                filter: "brightness(1.2)",
                                mr: 1
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                ml: 1,
                                display: { xs: "none", md: "block" },
                                fontWeight: 700,
                                background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            {data.logo.title}
                        </Typography>
                    </Box>
                    <DesktopNavigation />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppBarComponent;