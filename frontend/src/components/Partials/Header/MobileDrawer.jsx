import { SwipeableDrawer, Box, List, ListItemButton, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { tabData } from "../../../constants/Header/constants";
import { AccountCircle, MonetizationOn, Logout } from "@mui/icons-material";

const menuOptions = [
    { icon: <AccountCircle />, label: "Profile", link: "/profilesetup" },
    { icon: <MonetizationOn />, label: "Coin Exchange", link: "/learning/exchange" },
    { icon: <Logout />, label: "Logout", link: "auth/logout" },
];

const MobileDrawer = ({ drawerOpen, toggleDrawer }) => {
    const navigate = useNavigate();

    return (
        <SwipeableDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
                <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: "flex-end", m: 1 }}>
                    <Close />
                </IconButton>
                <List>
                    {tabData.map(({ label, link }) => (
                        <ListItemButton key={link} onClick={() => { navigate(link); toggleDrawer(false)(); }}>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    ))}
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <List>
                    {menuOptions.map(({ icon, label, link }) => (
                        <ListItemButton key={label} onClick={() => { navigate(link); toggleDrawer(false)(); }}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    );
};

export default MobileDrawer;
