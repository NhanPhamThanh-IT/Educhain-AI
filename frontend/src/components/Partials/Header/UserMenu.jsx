import { Box, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, MonetizationOn, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState, useCallback } from 'react';

const menuOptions = [
    { icon: <AccountCircle />, label: "Profile", link: "/profilesetup" },
    { icon: <MonetizationOn />, label: "Coin Exchange", link: "/learning/exchange" },
    { icon: <Logout />, label: "Logout", link: "/auth/logout" },
];

const UserMenu = ({ elevated, menuAnchor, toggleMenu }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width:960px)");


    const handleMenuClick = (link) => {
        toggleMenu();
        navigate(link);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {(isDesktop) ? (
                <button
                    onClick={null}
                    style={{
                        backgroundColor: "darkblue",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                >
                    Connect Wallet
                </button>
            ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{
                        display: "flex",
                        alignItems: "center",
                        color: elevated ? "#fff" : "#000",
                        gap: 1
                    }}>
                        <img src="/Partials/Ecoin.png" alt="EDT" height="35" />
                        100 EDT
                    </Typography>
                    <Typography sx={{
                        color: elevated ? "#fff" : "#000",
                        fontSize: "0.9rem"
                    }}>
                        {}
                    </Typography>
                </Box>
            )}

            <Avatar
                src="/user-avatar.png"
                alt="User"
                onClick={() => navigate("/profilesetup")}
                sx={{
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.1) rotate(5deg)" },
                }}
            />

            {isDesktop && (
                <>
                    <IconButton sx={{ color: elevated ? "#fff" : "#000" }} onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={toggleMenu}
                        sx={{ "& .MuiPaper-root": { minWidth: 180, borderRadius: 2, boxShadow: 3 } }}
                    >
                        {menuOptions.map(({ icon, label, link }) => (
                            <MenuItem
                                key={label}
                                onClick={() => handleMenuClick(link)}
                                sx={{ px: 2, py: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={label} />
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Box>
    );
};

export default UserMenu;
