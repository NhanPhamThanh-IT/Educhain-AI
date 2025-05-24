import { useState, useEffect, useRef, useContext } from "react"; // Added useContext
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import './suiet-wallet-kit-custom.css';
import { useWallet, useAccountBalance } from '@suiet/wallet-kit';
import { RouterContext } from "../../../routes/index.jsx"; // Import RouterContext

const UserMenu = () => {
    const wallet = useWallet();
    const { totalClaimed, setTotalClaimed } = useContext(RouterContext); // Get totalClaimed and setTotalClaimed from context
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAddress, setAccountAddress] = useState(null);
    const [currentBalance, setCurrentBalance] = useState(null); // This is for SUI balance
    const [menuWidth, setMenuWidth] = useState(null);
    const buttonRef = useRef(null);

    const { error, loading, balance } = useAccountBalance(); // SUI balance hook

    const handleClick = (event) => { // Renamed from handleOpen for clarity with MUI Menu
        setAnchorEl(event.currentTarget);
        if (buttonRef.current) {
            setMenuWidth(buttonRef.current.offsetWidth); // Set menu width based on button's width
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnectAndClose = async () => {
        if (wallet.connected) {
            try {
                await wallet.disconnect();
                localStorage.removeItem("address");
            } catch (e) {
                console.error("Failed to disconnect wallet", e);
            }
        }
        handleClose();
    };

    useEffect(() => {
        const loginUser = async () => {
            if (wallet.account?.address) {
                setAccountAddress(wallet.account.address);
                localStorage.setItem("address", wallet.account.address);
                setCurrentBalance(Number(balance) || 0); // Sets SUI balance
                setTotalClaimed(1000); // Set totalClaimed to 1000 on connect
            }
        };

        if (!wallet.connected) {
            setAccountAddress(null);
            setCurrentBalance(null); // SUI balance
            localStorage.removeItem("address");
            // If you want to reset totalClaimed on disconnect, uncomment the line below
            // setTotalClaimed(0); 
            return;
        }

        loginUser();

    }, [wallet.connected, wallet.account?.address, balance, setTotalClaimed]); // Added setTotalClaimed to dependency array

    // Function to truncate address for display
    const truncateAddress = (address) => {
        if (!address) return "";
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {wallet.connected && typeof totalClaimed === 'number' ? ( // Use totalClaimed from context
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box component={"img"}
                        src="/Partials/Ecoin.png"
                        alt="Ecoin" // Corrected alt text
                        sx={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                        {totalClaimed} {/* Display totalClaimed from context */}
                    </Typography>
                </Box>
            ) : (
                <></>
            )
            }
            {
                wallet.connected && accountAddress && currentBalance !== null ? (
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
                )
            }
        </Box >
    );
};

export default UserMenu;