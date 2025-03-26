import React, { useState } from "react";
import { Button, Popover, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const menuItems = [
    {
        imgSrc: "/Homepage/USER.png",
        text: "Sign in with EduChain account",
        onClick: () => console.log("EduChain Sign-in"),
    },
    {
        imgSrc: "/Homepage/GOOGLE.png",
        text: "Sign in with Google",
        onClick: () => console.log("Google Sign-in"),
    },
];

export const AuthDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                variant="contained"
                endIcon={<SchoolIcon />}
                onClick={handleClick}
                sx={{
                    mt: 4,
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: "#1976d2",
                    color: "white",
                    "&:hover": { bgcolor: "#1565c0" },
                    userSelect: "none",
                }}
            >
                Start Learning
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                disableScrollLock
                PaperProps={{
                    elevation: 3,
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        overflowY: "auto",
                        maxHeight: 300,
                        minWidth: 220,
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    },
                }}
            >
                <List sx={{ p: 1 }}>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            button
                            onClick={() => {
                                item.onClick();
                                handleClose();
                            }}
                            sx={{ borderRadius: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
                        >
                            <ListItemIcon>
                                <img src={item.imgSrc} alt={item.text} style={{ width: 24, height: 24 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={{ userSelect: "none" }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </>
    );
};
