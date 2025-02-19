import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Box, Typography, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const AppBarComponent = () => {
    const navigate = useNavigate();
    const [elevated, setElevated] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        const handleScroll = () => setElevated(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <AppBar
                sx={{
                    color: elevated ? "#fff" : "#000",
                    background: elevated ? "#1E2A46" : "white",
                    boxShadow: elevated ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
                    paddingY: 2.5,
                    transition: "all 0.2s ease-in-out",
                    backdropFilter: elevated ? "blur(10px)" : "none",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 0 }}>
                    <Box component="img" src="Partials/Logo.png" alt="Logo" sx={{ width: 50, height: 50 }} />
                    <Tabs textColor="primary" indicatorColor="primary" sx={{ flexGrow: 1, marginLeft: 3 }}>
                        {["Home", "My Learning", "Courses & Docs", "Leaderboard"].map((label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                onClick={() => navigate(label === "Home" ? "/homepage" : `/${label.toLowerCase().replace(/ & /g, "").replace(/ /g, "")}`)}
                                sx={{
                                    color: elevated ? "#fff" : "#000",
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": { color: "#F5A623", textShadow: "0px 0px 10px rgba(245, 166, 35, 0.5)" },
                                }}
                            />
                        ))}
                    </Tabs>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ display: "flex", alignItems: "center", color: elevated ? "#fff" : "#000" }}>
                            <img src="/Partials/Ecoin.png" alt="Not found" height="30" /> 12,312.44
                        </Typography>
                        <Typography sx={{ color: elevated ? "#fff" : "#000" }}>Gia Bao</Typography>
                        <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
                            <Avatar
                                src="/user-avatar.png"
                                alt="Gia Bao"
                                onClick={() => navigate("/profilesetup")}
                                sx={{
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": { transform: "scale(1.1) rotate(5deg)" },
                                }}
                            />
                        </motion.div>
                        <Box
                            onMouseEnter={handleMenuOpen}
                            onMouseLeave={handleMenuClose}
                        >
                            <motion.div animate={{ rotate: menuAnchor ? 180 : 0 }} transition={{ duration: 0.5 }}>
                                <IconButton sx={{ color: elevated ? "#fff" : "#000" }}>
                                    <MenuIcon />
                                </IconButton>
                            </motion.div>
                            <Menu
                                anchorEl={menuAnchor}
                                open={Boolean(menuAnchor)}
                                onClose={handleMenuClose}
                                MenuListProps={{ onMouseLeave: handleMenuClose }}
                            >
                                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Coin Exchange</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Missions</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};

export default AppBarComponent;
