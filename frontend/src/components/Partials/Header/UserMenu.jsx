import { Box, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, MonetizationOn, Logout } from "@mui/icons-material"; // Đã sửa lỗi import
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { TOKEN_ICO_Context } from '../../../context/index.jsx';
import { shortendAddress } from "../../../../../smart_contract/Utils/index.js";

const menuOptions = [
    { icon: <AccountCircle />, label: "Profile", link: "/profilesetup" },
    { icon: <MonetizationOn />, label: "Coin Exchange", link: "/learning/exchange" },
    { icon: <Logout />, label: "Logout", link: "/auth/logout" }, // Đảm bảo đường dẫn hợp lệ
];

const UserMenu = ({ elevated, menuAnchor, toggleMenu }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width:960px)"); // Thay thế Hidden

    const {
        CONNECT_WALLET,
        account,
        setAccount,
        ERC20,
        TOKEN_ADDRESS,
        addTokenToMetaMask,
        claimedTokenBalance,
    } = useContext(TOKEN_ICO_Context);

    const [tokenBalance, setTokenBalance] = useState(0);
    const handleMenuClick = (link) => {
        toggleMenu(); // Đóng menu trước khi điều hướng
        navigate(link);
    };

    // Function to connect wallet and handle token addition
    const connectWallet = async () => {
        try {
            const connectedAccount = await CONNECT_WALLET();
            if (connectedAccount) {
                setAccount(connectedAccount);

                // add token to metamask
                await addTokenToMetaMask();

                // Fetch and display token balance
                const tokenDetails = await ERC20(TOKEN_ADDRESS);
                if (tokenDetails) {
                    setTokenBalance(parseFloat(tokenDetails.balance));
                }
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    // Check if wallet is already connected on mount
    useEffect(() => {
        const checkWallet = async () => {
            const connectedAccount = await CONNECT_WALLET();
            if (connectedAccount) {
                setAccount(connectedAccount);
                // Fetch token balance
                const tokenDetails = await ERC20(TOKEN_ADDRESS);
                if (tokenDetails) {
                    setTokenBalance(parseFloat(tokenDetails.balance));
                }
            }
        };
        checkWallet();
    }, [CONNECT_WALLET, setAccount, ERC20, TOKEN_ADDRESS, addTokenToMetaMask]);

    // Total displayed balance = real MetaMask balance + claimed tokens
    const totalDisplayedBalance = (tokenBalance + claimedTokenBalance).toFixed(2);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {(isDesktop && !account) ? (
                <button
                    onClick={() => {
                        connectWallet();
                        toast.promise(connectWallet(), {
                            loading: "Connecting wallet...",
                            success: "Wallet connected successfully!",
                            error: "Failed to connect wallet.",
                        });
                    }}
                    style={{
                        backgroundColor: "darkblue",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "blue")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "darkblue")}
                >
                    Connect Wallet
                </button>
            ) : (
                <Typography sx={{ display: "flex", alignItems: "center", color: elevated ? "#fff" : "#000" }}>
                    <img src="/Partials/Ecoin.png" alt="Coin" height="35" /> {totalDisplayedBalance}
                </Typography>
            )
            }
            <Avatar
                src="/user-avatar.png"
                alt="Gia Bao"
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
                            <MenuItem key={label} onClick={() => handleMenuClick(link)}
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
