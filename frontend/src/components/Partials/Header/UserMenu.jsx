import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Avatar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RouterContext } from '../../../routes';

const UserMenu = ({ elevated }) => {

    const {
        setAccount,
        setLoader,
        account,
        CONNECT_WALLET,
        setOwnerModel,
        detail,
        currency,
        ownerModel,
        ERC20,
        TOKEN_ADDRESS,
        notifySuccess,
        notifyError, 
    } = useContext(RouterContext);

    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width:960px)");

    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [tokenBalance, setTokenBalance] = useState(0);

    // Add this useEffect to fetch token balance
    useEffect(() => {
        const fetchTokenBalance = async () => {
            if (account) {
                try {
                    const tokenData = await ERC20(TOKEN_ADDRESS);
                    setTokenBalance(Number(tokenData.balance));
                } catch (error) {
                    console.error("Failed to fetch token balance:", error);
                }
            }
        };
        fetchTokenBalance();
    }, [account, ERC20, TOKEN_ADDRESS])

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setIsMetaMaskInstalled(true);
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (typeof window.ethereum !== 'undefined') {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Add a check for pending requests
                let accounts;
                try {
                    accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts',
                        params: [],
                    });
                } catch (error) {
                    // If there's a pending request, wait a bit and try again
                    if (error.code === -32002) {
                        notifyError('Please check MetaMask. Connection request already pending.');
                        return;
                    }
                    throw error;
                }

                if (accounts && accounts[0]) {
                    await setAccount(accounts[0]);
                    notifySuccess('Wallet connected successfully!');
                }
            } catch (error) {
                console.error('connectWallet error:', error);
                notifyError('Failed to connect wallet');
            }
        } else {
            notifyError('MetaMask is not installed');
        }
    };

    const handleAccountsChanged = async (accounts) => {
        try {
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                setAccount('');
            } else if (accounts[0] !== account) {
                await setAccount(accounts[0]);
            }
        } catch (error) {
            console.error('Error handling account change:', error);
        }
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {(isDesktop && !account) ? (
                <button
                    onClick={connectWallet}
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
                    {/* Token Balance Display */}
                    <Typography sx={{
                        display: "flex",
                        alignItems: "center",
                        color: elevated ? "#fff" : "#000",
                        gap: 1
                    }}>
                        <img src="/ecoin.png" alt="EDT" height="35" />
                        {tokenBalance.toFixed(2)} EDT
                    </Typography>

                    {/* Account Address Display */}
                    {account && (
                        <Typography sx={{
                            color: elevated ? "#fff" : "#000",
                            fontSize: "0.9rem"
                        }}>
                            {`${account.slice(0, 6)}...${account.slice(-4)}`}
                        </Typography>
                    )}
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
        </Box>
    );
};

const styles = {
    button: {
        backgroundColor: "darkblue",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default UserMenu;
