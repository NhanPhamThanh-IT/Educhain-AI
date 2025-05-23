import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RouterContext } from "../../../routes";

const UserMenu = ({ onAuthClick }) => {
    const { account } = useContext(RouterContext);
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
                variant="outlined"
                onClick={() => onAuthClick('signin')}
                sx={{
                    padding: "6px 16px",
                    fontSize: "1rem",
                    color: "#2196F3", // Header accent color
                    fontWeight: "bold",
                    borderColor: "#2196F3", // Header accent color
                    "&:hover": {
                        borderColor: "#1976D2", // Darker accent
                        backgroundColor: "rgba(33, 150, 243, 0.08)" // Lighter accent background
                    }
                }}
            >
                Sign In
            </Button>
            <Button
                variant="contained"
                onClick={() => onAuthClick('signup')}
                sx={{
                    color: "white",
                    fontSize: "1rem",
                    padding: "6px 16px",
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #2196F3, #00BCD4)",
                    "&:hover": {
                        background: "linear-gradient(90deg, #1976D2, #0097A7)" // Darker gradient
                    }
                }}
            >
                Sign Up
            </Button>
        </Box>
    );
};

export default UserMenu;
