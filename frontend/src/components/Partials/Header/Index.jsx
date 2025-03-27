import { AppBar, Toolbar, Box, Hidden, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppBarLogic } from "../../../hooks/useAppBarLogic"
import DesktopNavigation from "./DesktopNavigation";
import MobileDrawer from "./MobileDrawer";
import UserMenu from "./UserMenu";

import { data } from "./constants";

const AppBarComponent = () => {
    const { elevated, menuAnchor, drawerOpen, toggleMenu, toggleDrawer, appBarStyle } = useAppBarLogic();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(data.logo.link);
    }

    return (
        <>
            <AppBar sx={{ ...appBarStyle, py: 0.5 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                        role="button"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", padding: 0 }}
                        onClick={handleClick}
                    >
                        <Box
                            component="img"
                            src={data.logo.src}
                            alt="Logo"
                            sx={{ width: 50 }}
                        />
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ ml: 0.5, display: { xs: "none", md: "block" }, fontWeight: "bold", color: "#1976d2" }}
                        >
                            {data.logo.title}
                        </Typography>
                    </Box>
                    <DesktopNavigation elevated={elevated} />
                    <UserMenu elevated={elevated} menuAnchor={menuAnchor} toggleMenu={toggleMenu} />
                    <Hidden mdUp>
                        <IconButton onClick={toggleDrawer(true)} sx={{ color: "#000" }}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <MobileDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </>
    );
};

export default AppBarComponent;
