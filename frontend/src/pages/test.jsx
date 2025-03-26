// components
import Page from "../components/Page";
import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Stack,
    Typography,
    Button,
    Card,
    Avatar,
    TextField,
    InputAdornment,
    Grid,
    CircularProgress,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import axios from "axios";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { RouterContext } from '../routes/index.jsx';
// ----------------------------------------------------------------------

const COINS = [
    { id: "bitcoin", code: "BTC", icon: "/bitcoin.png" },
    { id: "bitcoin-cash", code: "BCH", icon: "/bch.png" },
    { id: "ethereum", code: "ETH", icon: "/ethereum.png" },
    { id: "litecoin", code: "LTC", icon: "/litecoin.png" },
    { id: "0x", code: "ZRX", icon: "/0x.png" },
    { id: "basic-attention-token", code: "BAT", icon: "/bat.png" },
    { id: "decentraland", code: "MANA", icon: "/decentraland.png" },
    { id: "kyber-network", code: "KNC", icon: "/kyber-network.png" },
    { id: "chainlink", code: "LINK", icon: "/chainlink.png" },
];

const fetchCryptoPrices = async () => {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    ids: COINS.map((coin) => coin.id).join(","),
                    order: "market_cap_desc",
                    per_page: COINS.length,
                    page: 1,
                    sparkline: false,
                    price_change_percentage: "24h",
                },
            }
        );

        return response.data.map((coin) => {
            const matchedCoin = COINS.find((c) => c.id === coin.id);
            return {
                name: coin.name,
                code: matchedCoin?.code || "",
                value: coin.current_price.toLocaleString(),
                change: `${coin.price_change_percentage_24h > 0 ? "+" : ""
                    }${coin.price_change_percentage_24h.toFixed(2)}%`,
                icon: matchedCoin?.icon || "",
            };
        });
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
        return [];
    }
};

export default function Test() {
    const {
        TOKEN_ICO,
        BUY_TOKEN,
        account,
        loader,
        ERC20,
        TOKEN_ADDRESS,
        notifyError,
        notifySuccess,
    } = useContext(RouterContext);

    const [tokenDetails, setTokenDetails] = useState(null);
    const [transferToken, setTransferToken] = useState(null);
    const [edtAmount, setEdtAmount] = useState("");
    const [maticNeeded, setMaticNeeded] = useState("");

    // Fetch token details
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('tokenData')
                const [icoData, tokenData] = await Promise.all([
                    TOKEN_ICO(),
                    ERC20(TOKEN_ADDRESS)
                ]);

                setTokenDetails(icoData);
                setTransferToken(tokenData);

            } catch (error) {
                console.error("Failed to fetch token data:", error);
                notifyError("Failed to load token details");
            }
        };
        fetchData();
    }, []);

    // Calculate MATIC needed when EDT amount changes
    const handleEdtChange = (e) => {
        const edt = e.target.value;
        setEdtAmount(edt);
        if (edt && tokenDetails) {
            const pricePerToken = 0.00001;
            const matic = Number(edt) * pricePerToken;
            setMaticNeeded(matic.toFixed(6));
        } else {
            setMaticNeeded("");
        }
    };

    const handleBuyTokens = async () => {
        try {
            if (!edtAmount || Number(edtAmount) <= 0) {
                notifyError("Please enter a valid amount");
                return;
            }

            await BUY_TOKEN(Number(edtAmount));
            notifySuccess(`Successfully purchased ${edtAmount} EDT!`);

            // Refresh data after purchase
            const [newIcoData, newTokenData] = await Promise.all([
                TOKEN_ICO(),
                ERC20(TOKEN_ADDRESS)
            ]);
            setTokenDetails(newIcoData);
            setTransferToken(newTokenData);

            // Clear inputs
            setEdtAmount("");
            setMaticNeeded("");

        } catch (error) {
            console.error("Purchase failed:", error);
            notifyError("Failed to purchase tokens");
        }
    };

    return (
        <Page title="Test Token Purchase" sx={{ mt: 7 }}>
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
                <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <Typography variant="h5" textAlign="center" color="primary">
                            Test EDT Token Purchase
                        </Typography>

                        {/* Current Balances */}
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Your Current Balances: {transferToken?.address}
                                </Typography>
                                <Typography>
                                    MATIC: {tokenDetails?.maticBal ? Number(tokenDetails.maticBal).toFixed(4) : '0'} MATIC
                                </Typography>
                                <Typography>
                                    EDT: {transferToken?.balance ? Number(transferToken.balance).toFixed(4) : '0'} EDT
                                </Typography>
                                {tokenDetails?.tokenPrice && (
                                    <Typography color="primary">
                                        Price: 1 EDT = {Number(tokenDetails.tokenPrice).toFixed(6)} MATIC
                                    </Typography>
                                )}
                            </Stack>
                        </Box>

                        {/* Purchase Form */}
                        <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 2 }}>
                            <Stack spacing={2}>
                                <TextField
                                    label="EDT Amount to Buy"
                                    type="number"
                                    value={edtAmount}
                                    onChange={handleEdtChange}
                                    fullWidth
                                    sx={{ mb: 1 }}
                                />

                                {maticNeeded && (
                                    <Typography
                                        sx={{
                                            p: 1,
                                            bgcolor: '#e3f2fd',
                                            borderRadius: 1,
                                            textAlign: 'center'
                                        }}
                                    >
                                        MATIC needed: {maticNeeded} MATIC
                                    </Typography>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleBuyTokens}
                                    disabled={loader || !edtAmount || Number(edtAmount) <= 0}
                                    sx={{
                                        height: 48,
                                        bgcolor: '#6b46c1',
                                        '&:hover': { bgcolor: '#553c9a' }
                                    }}
                                >
                                    {loader ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        `Buy ${edtAmount || '0'} EDT`
                                    )}
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Card>
            </Box>
        </Page>
    );
}
