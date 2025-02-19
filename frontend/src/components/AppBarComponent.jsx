// Importing necessary modules from react library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importing necessary components from Material-UI library
import { AppBar, Toolbar, Tabs, Tab, Box, Typography, Avatar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const AppBarComponent = () => {
    const navigate = useNavigate();
    const [elevated, setElevated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setElevated(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <AppBar sx={{ background: elevated ? "rgba(255, 255, 255, 0.9)" : "linear-gradient(90deg, rgba(255,255,255,1), rgba(64,101,233,0.24), rgba(203,115,225,0.37))", boxShadow: elevated ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none", paddingY: elevated ? 1.5 : 2.5, transition: "all 0.3s ease-in-out", backdropFilter: elevated ? "blur(10px)" : "none" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 0 }}>
                    <motion.div>
                        <Box component="img" src="Partials/Logo.png" alt="Logo" sx={{ width: 50, height: 50 }} />
                    </motion.div>
                    <Tabs textColor="primary" indicatorColor="primary" sx={{ flexGrow: 1, marginLeft: 3 }}>
                        {["Home", "My Learning", "Courses & Docs", "Leaderboard"].map((label, index) => (
                            <Tab key={index} label={label} onClick={() => navigate(label === "Home" ? "/homepage" : `/${label.toLowerCase().replace(/ & /g, "").replace(/ /g, "")}`)} sx={{ transition: "all 0.3s ease-in-out", position: "relative", "&:hover": { color: "#4065E9", textShadow: "0px 0px 10px rgba(64, 101, 233, 0.5)" } }} />
                        ))}
                    </Tabs>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ display: "flex", alignItems: "center", color: "#000" }}>
                            <Box component="span" sx={{ background: "#e0e0e0", borderRadius: "50%", width: 24, height: 24, textAlign: "center", fontWeight: "bold", marginRight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>E</Box>
                            12,312.44
                        </Typography>
                        <Typography sx={{ color: "#000" }}>Gia Bao</Typography>
                        <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
                            <Avatar src="/user-avatar.png" alt="Gia Bao" onClick={() => navigate("/profilesetup")} sx={{ cursor: "pointer", transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.1) rotate(5deg)" } }} />
                        </motion.div>
                        <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.5 }}>
                            <IconButton onClick={() => setMenuOpen(!menuOpen)}><MenuIcon /></IconButton>
                        </motion.div>
                    </Box>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};

export default AppBarComponent;
