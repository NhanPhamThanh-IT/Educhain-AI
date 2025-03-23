import React, { useContext, useEffect, useState, useCallback } from "react";
import {
    Box,
    Avatar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { TOKEN_ICO_Context } from "../../../context/index.jsx";
import { shortendAddress } from "../../../../../smart_contract/Utils/index.js";

const UserMenu = ({ elevated }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width:960px)");
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

    const fetchTokenBalance = useCallback(async (connectedAccount) => {
        if (connectedAccount) {
            setAccount(connectedAccount);
            const tokenDetails = await ERC20(TOKEN_ADDRESS);
            if (tokenDetails) {
                setTokenBalance(parseFloat(tokenDetails.balance));
            }
        }
    }, [ERC20, TOKEN_ADDRESS, setAccount]);

    const connectWallet = useCallback(async () => {
        try {
            const connectedAccount = await CONNECT_WALLET();
            await fetchTokenBalance(connectedAccount);
            await addTokenToMetaMask();
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    }, [CONNECT_WALLET, fetchTokenBalance, addTokenToMetaMask]);

    useEffect(() => {
        fetchTokenBalance(account);
    }, [fetchTokenBalance, account]);

    const totalDisplayedBalance = (tokenBalance + claimedTokenBalance).toFixed(2);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isDesktop && !account ? (
                <button
                    onClick={() => {
                        toast.promise(connectWallet(), {
                            loading: "Connecting wallet...",
                            success: "Wallet connected successfully!",
                            error: "Failed to connect wallet.",
                        });
                    }}
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "blue")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "darkblue")}
                >
                    Connect Wallet
                </button>
            ) : (
                <Typography sx={{ display: "flex", alignItems: "center", color: "#000" }}>
                    <img src="/Partials/Ecoin.png" alt="Coin" height="35" /> {totalDisplayedBalance}
                </Typography>
            )}
            <Avatar
                src="/user-avatar.png"
                alt="Gia Bao"
                onClick={() => navigate("/profilesetup")}
                sx={{ cursor: "pointer", "&:hover": { transform: "scale(1.1) rotate(5deg)" } }}
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
