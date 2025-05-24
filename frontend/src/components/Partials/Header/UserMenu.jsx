import { useContext, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import './suiet-wallet-kit-custom.css';
import { useWallet } from '@suiet/wallet-kit';

const UserMenu = ({ onAuthClick }) => {
    const wallet = useWallet()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!wallet.connected) return;
        console.log("Wallet connected:", wallet.account?.address);
    }, [wallet.connected])

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
            <ConnectButton
                style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'none',
                    padding: '8px 16px',
                    width: '100%',
                }}
                onConnectSuccess={() => {
                    handleClose();
                }}
            >
                Connect Wallet
            </ConnectButton>
        </Box>
    );
};

export default UserMenu;
