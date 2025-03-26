import React, { useState } from "react";
import { Button, Popover, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GoogleIcon from "@mui/icons-material/Google";

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
                    mt: 4, textTransform: "none", fontWeight: 600, bgcolor: "#1976d2", color: "white",
                    "&:hover": { bgcolor: "#1565c0" }
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
                PaperProps={{
                    elevation: 3,
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        overflow: "hidden",
                        minWidth: 220,
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
                    }
                }}
            >
                <Paper>
                    <List sx={{ p: 1 }}>
                        <ListItem button onClick={handleClose} sx={{ borderRadius: 1, "&:hover": { bgcolor: "#f5f5f5" } }}>
                            <ListItemIcon>
                                <AccountCircleIcon sx={{ color: "#1976d2" }} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Sign in with EduChain Account" />
                        </ListItem>
                        <ListItem button onClick={handleClose} sx={{ borderRadius: 1, "&:hover": { bgcolor: "#f5f5f5" } }}>
                            <ListItemIcon>
                                <GoogleIcon sx={{ color: "#DB4437" }} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Sign in with Google" />
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
        </>
    );
};
