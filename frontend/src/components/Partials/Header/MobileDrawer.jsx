import {
    SwipeableDrawer,
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton,
} from "@mui/material";
import { Close, AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll"; // Import react-scroll
import { tabData } from "./constants";

const menuOptions = [
    { icon: <AccountCircle />, label: "Profile", link: "/profilesetup" },
    { icon: <Logout />, label: "Logout", link: "auth/logout" },
];

const MobileDrawer = ({ drawerOpen, toggleDrawer }) => {
    const navigate = useNavigate();

    const handleClick = (link, section_id) => {
        if (link === null) {
            scroller.scrollTo(section_id, {
                duration: 500,
                smooth: true,
            });
        } else {
            navigate(link);
        }
        toggleDrawer(false)();
    };

    return (
        <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
                <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: "flex-end", m: 1 }}>
                    <Close />
                </IconButton>
                <List>
                    {tabData.map(({ label, link, section_id }) => (
                        <ListItemButton key={label} onClick={() => handleClick(link, section_id)}>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    ))}
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <List>
                    {menuOptions.map(({ icon, label, link }) => (
                        <ListItemButton key={label} onClick={() => handleClick(link, null)}>
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
