import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Box, Typography, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, MonetizationOn, Assignment, Logout } from "@mui/icons-material";

const menuOptions = [
    { icon: <AccountCircle />, label: "Profile", link: "/profilesetup" },
    { icon: <MonetizationOn />, label: "Coin Exchange", link: "/learning/exchange" },
    { icon: <Assignment />, label: "Missions", link: "/learning/mission" },
    { icon: <Logout />, label: "Logout", link: "auth/logout" },
];

const AppBarComponent = () => {
    const navigate = useNavigate();
    const [elevated, setElevated] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        const handleScroll = () => setElevated(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = (event) => setMenuAnchor(menuAnchor ? null : event.currentTarget);

    return (
        <AppBar
            sx={{
                color: elevated ? "#fff" : "#000",
                background: elevated ? "#1E2A46" : "white",
                boxShadow: elevated ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
                py: 2.5,
                transition: "all 0.2s",
                backdropFilter: elevated ? "blur(10px)" : "none",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 0 }}>
                {/* Logo */}
                <Box component="img" src="Partials/Logo.png" alt="Logo" sx={{ width: 50, height: 50 }} onClick={() => navigate("/homepage")}/>

                {/* Navigation Tabs */}
                <Tabs textColor="primary" indicatorColor="primary" sx={{ flexGrow: 1, ml: 3 }}>
                    {["Home", "My Learning", "Courses & Docs", "Leaderboard"].map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            onClick={() => navigate(label === "Home" ? "/homepage" : `/${label.toLowerCase().replace(/ & /g, "").replace(/ /g, "")}`)}
                            sx={{
                                color: elevated ? "#fff" : "#000",
                                transition: "all 0.3s",
                                "&:hover": { color: "#F5A623", textShadow: "0px 0px 10px rgba(245, 166, 35, 0.5)" },
                            }}
                        />
                    ))}
                </Tabs>

                {/* User Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{ display: "flex", alignItems: "center", color: elevated ? "#fff" : "#000" }}>
                        <img src="/Partials/Ecoin.png" alt="Coin" height="35" /> 12,312.44
                    </Typography>
                    <Typography sx={{ color: elevated ? "#fff" : "#000" }}>Gia Bao</Typography>

                    {/* Avatar */}
                    <Avatar
                        src="/user-avatar.png"
                        alt="Gia Bao"
                        onClick={() => navigate("/profilesetup")}
                        sx={{ cursor: "pointer", "&:hover": { transform: "scale(1.1) rotate(5deg)" } }}
                    />

                    {/* Dropdown Menu */}
                    <Box onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
                        <IconButton sx={{ color: elevated ? "#fff" : "#000" }}>
                            <MenuIcon />
                        </IconButton>

                        {/* Menu UI */}
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={toggleMenu}
                            MenuListProps={{ onMouseLeave: toggleMenu }}
                            sx={{ "& .MuiPaper-root": { minWidth: 180, borderRadius: 2, boxShadow: 3 } }}
                        >
                            {menuOptions.map(({ icon, label, link }) => (
                                <MenuItem
                                    key={label}
                                    onClick={() => navigate(link)}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36, color: "#1E2A46" }}>{icon}</ListItemIcon>
                                    <ListItemText primary={label} />
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
