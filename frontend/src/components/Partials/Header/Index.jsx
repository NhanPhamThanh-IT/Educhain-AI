import { AppBar, Toolbar, Box, Hidden, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppBarLogic } from "../../../hooks/useAppBarLogic"
import DesktopNavigation from "./DesktopNavigation";
import MobileDrawer from "./MobileDrawer";
import UserMenu from "./UserMenu";

const AppBarComponent = () => {
    const { elevated, menuAnchor, drawerOpen, toggleMenu, toggleDrawer, appBarStyle } = useAppBarLogic();
    const navigate = useNavigate();

    return (
        <>
            <AppBar sx={appBarStyle}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box component="img" src="Partials/Logo.png" alt="Logo" sx={{ width: 50, cursor: "pointer" }} onClick={() => navigate("/homepage")} />
                    <DesktopNavigation elevated={elevated} />
                    <UserMenu elevated={elevated} menuAnchor={menuAnchor} toggleMenu={toggleMenu} />
                    <Hidden mdUp>
                        <IconButton onClick={toggleDrawer(true)} sx={{ color: elevated ? "#fff" : "#000" }}>
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
