import { AppBar, Toolbar, Box, Hidden, IconButton, Typography, Container } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppBarLogic } from "../../../hooks/useAppBarLogic"
import DesktopNavigation from "./DesktopNavigation";
import MobileDrawer from "./MobileDrawer";
import UserMenu from "./UserMenu";

import { data } from "./constants";

const AppBarComponent = () => {
    const { menuAnchor, drawerOpen, toggleMenu, toggleDrawer, appBarStyle } = useAppBarLogic();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(data.logo.link);
    }

    return (
        <>
            <AppBar
                sx={{
                    ...appBarStyle,
                    backgroundColor: "#0A1929",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    position: "fixed",
                    backdropFilter: "blur(8px)",
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
                <Container maxWidth="lg">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            minHeight: "70px",
                            px: { xs: 1, sm: 2 }
                        }}
                    >
                        <Box
                            role="button"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                                padding: 0,
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)"
                                }
                            }}
                            onClick={handleClick}
                        >
                            <Box
                                component="img"
                                src={data.logo.src}
                                alt="Logo"
                                sx={{
                                    width: 45,
                                    height: "auto",
                                    filter: "brightness(1.2)"
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
                        <UserMenu menuAnchor={menuAnchor} toggleMenu={toggleMenu} />

                        <Hidden mdUp>
                            <IconButton
                                onClick={toggleDrawer(true)}
                                sx={{
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "rgba(33, 150, 243, 0.1)"
                                    }
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                    </Toolbar>
                </Container>
            </AppBar>
            <MobileDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </>
    );
};

export default AppBarComponent;
