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
                    <Box component="img" src="https://s3-alpha-sig.figma.com/img/27c2/a2c1/a217e49d16ca50edd6beb0940ab2cfd7?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XYE9RkdmZy78GxxMvyeDgtTGl2KUAjA69ELEI5xLO65vylFwwo7Yg74uKk9CjHMJwDQh1HFlMCOPtnGd8fU8AAvCZXQstCRDaGzxq0Sg~b11FgPey6lqyckme6~oOVgov0Mw36EV8~4LgfXtj0RPDehFqqDvZfnQ-oKvrpj-oZiPBZ8mPuL3ft5jtcabxSaYJEiqiVvf8W7tPrnL2E9P7HJI~OYG46KC6eHj3HZazFyTJW6zxvcLxFnek8PrXcOBC8BORINO-ubgnRugbN9aQ0RekyRuECFTqzKP1yPVmkZv~oSWuKnuC926yfhqfSkLhRGJrDWzT2dBLSDDjk0KJQ__" alt="Logo" sx={{ width: 50, cursor: "pointer" }} onClick={() => navigate("/learning/course?section=chat&historyItem=overview")} />
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
