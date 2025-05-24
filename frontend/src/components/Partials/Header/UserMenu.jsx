import { useState, useEffect, useRef } from "react"; // Added useRef
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material"; // Added Menu, MenuItem, Typography
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import './suiet-wallet-kit-custom.css';
import { useWallet, useAccountBalance } from '@suiet/wallet-kit';
import axios from "axios"; // Import axios for API calls

const UserMenu = () => {
    const wallet = useWallet();
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAddress, setAccountAddress] = useState(null);
    const [currentBalance, setCurrentBalance] = useState(null);
    const [menuWidth, setMenuWidth] = useState(null); // State for menu width
    const buttonRef = useRef(null); // Ref for the button

    const { error, loading, balance } = useAccountBalance();

    const handleClick = (event) => { // Renamed from handleOpen for clarity with MUI Menu
        setAnchorEl(event.currentTarget);
        if (buttonRef.current) {
            setMenuWidth(buttonRef.current.offsetWidth); // Set menu width based on button's width
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnectAndClose = async () => { // Combined disconnect and close
        if (wallet.connected) {
            try {
                await wallet.disconnect();
                localStorage.removeItem("address"); // Remove address from localStorage on disconnect
            } catch (e) {
                console.error("Failed to disconnect wallet", e);
            }
        }
        handleClose(); // Close menu regardless of disconnect success/failure
    };

    useEffect(() => {
        const loginUser = async () => {
            if (wallet.account?.address) {
                try {
                    // Fetch balance from API
                    const response = await axios.post(`http://localhost:8000/api/auth/login`, {
                        wallet_address: wallet.account.address,
                    });
                    // Handle response data if needed, e.g., set user info from response
                    console.log("Login API response:", response.data);
                    setAccountAddress(wallet.account.address);
                    localStorage.setItem("address", wallet.account.address);
                    // Assuming the balance from useAccountBalance is the one to display initially
                    // If the API returns a different balance, update setCurrentBalance accordingly
                    setCurrentBalance(Number(balance) || 0); 
                } catch (err) {
                    console.error("Failed to login or fetch user data:", err);
                    if (err.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.error("API Error Response Data:", err.response.data);
                        console.error("API Error Response Status:", err.response.status);
                        console.error("API Error Response Headers:", err.response.headers);
                    } else if (err.request) {
                        // The request was made but no response was received
                        console.error("API Error Request:", err.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.error("API Error Message:", err.message);
                    }
                    // Reset account and balance info as the API call failed
                    setAccountAddress(null);
                    setCurrentBalance(null);
                    localStorage.removeItem("address"); // Also clear from localStorage
                    // Optionally, set an error state here to display a message to the user
                }
            }
        };

        if (!wallet.connected) {
            setAccountAddress(null);
            setCurrentBalance(null);
            localStorage.removeItem("address"); // Clear address from localStorage on disconnect
            return;
        }

        loginUser();

    }, [wallet.connected, wallet.account?.address, balance]);

    // Function to truncate address for display
    const truncateAddress = (address) => {
        if (!address) return "";
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {wallet.connected && accountAddress && currentBalance !== null ? (
                <>
                    <Button
                        ref={buttonRef} // Assign ref to the button
                        aria-controls="user-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="contained" // Changed to contained for a more solid look
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem', // Slightly reduced font size for a cleaner look
                            color: 'white', // Ensuring text is white
                            backgroundColor: 'primary.main', // Using theme's primary color
                            textTransform: 'none',
                            padding: '10px 20px', // Adjusted padding
                            borderRadius: '8px', // Rounded corners
                            '&:hover': {
                                backgroundColor: 'primary.dark', // Darken on hover
                            },
                            // Removed direct border styling, relying on variant="contained" and boxShadow
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center', // Align items vertically
                            justifyContent: 'space-between', // Keep space between elements
                            gap: '20px', // Add some gap between the two Typography elements
                            // Removed padding and borderRadius from here, handled by Button
                        }}>
                            <Typography variant="body1" sx={{ fontWeight: '500', lineHeight: 1.5, color: 'white' }}>
                                {currentBalance} SUI
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: '500', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.8)' }}> {/* Softer color for address */}
                                {truncateAddress(accountAddress)}
                            </Typography>
                        </Box>
                    </Button>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{ // Apply width to the Menu's Paper component
                            style: {
                                width: menuWidth ? `${menuWidth}px` : 'auto', // Set width dynamically
                            },
                        }}
                    >
                        <MenuItem
                            onClick={handleDisconnectAndClose}
                            sx={{ // Added sx prop for styling
                                justifyContent: 'center' // Center the content
                            }}
                        >
                            Disconnect Wallet
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <ConnectButton
                    style={{
                        fontWeight: 'bold',
                        boxShadow: 'none',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textTransform: 'none',
                        width: '100%',
                        // Ensuring similar padding/height to the other button
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                    }}
                    onConnectSuccess={() => {
                        // handleClose(); // handleClose was for a different anchorEl, not needed here
                    }}
                >
                    Connect Wallet
                </ConnectButton>
            )}
        </Box>
    );
};